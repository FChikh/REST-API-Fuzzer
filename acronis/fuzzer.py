import json
import os
import random
import string
import urllib

import requests
import rstr
import urllib3
import wfuzz

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

domain = 'https://resumecreator.ru'

sess = requests.Session()

req_types = [random.randint(1, 10 ** 9), -random.randint(1, 10 ** 9),
             random.randint(10 ** 50, 10 ** 100),
             -random.randint(10 ** 50, 10 ** 100),
             random.uniform(0.0, 5.0), -random.uniform(0.0, 5.0), 0,
             rstr.letters(1, 64),
             rstr.letters(65, 256), rstr.nonwhitespace(1, 64),
             rstr.nonwhitespace(65, 256),
             rstr.letters(257, 2000), rstr.nonwhitespace(257, 2000),
             int(bool(random.getrandbits(1))),
             'егор']

types = {
    'uuid': r'^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-['
            r'0-9a-fA-F]{12}$',
    'integer': r'^\d+$',
    'string': r'^[A-Za-z0-9_\.~-]{1,256}$',
    'boolean': r'(1|0)',
    'string64': r'^[A-Za-z0-9_\.~-]{1,64}$',
    'string256': r'^[A-Za-z0-9_\.~-]{1,256}$',
    'domainError': {'domain': r'^[A-Za-z0-9_\.~-]+$',
                    'code': r'^[A-Za-z0-9_\.~-]+$'},
    'pageToken': r'^[A-Za-z0-9+/]+=$',
    'pagedCollection': {'cursors': {'after': r'^[A-Za-z0-9+/]+=$',
                                    'before': r'^[A-Za-z0-9+/]+=$'}},
    'queueStatus': {'size': r'^(-)?\d+$'},
    'progress': {'total': r'^(-)?\d+$',
                 'current': r'^(-)?\d+$'},
    'actor': {'id': r'^[A-Za-z0-9_\.~-]{1,64}$',
              'clusterId': r'^[A-Za-z0-9_\.~-]{1,64}$'},

    'executionState': r'(enqueued|assigned|started|paused|completed)',
    'blob': r'^[A-Za-z0-9_\.~-]+$',
    'resultCode': r'(ok|error|warning|cancelled|abandoned|timedout)',
    'executionResult': {
        'code': r'(ok|error|warning|cancelled|abandoned|timedout)',
        'error': {'domain': r'^[A-Za-z0-9_\.~-]+$',
                  'code': r'^[A-Za-z0-9_\.~-]+$'},
        'payload': r'^[A-Za-z0-9_\.~-]+$'},
    'time': r'^(\d+)-(0[1-9]|1[012])-(0[1-9]|[12]\d|3[01])[Tt]([01]\d|2['
            r'0-3]):([0-5]\d):([0-5]\d|60)(\.\d+)?(([Zz])|([\+|\-]([01]\d|2['
            r'0-3])))$',
    'duration': r'^(([01]?\d|2[0-3])h)?(([0-5]?\d)m)?(([0-5]?\d)session)?$',
    'linkedResource': {'id': r'^[A-Za-z0-9_\.~-]{1,64}$',
                       'type': r'^[A-Za-z0-9_\.~-]{1,64}$',
                       'name': r'^[A-Za-z0-9_\.~-]{1,256}$'},
    'workflowDefinition': {
        'uuid': r'^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{'
                r'4}-[0-9a-fA-F]{12}$',
        'type': r'^[A-Za-z0-9_\.~-]{1,64}$',
        'tags': r'^[A-Za-z0-9_\.~-]{1,64}$',
        'progress': {'total': r'^(-)?\d+$',
                     'current': r'^(-)?\d+$'}},
    'taskPriority': r'(low|belowNormal|normal|aboveNormal|high)',
    'taskDefinition': {
        'uuid': r'^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{'
                r'4}-[0-9a-fA-F]{12}$',
        'type': r'^[A-Za-z0-9_\.~-]{1,64}$',
        'queue': r'^[A-Za-z0-9_\.~-]{1,64}$',
        'priority': r'(low|belowNormal|normal|aboveNormal|high)',
        'heartBeatInterval': r'^(([01]?\d|2[0-3])h)?(([0-5]?\d)m)?((['
                             r'0-5]?\d)session)?$',
        'queueTimeout': r'^(([01]?\d|2[0-3])h)?(([0-5]?\d)m)?(([0-5]?\d)session)?$',
        'ackTimeout': r'^(([01]?\d|2[0-3])h)?(([0-5]?\d)m)?(([0-5]?\d)session)?$',
        'execTimeout': r'^(([01]?\d|2[0-3])h)?(([0-5]?\d)m)?(([0-5]?\d)session)?$',
        'lifeTime': r'^(([01]?\d|2[0-3])h)?(([0-5]?\d)m)?(([0-5]?\d)session)?$',
        'maxAssignCount': r'^(-)?\d+$',
        'cancellable': r'(1|0)',
        'startedByUser': r'^[A-Za-z0-9_\.~-]{1,256}$',
        'policy': {'id': r'^[A-Za-z0-9_\.~-]{1,64}$',
                   'type': r'^[A-Za-z0-9_\.~-]{1,64}$',
                   'name': r'^[A-Za-z0-9_\.~-]{1,256}$'},
        'resource': {'id': r'^[A-Za-z0-9_\.~-]{1,64}$',
                     'type': r'^[A-Za-z0-9_\.~-]{1,64}$',
                     'name': r'^[A-Za-z0-9_\.~-]{1,256}$'},
        'tags': r'^[A-Za-z0-9_\.~-]{1,64}$',
        'affinity': {'agentId': r'^[A-Za-z0-9_\.~-]{1,64}$',
                     'clusterId': r'^[A-Za-z0-9_\.~-]{1,64}$'},
        'argument': r'^[A-Za-z0-9_\.~-]+$',
        'workflowId': r'^(-)?\d+$',
        'context': r'^[A-Za-z0-9_\.~-]+$'},
    'activityDefinition': {
        'uuid': r'^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{'
                r'4}-[0-9a-fA-F]{12}$',
        'type': r'^[A-Za-z0-9_\.~-]{1,64}$',
        'taskId': r'^(-)?\d+$',
        'parentActivityId': r'^(-)?\d+$',
        'progress': {'total': r'^(-)?\d+$',
                     'current': r'^(-)?\d+$'},
        'tags': r'^[A-Za-z0-9_\.~-]{1,64}$',
        'resource': {'id': r'^[A-Za-z0-9_\.~-]{1,64}$',
                     'type': r'^[A-Za-z0-9_\.~-]{1,64}$',
                     'name': r'^[A-Za-z0-9_\.~-]{1,256}$'},
        'state': r'(enqueued|assigned|started|paused|completed)',
        'details': r'^[A-Za-z0-9_\.~-]+$'},
    'blockerDefinition': {
        'uuid': r'^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{'
                r'4}-[0-9a-fA-F]{12}$',
        'taskId': r'^(-)?\d+$',
        'activityId': r'^(-)?\d+$',
        'issue': r'^[A-Za-z0-9_\.~-]+$'},
    'eventDefinition': {'code': r'^(-)?\d+$',
                        'taskId': r'^(-)?\d+$',
                        'activityId': r'^(-)?\d+$',
                        'severity': r'(info|warning|error)',
                        'message': r'^[A-Za-z0-9_\.~-]+$',
                        'payload': r'^[A-Za-z0-9_\.~-]+$',
                        'occurredAt': r'^(\d+)-(0[1-9]|1[012])-(0[1-9]|['
                                      r'12]\d|3[01])[Tt]([01]\d|2[0-3]):(['
                                      r'0-5]\d):([0-5]\d|60)(\.\d+)?(([Zz])|('
                                      r'[\+|\-]([01]\d|2[0-3])))$'},

    'levelOfDetail': r'(short|long|full|debug|count)',
    'timeFilter': r'^(\d+)-(0[1-9]|1[012])-(0[1-9]|[12]\d|3[01])[Tt](['
                  r'01]\d|2[0-3]):([0-5]\d):([0-5]\d|60)(\.\d+)?(([Zz])|(['
                  r'\+|\-]([01]\d|2[0-3])))$',
    'taskConsumer': {'queues': r'^[A-Za-z0-9_\.~-]{1,64}$',
                     'timeout': r'^(([01]?\d|2[0-3])h)?(([0-5]?\d)m)?((['
                                r'0-5]?\d)session)?$',
                     'qos': r'^(-)?\d+$'},
    'taskHeartbeat': {'taskId': r'^(-)?\d+$'}
}


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


