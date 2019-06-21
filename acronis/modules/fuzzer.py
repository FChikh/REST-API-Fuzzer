"""
This module is a fuzzer itself
"""

import urllib
import requests
import rstr
import wfuzz
import random
import json
from modules.consts import types, req_types


def convert_cookies_format(cookies):
    """
    Convert cookies from dictionary format to list
    
    :param cookies: dictionary contained cookies from session
    :type: dict
    :return: list of strings of format 'key=value'
    :type: list
    """
    new_cookies = []
    for key, value in cookies.items():
        new_cookies.append('{}={}'.format(key, value))
    return new_cookies


def convert_types(type_dict):
    """
    Check dictionary on nested dictionaries, convert it into one dictionary without nested dictionaries
    
    :param type_dict: dictionary that can contain nested dictionaries
    :type: dict
    :return: dictionary contained data from type_dict without nested dictionary in it
    :type: dict
    """
    formatted_dict = {}
    for key, value in type_dict.items():
        if type(value) == dict:
            formatted_dict = {**formatted_dict, **convert_types(value)}
        else:
            formatted_dict = {**formatted_dict, **{key: value}}
    return formatted_dict


def authorize(domain):
    """
    Authorize on server, return session

    :param domain: string contained domain name of server
    :type: str
    :return: session object contained current session
    :rtype: obj
    """
    session = requests.Session()
    headers = {'Content-type': 'application/json',
               'Accept': 'text/plain',
               'Content-Encoding': 'utf-8'}
    session.post(domain + '/api/1/login',
                 data=json.dumps({"username": 'root', "password": 'root'}),
                 verify=False,
                 headers=headers)
    session.get(domain + '/bc',
                verify=False)
    return session


def parse_params(params, fuzz=''):
    """
    Parse queryParameters for lower level of parameters, return result

    :param params: list of parameters
    :type: list
    :param fuzz: string contained parameter name
    :type: str
    :return: string contained data about parameters use following format: 'key=value&...'
    :rtype: str
    """
    result = []
    for item in params:
        if item != fuzz and item['required']:
            if item['type'] == 'list':
                for _ in range(random.randint(1, 20)):
                    if type(types[item['items']]) == dict:
                        for key, value in convert_types(types[item['items']]).items():
                            result.append(key + '=' + rstr.xeger(value))
                    else:
                        result.append(item['name'] + '=' + rstr.xeger(types[item['items']]))
                continue

            if item['type'] == 'object':
                for key, value in item['properties'].items():
                    if type(types[value]) == dict:
                        for key1, value1 in convert_types(types[value]).items():
                            result.append(key1 + '=' + rstr.xeger(value1))
                    else:
                        result.append(key + '=' + rstr.xeger(types[value]))
                continue

            if type(types[item['type']]) == dict:
                for key, value in convert_types(types[item['type']]).items():
                    result.append(key + '=' + rstr.xeger(value))
            else:
                result.append(item['name'] + '=' + rstr.xeger(types[item['type']]))

    return '&'.join(result)


def print_fuzz_data(page, specification, specification_codes, fuzz_sess, url, cur_method='get', postdata=''):
    """
    Launch fuzzing, print results, url, postdata

    :param page: dictionary that contain data about page
    :type: dict
    :param specification: string that can be '', 'hc', 'sc', used to specify wfuzz
    :type: str
    :param specification_codes: list of integers contained status codes, used to specify specification of wfuzz
    :type: list
    :param fuzz_sess: fuzzing session object contained data about current fuzzing session
    :type: obj
    :param url: string contained current url
    :type: str
    :param cur_method: string contained current method
    :type: str
    :param postdata: string contained data of post method
    :type: str
    :return: none
    """
    print(url, postdata)
    if not specification_codes and specification:
        for method in page['methods']:
            if method == cur_method:
                for response in method['responses']:
                    specification_codes.append(response['code'])
    else:
        pass
    if specification == 'hc':
        for r in fuzz_sess.fuzz(hc=specification_codes):
            print(r)
    elif specification == 'sc':
        for r in fuzz_sess.fuzz(sc=specification_codes):
            print(r)
    else:
        for r in fuzz_sess.fuzz():
            print(r)


