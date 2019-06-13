import itertools
import json
import os
import requests
import string
import random
from collections import Counter

import requests
import rstr
import wfuzz

os.system('node parser.js')
with open('parsed.json', 'r') as json_file:
    data = json.load(json_file)

domain = 'https://mc-master-0604.msp.ru.corp.acronis.com'


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


def fuzzing(page):
    s = requests.Session()
    headers = {'Content-type': 'application/json',
               'Accept': 'text/plain',
               'Content-Encoding': 'utf-8'}
    s.post('https://mc-master-0604.msp.ru.corp.acronis.com/api/1/login',
           data=json.dumps({"username": 'Drelb', "password": 'Egorpid1'}), verify=False, headers=headers)
    s.get('https://mc-master-0604.msp.ru.corp.acronis.com/bc', verify=False)
    try:
        page['baseUri']
        for i in range(1000):
            s.get('https://mc-master-0604.msp.ru.corp.acronis.com' + page['baseUri'] + '/' +
                  ''.join(random.choices(string.ascii_letters + string.digits + '_.~-', k=random.randint(1, 100))))
    except KeyError:
        for i in range(1000):
            s.get('https://mc-master-0604.msp.ru.corp.acronis.com' + page['uri'] + '/' +
                  ''.join(random.choices(string.ascii_letters + string.digits + '_.~-', k=random.randint(1, 100))))
    for i in page['pages']:
        fuzzing(i)