def parse_params(params, fuzz=''):
    result = ''
    for item in params:
        if item != fuzz:
            if item['type'] == 'array':
                for _ in range(random.randint(1, 20)):
                    if type(types[item['items']]) == dict:
                        for key, value in convert_types(
                                types[item['items']]).items():
                            result += key + '=' + rstr.xeger(
                                value) + '&'
                    else:
                        result += item['name'] + '=' + rstr.xeger(
                            types[item['items']]) + '&'
                continue
            if item['type'] == 'object':
                for key, value in item['properties'].items():
                    if type(types[value]) == dict:
                        for key1, value1 in convert_types(
                                types[value]).items():
                            result += key1 + '=' + rstr.xeger(
                                value1) + '&'
                    else:
                        result += key + '=' + rstr.xeger(
                            types[value]) + '&'
                continue

            if type(types[item['type']]) == dict:
                for key, value in convert_types(
                        types[item['type']]).items():
                    result += key + '=' + rstr.xeger(value) + '&'
            else:
                result += item['name'] + '=' + rstr.xeger(
                    types[item['type']]) + '&'
    return result


def get_fuzzing(page):
    session = requests.Session()
    headers = {'Content-type': 'application/json',
               'Accept': 'text/plain',
               'Content-Encoding': 'utf-8'}
    session.post('https://resumecreator.ru/api/1/login',
                 data=json.dumps({"username": 'Drelb', "password": 'Egorpid1'}),
                 verify=False,
                 headers=headers)
    session.get('https://resumecreator.ru/bc',
                verify=False)
    try:
        page['baseUri']
        for i in range(1000):
            g = session.get(
                'https://resumecreator.ru' + page[
                    'baseUri'] + '/' +
                ''.join(random.choices(
                    string.ascii_letters + string.digits + '_.~-',
                    k=random.randint(1, 100))))
            if g.status_code == 404:
                print(g)
    except KeyError:
        for i in range(1000):
            g = session.get(
                'https://resumecreator.ru' + page[
                    'uri'] + '/' +
                ''.join(random.choices(
                    string.ascii_letters + string.digits + '_.~-',
                    k=random.randint(1, 100))))
            if g.status_code == 404:
                print(g)
    for i in page['pages']:
        get_fuzzing(i)