def fuzz_first_step(page, specification, specification_codes, domain):
    """
    Fuzz uri, look for undeclared pages, use authorize() to set session, use print_fuzz_data() to print data about
    fuzzing, use recursion to fuzz all pages

    :param page: dictionary that contain data about page
    :type: dict
    :param specification: string that can be '', 'hc', 'sc', used to specify wfuzz
    :type: str
    :param specification_codes: list of integers contained status codes, used in print_fuzz_data to specify
    specification of wfuzz
    :type: list
    :param domain: string contained domain name of server
    :type: str
    :return: none
    """
    session = authorize()
    url = domain

    if not page['is_changeable']:
        try:
            url += page['baseUri']
        except KeyError:
            url += page['uri']
        url += '/FUZZ'
    else:
        url += page['uri'].replace(page['uri'][page['uri'].index('{'): page['uri'].index('}') + 1],
                                   rstr.xeger(page['type'])) + '/FUZZ'
    fuzz_sess = wfuzz.FuzzSession(url=url,
                                  cookie=convert_cookies_format(session.cookies.get_dict()),
                                  method='GET',
                                  rleve='depth',
                                  payloads=[("file", dict(fn="big.txt"))])
    print_fuzz_data(page, specification, specification_codes, fuzz_sess, url)

    for i in page['pages']:
        fuzz_first_step(i, specification, specification_codes, domain)