def parsing(parsed_page, page):
    parsed_page['is_changeable'] = False
    parsed_page['type'] = None
    try:
        parsed_page['baseUri'] = page['baseUri']
    except KeyError:
        try:
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
                    tmp_dict = {'name': method['queryParameters'][queryParameter]['name'],
                                'type': method['queryParameters'][queryParameter]['type'][0],
                                'required': method['queryParameters'][queryParameter]['required']}
                    if tmp_dict['type'] == 'array':
                        tmp_dict['items'] = method['queryParameters'][queryParameter]['items']
                    tmp_method['queryParameters'].append(tmp_dict)
            except KeyError:
                pass
            try:
                tmp_method['body'] = {'name': method['body']['application/json']['type'][0],
                                      'properties': []}
                try:
                    for type in data['types']:
                        tmp = type[list(type.keys())[0]]
                        if tmp['name'] == tmp_method['body']['name']:
                            for parameter in tmp['properties']:
                                tmp_dict = {'name': tmp['properties'][parameter]['name'],
                                            'type': tmp['properties'][parameter]['type'][0],
                                            'required': tmp['properties'][parameter]['required']}
                                if tmp_dict['type'] == 'array':
                                    tmp_dict['items'] = tmp['properties'][parameter]['items']
                                tmp_method['body']['properties'].append(tmp_dict)
                            break
                except KeyError:
                    pass
            except KeyError:
                tmp_method['body'] = {}
            tmp_method['responses'] = []
            try:
                for response in method['responses']:
                    tmp_dict = {'code': method['responses'][response]['code'],
                                'type': method['responses'][response]['body']['application/json'][
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
            parsed_page['pages'].append({})
            parsing(parsed_page['pages'][-1], resource)
    except KeyError:
        pass


def fuzzing(tasks, sess, req_types, types):
    for method in tasks['methods']:
        if method['method'] == 'get' and not tasks['is_changeable']:
            params = method['queryParameters']
            for i in params:
                url = domain + tasks['uri'] + '?'
                for j in params:
                    if i != j:
                        if type(types[j['type']]) == dict:
                            for key, value in convert_types(types[j['type']]).items():
                                url += key + '=' + rstr.xeger(value) + '&'
                        else:
                            url += j['name'] + '=' + rstr.xeger(types[j['type']]) + '&'

                url += i['name'] + '=FUZZ'
                # print(url)
                s = wfuzz.FuzzSession(url=url, cookie=convert_cookies_format(sess.cookies.get_dict())).get_payload(req_types)
                for r in s.fuzz(hc=[200, 400]):
                    print(r)
        elif method['method'] == 'post':
            print(1)
            params_body = method['body']['properties']
            params_query = method['queryParameters']
            for i in params_query:
                url = domain + tasks['uri'] + '?'
                postdata = ''
                for j in params_query:
                    if i != j:
                        if j['type'] == 'array':
                            for k in range(random.randint(1, 20)):
                                if type(types[j['items']]) == dict:
                                    for key, value in convert_types(types[j['items']]).items():
                                        url += key + '=' + rstr.xeger(value) + '&'
                                else:
                                    url += j['name'] + '=' + rstr.xeger(types[j['items']]) + '&'
                        else:
                            if type(types[j['type']]) == dict:
                                for key, value in convert_types(types[j['type']]).items():
                                    url += key + '=' + rstr.xeger(value) + '&'
                            else:
                                url += j['name'] + '=' + rstr.xeger(types[j['type']]) + '&'
                for j in params_body:
                    print(j)
                    if j['type'] == 'array':
                        for k in range(random.randint(1, 20)):
                            if type(types[j['items']]) == dict:
                                for key, value in convert_types(types[j['items']]).items():
                                    postdata += key + '=' + rstr.xeger(value) + '&'
                            else:
                                postdata += j['name'] + '=' + rstr.xeger(types[j['items']]) + '&'
                        continue
                    if j['type'] == 'object':
                        for key, value in j['properties']:
                            if type(types[value]) == dict:
                                for key1, value1 in convert_types(types[value]).items():
                                    postdata += key1 + '=' + rstr.xeger(value1) + '&'
                            else:
                                postdata += key['name'] + '=' + rstr.xeger(types[value]) + '&'

                    if type(types[j['type']]) == dict:
                        for key, value in convert_types(types[j['type']]).items():
                            postdata += key + '=' + rstr.xeger(value) + '&'
                    else:
                        postdata += j['name'] + '=' + rstr.xeger(types[j['type']]) + '&'
                url += i['name'] + '=FUZZ'
                postdata = postdata[:-1]
                print(url)
                s = wfuzz.FuzzSession(url=url, cookie=convert_cookies_format(
                    sess.cookies.get_dict()), postdata=postdata).get_payload(req_types)
                for r in s.fuzz(hc=[200, 400]):
                    print(r)
            for i in params_body:
                url = domain + tasks['uri'] + '?'
                postdata = ''
                for j in params_query:
                    if j['type'] == 'array':
                        for k in range(random.randint(1, 20)):
                            if type(types[j['items']]) == dict:
                                for key, value in convert_types(types[j['items']]).items():
                                    url += key + '=' + rstr.xeger(value) + '&'
                            else:
                                url += j['name'] + '=' + rstr.xeger(types[j['items']]) + '&'
                    else:
                        if type(types[j['type']]) == dict:
                            for key, value in convert_types(types[j['type']]).items():
                                url += key + '=' + rstr.xeger(value) + '&'
                        else:
                            url += j['name'] + '=' + rstr.xeger(types[j['type']]) + '&'
                for j in params_body:
                    if i != j:
                        if j['type'] == 'array':
                            for k in range(random.randint(1, 20)):
                                if type(types[j['items']]) == dict:
                                    for key, value in convert_types(types[j['items']]).items():
                                        postdata += key + '=' + rstr.xeger(value) + '&'
                                else:
                                    postdata += j['name'] + '=' + rstr.xeger(types[j['items']]) + '&'
                        else:
                            if type(types[j['type']]) == dict:
                                for key, value in convert_types(types[j['type']]).items():
                                    postdata += key + '=' + rstr.xeger(value) + '&'
                            else:
                                postdata += j['name'] + '=' + rstr.xeger(types[j['type']]) + '&'
                postdata += i['name'] + '=FUZZ'
                s = wfuzz.FuzzSession(url=url, cookie=convert_cookies_format(
                    sess.cookies.get_dict()), postdata=postdata).get_payload(req_types)
                for r in s.fuzz():
                    print(r.history)
        elif method['method'] == 'put':
            pass
        elif method['method'] == 'delete':
            pass
        for i in tasks['pages']:
            fuzzing(i, sess, req_types, types)


parsed_data = {}
parsing(parsed_data, data)
print(parsed_data['pages'][3])

sess = requests.Session()

headers = {'Content-type': 'application/json',
           'Accept': 'text/plain',
           'Content-Encoding': 'utf-8'}
s = sess.post('https://mc-master-0604.msp.ru.corp.acronis.com/api/1/login',
              data=json.dumps({"username": "Drelb", "password": "Egorpid1"}), verify=False,
              headers=headers)
s = sess.get('https://mc-master-0604.msp.ru.corp.acronis.com/bc')
s = sess.get('https://mc-master-0604.msp.ru.corp.acronis.com/api/task_manager/v2/status')

# tasks fuzzer
req_types = [random.randint(1, 10 ** 9), -random.randint(1, 10 ** 9),
             random.randint(10 ** 50, 10 ** 100), -random.randint(10 ** 50, 10 ** 100),
             random.uniform(0.0, 5.0), -random.uniform(0.0, 5.0), 0, rstr.letters(1, 64),
             rstr.letters(65, 256), rstr.nonwhitespace(1, 64), rstr.nonwhitespace(65, 256),
             rstr.letters(257, 2000), rstr.nonwhitespace(257, 2000), bool(random.getrandbits(1)),
             'егор']

types = {'uuid': r'^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$',
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
         'executionResult': {'code': r'(ok|error|warning|cancelled|abandoned|timedout)',
                             'error': {'domain': r'^[A-Za-z0-9_\.~-]+$',
                                       'code': r'^[A-Za-z0-9_\.~-]+$'},
                             'payload': r'^[A-Za-z0-9_\.~-]+$'},
         'time': r'^(\d+)-(0[1-9]|1[012])-(0[1-9]|[12]\d|3[01])[Tt]([01]\d|2[0-3]):([0-5]\d):([0-5]\d|60)(\.\d+)?(([Zz])|([\+|\-]([01]\d|2[0-3])))$',
         'duration': r'^(([01]?\d|2[0-3])h)?(([0-5]?\d)m)?(([0-5]?\d)s)?$',
         'linkedResource': {'id': r'^[A-Za-z0-9_\.~-]{1,64}$',
                            'type': r'^[A-Za-z0-9_\.~-]{1,64}$',
                            'name': r'^[A-Za-z0-9_\.~-]{1,256}$'},
         'workflowDefinition': {'uuid': r'^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$',
                                'type': r'^[A-Za-z0-9_\.~-]{1,64}$',
                                'tags': r'^[A-Za-z0-9_\.~-]{1,64}$',
                                'progress': {'total': r'^(-)?\d+$',
                                             'current': r'^(-)?\d+$'}},
         'taskPriority': r'(low|belowNormal|normal|aboveNormal|high)',
         'taskDefinition': {'uuid': r'^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$',
                            'type': r'^[A-Za-z0-9_\.~-]{1,64}$',
                            'queue': r'^[A-Za-z0-9_\.~-]{1,64}$',
                            'priority': r'(low|belowNormal|normal|aboveNormal|high)',
                            'heartBeatInterval': r'^(([01]?\d|2[0-3])h)?(([0-5]?\d)m)?(([0-5]?\d)s)?$',
                            'queueTimeout': r'^(([01]?\d|2[0-3])h)?(([0-5]?\d)m)?(([0-5]?\d)s)?$',
                            'ackTimeout': r'^(([01]?\d|2[0-3])h)?(([0-5]?\d)m)?(([0-5]?\d)s)?$',
                            'execTimeout': r'^(([01]?\d|2[0-3])h)?(([0-5]?\d)m)?(([0-5]?\d)s)?$',
                            'lifeTime': r'^(([01]?\d|2[0-3])h)?(([0-5]?\d)m)?(([0-5]?\d)s)?$',
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
         'activityDefinition': {'uuid': r'^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$',
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
         'blockerDefinition': {'uuid': r'^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$',
                               'taskId': r'^(-)?\d+$',
                               'activityId': r'^(-)?\d+$',
                               'issue': r'^[A-Za-z0-9_\.~-]+$'},
         'eventDefinition': {'code': r'^(-)?\d+$',
                             'taskId': r'^(-)?\d+$',
                             'activityId': r'^(-)?\d+$',
                             'severity': r'(info|warning|error)',
                             'message': r'^[A-Za-z0-9_\.~-]+$',
                             'payload': r'^[A-Za-z0-9_\.~-]+$',
                             'occurredAt': r'^(\d+)-(0[1-9]|1[012])-(0[1-9]|[12]\d|3[01])[Tt]([01]\d|2[0-3]):([0-5]\d):([0-5]\d|60)(\.\d+)?(([Zz])|([\+|\-]([01]\d|2[0-3])))$'},

         'levelOfDetail': r'(short|long|full|debug|count)',
         'timeFilter': r'^(\d+)-(0[1-9]|1[012])-(0[1-9]|[12]\d|3[01])[Tt]([01]\d|2[0-3]):([0-5]\d):([0-5]\d|60)(\.\d+)?(([Zz])|([\+|\-]([01]\d|2[0-3])))$',
         'taskConsumer': {'queues': r'^[A-Za-z0-9_\.~-]{1,64}$',
                          'timeout': r'^(([01]?\d|2[0-3])h)?(([0-5]?\d)m)?(([0-5]?\d)s)?$',
                          'qos': r'^(-)?\d+$'},
         'taskHeartbeat': {'taskId': r'^(-)?\d+$'}
}

fuzzing(parsed_data['pages'][3], sess, req_types, types)