def parsing(parsed_page, page):
    try:
        parsed_page['baseUri'] = page['baseUri']
        parsed_page['is_changeable'] = False
        parsed_page['type'] = None
    except KeyError:
        try:
            parsed_page['relativeUri'] = page['relativeUri']
            parsed_page['uri'] = page['absoluteUri']
            if parsed_page['uri'][-1] == '}':
                parsed_page['is_changeable'] = True
                if parsed_page['uri'][-3:-1] == 'id':
                    parsed_page['type'] = 'integer'
                else:
                    parsed_page['type'] = 'string'
        except KeyError:
            pass

    try:
        parsed_page['protocols'] = page['protocols']
    except KeyError:
        parsed_page['protocols'] = []

    parsed_page['methods'] = []
    try:
        for method in page['methods']:
            tmp_method = {}
            try:
                tmp_method['method'] = method['method']
            except KeyError:
                pass
            tmp_method['queryParameters'] = []
            try:
                for queryParameter in method['queryParameters']:
                    parameter = method['queryParameters'][queryParameter]
                    tmp_dict = {'name': parameter['name'],
                                'type': parameter['type'][0],
                                'required': parameter['required']}
                    if tmp_dict['type'] == 'array':
                        tmp_dict['items'] = parameter['items']
                    if tmp_dict['type'] == 'object':
                        tmp_dict['properties'] = {}
                        for tmp_property in parameter['properties']:
                            tmp = parameter['properties'][tmp_property]
                            tmp_dict['properties'][tmp['name']] = tmp['type'][0]
                            if tmp['type'][0] == 'object':
                                tmp_dict['properties'][tmp['name']] = {}
                                for i in tmp['properties']:
                                    tmp_dict['properties'][tmp['name']][i] = \
                                        tmp['properties'][i]['type'][0]

                    tmp_method['queryParameters'].append(tmp_dict)
            except KeyError:
                pass
            try:
                tmp_method['body'] = {
                    'name': method['body']['application/json']['type'][0],
                    'properties': []}
                try:
                    for type in data['types']:
                        tmp = type[list(type.keys())[0]]
                        if tmp['name'] == tmp_method['body']['name']:
                            for tmp_property in tmp['properties']:
                                parameter = tmp['properties'][tmp_property]
                                tmp_dict = {'name': parameter['name'],
                                            'type': parameter['type'][0],
                                            'required': parameter['required']}
                                if tmp_dict['type'] == 'array':
                                    tmp_dict['items'] = parameter['items']
                                if tmp_dict['type'] == 'object':
                                    tmp_dict['properties'] = {}
                                    for property_tmp in parameter['properties']:
                                        tmp_parameter = parameter['properties'][
                                            property_tmp]
                                        tmp_dict['properties'][
                                            tmp_parameter['name']] = \
                                            tmp_parameter['type'][0]
                                        if tmp_parameter['type'][0] == 'object':
                                            tmp_dict['properties'][
                                                tmp_parameter['name']] = {}
                                            for i in tmp_parameter[
                                                'properties']:
                                                tmp_dict['properties'][
                                                    tmp_parameter['name']][i] = \
                                                    tmp['properties'][i][
                                                        'type'][0]
                                tmp_method['body']['properties'].append(
                                    tmp_dict)
                            break
                except KeyError:
                    pass
            except KeyError:
                tmp_method['body'] = {}
            tmp_method['responses'] = []
            try:
                for response in method['responses']:
                    tmp_dict = {'code': method['responses'][response]['code'],
                                'type': method['responses'][response]['body'][
                                    'application/json'][
                                    'type'][0]}
                    tmp_method['responses'].append(tmp_dict)
            except KeyError:
                pass
            parsed_page['methods'].append(tmp_method)
    except KeyError:
        pass

    parsed_page['pages'] = []
    try:
        for resource in page['resources']:
            parsed_page['pages'].append({'type': parsed_page['type'],
                                         'is_changeable': parsed_page[
                                             'is_changeable']});
            parsing(parsed_page['pages'][-1], resource)
    except KeyError:
        pass