def fuzz_second_step(page, specification, specification_codes, domain):
    """
    Fuzz parameters, look for undeclared status codes, use authorize() to set session, use print_fuzz_data() to print
    data, about fuzzing use recursion to fuzz all pages

    :param page: dictionary that contain data about page
    :type: dict
    :param specification: string that can be '', 'hc', 'sc', used to specify wfuzz
    :type: str
    :param specification_codes: list of integers contained status codes, used in print_fuzz_data to specify
    specification of wfuzz
    :type: list
    :param domain: string contained domain name of server
    :type: str
    :return: none
    """
    session = authorize(domain)

    for method in page['methods']:
        print(method['method'])
        if method['method'] == 'get' and not page['is_changeable']:
            params = method['queryParameters']
            for item in params:
                uri = urllib.parse.quote(parse_params(params, item), safe='=&~._')
                url = domain + page['uri'] + '?' + uri + item['name'] + '=FUZZ'
                fuzz_sess = wfuzz.FuzzSession(url=url,
                                              cookie=convert_cookies_format(session.cookies.get_dict()),
                                              method='GET').get_payload(req_types)
                print_fuzz_data(page, specification, specification_codes, fuzz_sess, url, method['method'])

        elif method['method'] == 'get' and page['is_changeable']:
            params = method['queryParameters']
            for item in params:
                uri = urllib.parse.quote(parse_params(params, item), safe='=&~._')
                url = domain + page['uri'].replace(page['uri'][page['uri'].index('{'): page['uri'].index('}') + 1],
                                                    rstr.xeger(types[page['type']])) + '?' + uri + item['name'] + '=FUZZ'
                fuzz_sess = wfuzz.FuzzSession(url=url,
                                              cookie=convert_cookies_format(session.cookies.get_dict()),
                                              method='GET').get_payload(req_types)
                print_fuzz_data(page, specification, specification_codes, fuzz_sess, url, method['method'])

            uri = urllib.parse.quote(parse_params(params), safe='=&~._')
            url = domain + page['uri'].replace(page['uri'][page['uri'].index('{'): page['uri'].index('}') + 1],
                                               'FUZZ') + '?' + uri
            fuzz_sess = wfuzz.FuzzSession(url=url,
                                          cookie=convert_cookies_format(session.cookies.get_dict()),
                                          method='GET').get_payload(req_types)
            print_fuzz_data(page, specification, specification_codes, fuzz_sess, url, method['method'])

        elif method['method'] == 'post' and not page['is_changeable']:
            params_body = method['body']['properties']
            params_query = method['queryParameters']
            for item in params_query:
                uri = urllib.parse.quote(parse_params(params_query, item), safe='=&~.')
                url = domain + page['uri'] + '?' + uri + item['name'] + '=FUZZ'
                postdata = parse_params(params_body)[:-1]
                fuzz_sess = wfuzz.FuzzSession(url=url,
                                              cookie=convert_cookies_format(session.cookies.get_dict()),
                                              postdata=postdata,
                                              method='POST').get_payload(req_types)
                print_fuzz_data(page, specification, specification_codes, fuzz_sess, url, method['method'], postdata)

            for item in params_body:
                uri = urllib.parse.quote(parse_params(params_query),safe='=&~.')
                url = domain + page['uri'] + '?' + uri
                postdata = parse_params(params_body, item) + item['name'] + '=FUZZ'
                fuzz_sess = wfuzz.FuzzSession(url=url,
                                              cookie=convert_cookies_format(session.cookies.get_dict()),
                                              postdata=postdata,
                                              method='POST').get_payload(req_types)
                print_fuzz_data(page, specification, specification_codes, fuzz_sess, url, method['method'], postdata)

        elif method['method'] == 'post' and page['is_changeable']:
            params_body = method['body']['properties']
            params_query = method['queryParameters']
            for item in params_body:
                uri = urllib.parse.quote(parse_params(params_query), safe='=&~.')
                url = domain + page['uri'].replace(page['uri'][page['uri'].index('{'): page['uri'].index('}') + 1],
                                                    rstr.xeger(types[page['type']])) + '?' + uri
                postdata = parse_params(params_body, item) + item['name'] + '=FUZZ'
                fuzz_sess = wfuzz.FuzzSession(url=url,
                                              cookie=convert_cookies_format(session.cookies.get_dict()),
                                              postdata=postdata,
                                              method='POST').get_payload(req_types)
                print_fuzz_data(page, specification, specification_codes, fuzz_sess, url, method['method'], postdata)

            for item in params_query:
                uri = urllib.parse.quote(parse_params(params_query, item), safe='=&~.')
                url = domain + page['uri'].replace(page['uri'][page['uri'].index('{'):page['uri'].index('}') + 1],
                                                    rstr.xeger(types[page['type']])) + '?' + uri + item['name'] + '=FUZZ'
                postdata = parse_params(params_body)
                fuzz_sess = wfuzz.FuzzSession(url=url,
                                              cookie=convert_cookies_format(session.cookies.get_dict()),
                                              postdata=postdata,
                                              method='POST').get_payload(req_types)
                print_fuzz_data(page, specification, specification_codes, fuzz_sess, url, method['method'], postdata)

            uri = urllib.parse.quote(parse_params(params_query), safe='=&~.')
            url = domain + page['uri'].replace(page['uri'][page['uri'].index('{'):page['uri'].index('}') + 1],
                                                'FUZZ') + '?' + uri
            postdata = parse_params(params_body)
            fuzz_sess = wfuzz.FuzzSession(url=url,
                                          cookie=convert_cookies_format(session.cookies.get_dict()),
                                          postdata=postdata,
                                          method='POST').get_payload(req_types)
            print_fuzz_data(page, specification, specification_codes, fuzz_sess, url, method['method'], postdata)

        elif method['method'] == 'put' and not page['is_changeable']:
            try:
                params_body = method['body']['properties']
            except KeyError:
                params_body = {}
            params_query = method['queryParameters']
            for item in params_query:
                uri = urllib.parse.quote(parse_params(params_query, item), safe='=&~.')
                url = domain + page['uri'] + '?' + uri
                postdata = parse_params(params_body)[:-1]
                fuzz_sess = wfuzz.FuzzSession(url=url,
                                              cookie=convert_cookies_format(session.cookies.get_dict()),
                                              postdata=postdata,
                                              method='PUT').get_payload(req_types)
                print_fuzz_data(page, specification, specification_codes, fuzz_sess, url, method['method'], postdata)

            for item in params_body:
                uri = urllib.parse.quote(parse_params(params_query),safe='=&~.')
                url = domain + page['uri'] + '?' + uri
                postdata = parse_params(params_body, item) + item['name'] + '=FUZZ'
                fuzz_sess = wfuzz.FuzzSession(url=url,
                                              cookie=convert_cookies_format(session.cookies.get_dict()),
                                              postdata=postdata,
                                              method='PUT').get_payload(req_types)
                print_fuzz_data(page, specification, specification_codes, fuzz_sess, url, method['method'], postdata)

        elif method['method'] == 'put' and page['is_changeable']:
            print('put')
            try:
                params_body = method['body']['properties']
            except KeyError:
                params_body = {}
            params_query = method['queryParameters']
            for item in params_body:
                uri = urllib.parse.quote(parse_params(params_query),safe='=&~.')
                url = domain + page['uri'].replace(page['uri'][page['uri'].index('{'): page['uri'].index('}') + 1],
                                                    rstr.xeger(types[page['type']])) + '?' + uri
                postdata = parse_params(params_body, item) + item['name'] + '=FUZZ'
                fuzz_sess = wfuzz.FuzzSession(url=url,
                                              cookie=convert_cookies_format(session.cookies.get_dict()),
                                              postdata=postdata,
                                              method='PUT').get_payload(req_types)
                print_fuzz_data(page, specification, specification_codes, fuzz_sess, url, method['method'], postdata)

            for item in params_query:
                uri = urllib.parse.quote(parse_params(params_query, item),safe='=&~.')
                url = domain + page['uri'].replace(page['uri'][page['uri'].index('{'): page['uri'].index('}') + 1],
                                                    rstr.xeger(types[page['type']])) + '?' + uri + item['name'] + '=FUZZ'
                postdata = parse_params(params_body)
                fuzz_sess = wfuzz.FuzzSession(url=url,
                                              cookie=convert_cookies_format(session.cookies.get_dict()),
                                              postdata=postdata,
                                              method='PUT').get_payload(req_types)
                print_fuzz_data(page, specification, specification_codes, fuzz_sess, url, method['method'], postdata)

            uri = urllib.parse.quote(parse_params(params_query), safe='=&~.')
            url = domain + page['uri'].replace(page['uri'][page['uri'].index('{'): page['uri'].index('}') + 1],
                                                'FUZZ') + '?' + uri
            postdata = parse_params(params_body)
            fuzz_sess = wfuzz.FuzzSession(url=url,
                                          cookie=convert_cookies_format(session.cookies.get_dict()),
                                          postdata=postdata,
                                          method='PUT').get_payload(req_types)
            print_fuzz_data(page, specification, specification_codes, fuzz_sess, url, method['method'], postdata)

        elif method['method'] == 'delete':
            url = domain + page['uri'].replace(page['relativeUri'], '/FUZZ')
            fuzz_sess = wfuzz.FuzzSession(url=url,
                                          cookie=convert_cookies_format(session.cookies.get_dict()),
                                          method='DELETE').get_payload(req_types)
            print_fuzz_data(page, specification, specification_codes, fuzz_sess, url, method['method'])
        
        for item in page['pages']:
            fuzz_second_step(item, specification, specification_codes, domain)


def fuzz(data, specification, specification_codes, domain):
    """
    Run fuzz_first_step() and fuzz_second_step() to fuzz server

    :param data: dictionary that contain data about server
    :type: dict
    :param specification: string that can be '', 'hc', 'sc', used in fuzz_first_step() and fuzz_second_step() to specify
    wfuzz
    :type: str
    :param specification_codes: list of integers contained status codes, used in fuzz_first_step() and fuzz_second_step()
    to specify specification of wfuzz
    :type: list
    :return: none
    """
    if specification == 'hc':
        print('Not shown response codes: ', ', '.join(specification_codes))
    if specification == 'sc':
        print('Shown response codes: ', ', '.join(specification_codes))
    fuzz_first_step(data, specification, specification_codes, domain)
    for page in data['pages']:
        fuzz_second_step(page, specification, specification_codes, domain)
