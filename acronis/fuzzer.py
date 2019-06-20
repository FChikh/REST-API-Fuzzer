import urllib
import requests
import rstr
import wfuzz
import random
import json
import sys
from consts import types, domain, req_types


def convert_cookies_format(cookies):
    new_cookies = []
    for key, value in cookies.items():
        new_cookies.append('{}={}'.format(key, value))
    return new_cookies


def convert_types(type_dict):
    formatted_dict = {}
    for key, value in type_dict.items():
        if type(value) == dict:
            formatted_dict = {**formatted_dict, **convert_types(value)}
        else:
            formatted_dict = {**formatted_dict, **{key: value}}
    return formatted_dict


def authorize():
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
    result = ''
    for item in params:
        if item != fuzz and item['required']:
            if item['type'] == 'array':
                for _ in range(random.randint(1, 20)):
                    if type(types[item['items']]) == dict:
                        for key, value in convert_types(types[item['items']]).items():
                            result += key + '=' + rstr.xeger(value) + '&'
                    else:
                        result += item['name'] + '=' + rstr.xeger(types[item['items']]) + '&'
                continue
            
            if item['type'] == 'object':
                for key, value in item['properties'].items():
                    if type(types[value]) == dict:
                        for key1, value1 in convert_types(types[value]).items():
                            result += key1 + '=' + rstr.xeger(value1) + '&'
                    else:
                        result += key + '=' + rstr.xeger(types[value]) + '&'
                continue

            if type(types[item['type']]) == dict:
                for key, value in convert_types(types[item['type']]).items():
                    result += key + '=' + rstr.xeger(value) + '&'
            else:
                result += item['name'] + '=' + rstr.xeger(types[item['type']]) + '&'
                
    return result


def fuzzing_component1(page):
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

    print(url)
    for r in fuzz_sess.fuzz(hc=[400, 404]):
        print(r)
    
    for i in page['pages']:
        fuzzing_component1(i)