def fuzzing(tasks):
    for method in tasks['methods']:
        if method['method'] == 'get' and not tasks['is_changeable']:
            params = method['queryParameters']
            for i in params:
                uri = urllib.parse.quote(parse_params(params, i), safe='=&~._')
                url = domain + tasks['uri'] + '?' + uri + i['name'] + '=FUZZ'
                fuzz_sess = wfuzz.FuzzSession(url=url,
                                              cookie=convert_cookies_format(
                                                  sess.cookies.get_dict()),
                                              method='GET').get_payload(
                    req_types)
                for r in fuzz_sess.fuzz(hc=[200, 400]):
                    print(r)
        elif method['method'] == 'get' and tasks['is_changeable']:
            params = method['queryParameters']
            for i in params:
                uri = urllib.parse.quote(parse_params(params, i), safe='=&~._')
                url = domain + tasks['uri'].replace(tasks['uri'][
                                                    tasks['uri'].index('{'):
                                                    tasks['uri'].index(
                                                        '}') + 1], rstr.xeger(
                    tasks['type'])) + '?' + uri + i['name'] + '=FUZZ'

                fuzz_sess = wfuzz.FuzzSession(url=url,
                                              cookie=convert_cookies_format(
                                                  sess.cookies.get_dict()),
                                              method='GET').get_payload(
                    req_types)
                for r in fuzz_sess.fuzz(hc=[200, 400]):
                    print(r)
            uri = urllib.parse.quote(parse_params(params), safe='=&~._')
            url = domain + tasks['uri'].replace(tasks['uri'][
                                                tasks['uri'].index('{'): tasks[
                                                                             'uri'].index(
                                                    '}') + 1],
                                                'FUZZ') + '?' + uri
            fuzz_sess = wfuzz.FuzzSession(url=url,
                                          cookie=convert_cookies_format(
                                              sess.cookies.get_dict()),
                                          method='GET').get_payload(
                req_types)
            for r in fuzz_sess.fuzz(hc=[200, 400]):
                print(r)
        elif method['method'] == 'post' and not tasks['is_changeable']:
            params_body = method['body']['properties']
            params_query = method['queryParameters']
            for i in params_query:
                uri = urllib.parse.quote(parse_params(params_query, i),
                                         safe='=&~.')
                url = domain + tasks['uri'] + '?' + uri + i['name'] + '=FUZZ'
                postdata = parse_params(params_body)[:-1]
                fuzz_sess = wfuzz.FuzzSession(url=url,
                                              cookie=convert_cookies_format(
                                                  sess.cookies.get_dict()),
                                              postdata=postdata,
                                              method='POST').get_payload(
                    req_types)
                for r in fuzz_sess.fuzz(hc=[200, 400]):
                    print(r)
            for i in params_body:
                uri = urllib.parse.quote(parse_params(params_query),
                                         safe='=&~.')
                url = domain + tasks['uri'] + '?' + uri
                postdata = parse_params(params_body, i) + i['name'] + '=FUZZ'
                fuzz_sess = wfuzz.FuzzSession(url=url,
                                              cookie=convert_cookies_format(
                                                  sess.cookies.get_dict()),
                                              postdata=postdata,
                                              method='POST').get_payload(
                    req_types)
                for r in fuzz_sess.fuzz():
                    print(r)
        elif method['method'] == 'post' and tasks['is_changeable']:
            params_body = method['body']['properties']
            params_query = method['queryParameters']
            for i in params_body:
                uri = urllib.parse.quote(parse_params(params_query),
                                         safe='=&~.')
                url = domain + tasks['uri'].replace(tasks['uri'][
                                                    tasks['uri'].index('{'):
                                                    tasks['uri'].index(
                                                        '}') + 1], rstr.xeger(
                    tasks['type'])) + '?' + uri
                postdata = parse_params(params_body, i) + i['name'] + '=FUZZ'
                fuzz_sess = wfuzz.FuzzSession(url=url,
                                              cookie=convert_cookies_format(
                                                  sess.cookies.get_dict()),
                                              postdata=postdata,
                                              method='POST').get_payload(
                    req_types)
                for r in fuzz_sess.fuzz():
                    print(r)
            for i in params_query:
                uri = urllib.parse.quote(parse_params(params_query, i),
                                         safe='=&~.')
                url = domain + tasks['uri'].replace(tasks['uri'][
                                                    tasks['uri'].index('{'):
                                                    tasks['uri'].index(
                                                        '}') + 1], rstr.xeger(
                    tasks['type'])) + '?' + uri + i['name'] + '=FUZZ'
                postdata = parse_params(params_body)
                fuzz_sess = wfuzz.FuzzSession(url=url,
                                              cookie=convert_cookies_format(
                                                  sess.cookies.get_dict()),
                                              postdata=postdata,
                                              method='POST').get_payload(
                    req_types)
                for r in fuzz_sess.fuzz():
                    print(r)

            uri = urllib.parse.quote(parse_params(params_query), safe='=&~.')
            url = domain + tasks['uri'].replace(tasks['uri'][
                                                tasks['uri'].index('{'):
                                                tasks['uri'].index(
                                                    '}') + 1],
                                                'FUZZ') + '?' + uri
            postdata = parse_params(params_body)
            fuzz_sess = wfuzz.FuzzSession(url=url,
                                          cookie=convert_cookies_format(
                                              sess.cookies.get_dict()),
                                          postdata=postdata,
                                          method='POST').get_payload(
                req_types)
            for r in fuzz_sess.fuzz():
                print(r)
        elif method['method'] == 'put' and not tasks['is_changeable']:
            try:
                params_body = method['body']['properties']
            except KeyError:
                params_body = {}
            params_query = method['queryParameters']
            for i in params_query:
                uri = urllib.parse.quote(parse_params(params_query, i),
                                         safe='=&~.')
                url = domain + tasks['uri'] + '?' + uri
                postdata = parse_params(params_body)[:-1]
                fuzz_sess = wfuzz.FuzzSession(url=url,
                                              cookie=convert_cookies_format(
                                                  sess.cookies.get_dict()),
                                              postdata=postdata,
                                              method='POST').get_payload(
                    req_types)
                for r in fuzz_sess.fuzz(hc=[200, 400]):
                    print(r)
            for i in params_body:
                uri = urllib.parse.quote(parse_params(params_query),
                                         safe='=&~.')
                url = domain + tasks['uri'] + '?' + uri
                postdata = parse_params(params_body, i) + i['name'] + '=FUZZ'
                fuzz_sess = wfuzz.FuzzSession(url=url,
                                              cookie=convert_cookies_format(
                                                  sess.cookies.get_dict()),
                                              postdata=postdata,
                                              method='PUT').get_payload(
                    req_types)
                for r in fuzz_sess.fuzz():
                    print(r)
        elif method['method'] == 'put' and tasks['is_changeable']:
            print('put')
            try:
                params_body = method['body']['properties']
            except KeyError:
                params_body = {}
            params_query = method['queryParameters']
            for i in params_body:
                uri = urllib.parse.quote(parse_params(params_query),
                                         safe='=&~.')
                url = domain + tasks['uri'].replace(tasks['uri'][
                                                    tasks['uri'].index('{'):
                                                    tasks['uri'].index(
                                                        '}') + 1], rstr.xeger(
                    tasks['type'])) + '?' + uri
                postdata = parse_params(params_body, i) + i['name'] + '=FUZZ'
                fuzz_sess = wfuzz.FuzzSession(url=url,
                                              cookie=convert_cookies_format(
                                                  sess.cookies.get_dict()),
                                              postdata=postdata,
                                              method='PUT').get_payload(
                    req_types)
                for r in fuzz_sess.fuzz():
                    print(r)
            for i in params_query:
                uri = urllib.parse.quote(parse_params(params_query, i),
                                         safe='=&~.')
                url = domain + tasks['uri'].replace(tasks['uri'][
                                                    tasks['uri'].index('{'):
                                                    tasks['uri'].index(
                                                        '}') + 1], rstr.xeger(
                    tasks['type'])) + '?' + uri + i['name'] + '=FUZZ'
                postdata = parse_params(params_body)
                fuzz_sess = wfuzz.FuzzSession(url=url,
                                              cookie=convert_cookies_format(
                                                  sess.cookies.get_dict()),
                                              postdata=postdata,
                                              method='PUT').get_payload(
                    req_types)
                for r in fuzz_sess.fuzz():
                    print(r)

            uri = urllib.parse.quote(parse_params(params_query), safe='=&~.')
            url = domain + tasks['uri'].replace(tasks['uri'][
                                                tasks['uri'].index('{'): tasks[
                                                                             'uri'].index(
                                                    '}') + 1],
                                                'FUZZ') + '?' + uri
            postdata = parse_params(params_body)
            fuzz_sess = wfuzz.FuzzSession(url=url,
                                          cookie=convert_cookies_format(
                                              sess.cookies.get_dict()),
                                          postdata=postdata,
                                          method='PUT').get_payload(
                req_types)
            for r in fuzz_sess.fuzz():
                print(r)
        elif method['method'] == 'delete':
            url = domain + tasks['uri'].replace(tasks['relativeUri'], '/FUZZ')
            fuzz_sess = wfuzz.FuzzSession(url=url,
                                          cookie=convert_cookies_format(
                                              sess.cookies.get_dict()),
                                          method='DELETE').get_payload(
                req_types)
            for r in fuzz_sess.fuzz():
                print(r)

        for i in tasks['pages']:
            fuzzing(i)


os.system('node parser.js')
with open('parsed.json', 'r') as json_file:
    data = json.load(json_file)

parsed_data = {}
parsing(parsed_data, data)
print(parsed_data)

headers = {'Content-type': 'application/json',
           'Accept': 'text/plain',
           'Content-Encoding': 'utf-8'}

session = sess.post(
    'https://resumecreator.ru/api/1/login',
    data=json.dumps({"username": "Drelb", "password": "Egorpid1"}),
    verify=False,
    headers=headers)
session = sess.get('https://resumecreator.ru/bc')
session = sess.get('https://resumecreator.ru/api/task_manager/v2/status')
print(1)
fuzzing(parsed_data['pages'][2])