def fuzzing_component2(page):
    session = authorize()
    
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

                print(url)
                for r in fuzz_sess.fuzz(hc=[400, 404]):
                    print(r)

        elif method['method'] == 'get' and page['is_changeable']:
            params = method['queryParameters']
            for item in params:
                uri = urllib.parse.quote(parse_params(params, item), safe='=&~._')
                url = domain + page['uri'].replace(page['uri'][page['uri'].index('{'): page['uri'].index('}') + 1],
                                                    rstr.xeger(types[page['type']])) + '?' + uri + item['name'] + '=FUZZ'
                fuzz_sess = wfuzz.FuzzSession(url=url,
                                              cookie=convert_cookies_format(session.cookies.get_dict()),
                                              method='GET').get_payload(req_types)
                
                print(url)
                for r in fuzz_sess.fuzz(hc=[400, 404]):
                    print(r)
                    
            uri = urllib.parse.quote(parse_params(params), safe='=&~._')
            url = domain + page['uri'].replace(page['uri'][page['uri'].index('{'): page['uri'].index('}') + 1],
                                                'FUZZ') + '?' + uri
            fuzz_sess = wfuzz.FuzzSession(url=url,
                                          cookie=convert_cookies_format(session.cookies.get_dict()),
                                          method='GET').get_payload(req_types)

            print(url)
            for r in fuzz_sess.fuzz(hc=[400, 404]):
                print(r)
                
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
                
                print(url, postdata)
                for r in fuzz_sess.fuzz(hc=[400, 404]):
                    print(r)
                    
            for item in params_body:
                uri = urllib.parse.quote(parse_params(params_query),safe='=&~.')
                url = domain + page['uri'] + '?' + uri
                postdata = parse_params(params_body, item) + item['name'] + '=FUZZ'
                fuzz_sess = wfuzz.FuzzSession(url=url,
                                              cookie=convert_cookies_format(session.cookies.get_dict()),
                                              postdata=postdata,
                                              method='POST').get_payload(req_types)
                
                print(url, postdata)
                for r in fuzz_sess.fuzz(hc=[400, 404]):
                    print(r)
                    
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
                
                print(url, postdata)
                for r in fuzz_sess.fuzz(hc=[400, 404]):
                    print(r)
                    
            for item in params_query:
                uri = urllib.parse.quote(parse_params(params_query, item), safe='=&~.')
                url = domain + page['uri'].replace(page['uri'][page['uri'].index('{'):page['uri'].index('}') + 1],
                                                    rstr.xeger(types[page['type']])) + '?' + uri + item['name'] + '=FUZZ'
                postdata = parse_params(params_body)
                fuzz_sess = wfuzz.FuzzSession(url=url,
                                              cookie=convert_cookies_format(session.cookies.get_dict()),
                                              postdata=postdata,
                                              method='POST').get_payload(req_types)
                
                print(url, postdata)
                for r in fuzz_sess.fuzz(hc=[400, 404]):
                    print(r)

            uri = urllib.parse.quote(parse_params(params_query), safe='=&~.')
            url = domain + page['uri'].replace(page['uri'][page['uri'].index('{'):page['uri'].index('}') + 1],
                                                'FUZZ') + '?' + uri
            postdata = parse_params(params_body)
            fuzz_sess = wfuzz.FuzzSession(url=url,
                                          cookie=convert_cookies_format(session.cookies.get_dict()),
                                          postdata=postdata,
                                          method='POST').get_payload(req_types)
            
            print(url, postdata)
            for r in fuzz_sess.fuzz(hc=[400, 404]):
                print(r)
                
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
                
                print(url, postdata)
                for r in fuzz_sess.fuzz(hc=[400, 404]):
                    print(r)
                    
            for item in params_body:
                uri = urllib.parse.quote(parse_params(params_query),safe='=&~.')
                url = domain + page['uri'] + '?' + uri
                postdata = parse_params(params_body, item) + item['name'] + '=FUZZ'
                fuzz_sess = wfuzz.FuzzSession(url=url,
                                              cookie=convert_cookies_format(session.cookies.get_dict()),
                                              postdata=postdata,
                                              method='PUT').get_payload(req_types)
                
                print(url, postdata)
                for r in fuzz_sess.fuzz(hc=[400, 404]):
                    print(r)
                    
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
                
                print(url, postdata)
                for r in fuzz_sess.fuzz(hc=[400, 404]):
                    print(r)
                    
            for item in params_query:
                uri = urllib.parse.quote(parse_params(params_query, item),safe='=&~.')
                url = domain + page['uri'].replace(page['uri'][page['uri'].index('{'): page['uri'].index('}') + 1],
                                                    rstr.xeger(types[page['type']])) + '?' + uri + item['name'] + '=FUZZ'
                postdata = parse_params(params_body)
                fuzz_sess = wfuzz.FuzzSession(url=url,
                                              cookie=convert_cookies_format(session.cookies.get_dict()),
                                              postdata=postdata,
                                              method='PUT').get_payload(req_types)
                
                print(url, postdata)
                for r in fuzz_sess.fuzz(hc=[400, 404]):
                    print(r)

            uri = urllib.parse.quote(parse_params(params_query), safe='=&~.')
            url = domain + page['uri'].replace(page['uri'][page['uri'].index('{'): page['uri'].index('}') + 1],
                                                'FUZZ') + '?' + uri
            postdata = parse_params(params_body)
            fuzz_sess = wfuzz.FuzzSession(url=url,
                                          cookie=convert_cookies_format(session.cookies.get_dict()),
                                          postdata=postdata,
                                          method='PUT').get_payload(req_types)
            
            print(url, postdata)
            for r in fuzz_sess.fuzz(hc=[400, 404]):
                print(r)
                
        elif method['method'] == 'delete':
            url = domain + page['uri'].replace(page['relativeUri'], '/FUZZ')
            fuzz_sess = wfuzz.FuzzSession(url=url,
                                          cookie=convert_cookies_format(session.cookies.get_dict()),
                                          method='DELETE').get_payload(req_types)
            
            print(url)
            for r in fuzz_sess.fuzz(hc=[400, 404]):
                print(r)
        
        for item in page['pages']:
            fuzzing_component2(item)
