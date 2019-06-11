import itertools
import json
import os
import random

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
                    try:
                        for type in data['types']:
                            if type[list(type.keys())[0]]['name'] == tmp_dict['type']:
                                tmp_dict['type'] = type[list(type.keys())[0]]['type'][0]
                                break
                    except KeyError:
                        pass
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
                                for type in data['types']:
                                    if type[list(type.keys())[0]]['name'] == tmp_dict['type']:
                                        tmp_dict['type'] = type[list(type.keys())[0]]['type'][0]
                                        break
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
    rand_dict = [
        'oqwhefoiqhwefohqwopefughqowiuefgoiwughqfoiuqgwoefdugqowiebwiqubedoiquwgediunqwgedgwuqeydfgioquwydoiqwuedoiqwuegdioqywedfuyfqwiuefyiueygrfiqwnhboiduh',
        'егооооор', 'ridfhidhf',
        182736493484, 38, 1234567890, -999999, 0, 0.4452344, -12394812693816938719236139456934879]
    for method in tasks['methods']:
        if method['method'] == 'get' and not tasks['is_changeable']:
            params = method['queryParameters']
            for i in params:
                url = domain + tasks['uri'] + '?'
                for j in params:
                    if i != j: # and !j['required']:
                        print(j['type'])
                        url += j['name'] + '=' + rstr.xeger(types[j['type']]) + '&'

                url += i['name'] + '=FUZZ'
                print(url)
                s = wfuzz.FuzzSession(url=url, cookie=convert_cookies_format(sess.cookies.get_dict())).get_payload(req_types)
                for r in s.fuzz(hc=[200, 400]):
                    print(r)

            # for i in itertools.product([0, 1], repeat=len(params)):
            #     if sum(i) == 0:
            #         continue
            #     url = domain + tasks['uri'] + '?'
            #     cnt = 0
            #     for j in range(len(params)):
            #         if i[j] == 1:
            #             cnt += 1
            #             if cnt != 1:
            #                 url += params[j]['name'] + '=FUZ' + str(cnt) + 'Z&'
            #             else:
            #                 url += params[j]['name'] + '=FUZZ&'
            #     print(url)
            #     if sum(i) == 1:
            #         f = wfuzz.FuzzSession(url=url,
            #                               cookie=convert_cookies_format(
            #                                   sess.cookies.get_dict())).get_payload(
            #             rand_dict)
            #     else:
            #         payload = [rand_dict] * sum(i)
            #         f = wfuzz.FuzzSession(url=url,
            #                               cookie=convert_cookies_format(
            #                                   sess.cookies.get_dict())).get_payloads(
            #             payload)
            #
            #     for r in f.fuzz(hc=[200, 400]):
            #         print(r)
        elif method['method'] == 'post':
            params_body = method['body']['properties']
            params_query = method['queryParameters']
            for i in params_query:
                url = domain + tasks['uri'] + '?'
                postdata = ''
                for j in params_query:
                    if i != j and j['required']:
                        try:
                            url += j['name'] + '=' + rstr.xeger(types[j['type']]) + '&'
                        except KeyError:
                            pass
                for j in params_body:
                    if i != j and j['required']:
                        try:
                            postdata += j['name'] + '=' + rstr.xeger(types[j['type']]) + '&'
                        except KeyError:
                            pass
                url += i['name'] + '=FUZZ'
                print(url)
                s = wfuzz.FuzzSession(url=url, cookie=convert_cookies_format(
                    sess.cookies.get_dict())).get_payload(req_types)
                for r in s.fuzz(hc=[200, 400]):
                    print(r)
            # for i in itertools.product([0, 1], repeat=len(params_body) + len(params_query)):
            #     print(i)
            #     if sum(i) == 0:
            #         continue
            #     url = domain + tasks['uri'] + '?'
            #     cnt_query = 0
            #     cnt_body = 0
            #     postdata = ''
            #     for j in range(len(params_body)):
            #         if i[j] == 1:
            #             cnt_body += 1
            #             if cnt_query + cnt_body == 1:
            #                 postdata += params_body[j]['name'] + '=FUZZ'
            #             elif cnt_body == 1:
            #                 postdata += params_body[j]['name'] + '=FUZ' + str(
            #                     cnt_body + cnt_query) + 'Z'
            #             else:
            #                 postdata += '&' + params_body[j]['name'] + '=FUZ' + str(
            #                     cnt_body + cnt_query) + 'Z'
            #     for j in range(1, len(params_query) + 1):
            #         if i[-j] == 1:
            #             cnt_query += 1
            #             if cnt_query + cnt_body == 1:
            #                 url += params_query[-j]['name'] + '=FUZZ'
            #             elif cnt_query == 1:
            #                 url += params_query[-j]['name'] + '=FUZ' + str(
            #                     cnt_query + cnt_body) + 'Z'
            #             else:
            #                 url += '&' + params[-j]['name'] + '=FUZ' + str(
            #                     cnt_query + cnt_body) + 'Z'
            #
            #     if sum(i) == 1:
            #         f = wfuzz.FuzzSession(url=url, postdata=postdata,
            #                               cookie=convert_cookies_format(
            #                                   sess.cookies.get_dict())).get_payload(
            #             rand_dict)
            #     else:
            #         payload = [rand_dict] * sum(i)
            #         f = wfuzz.FuzzSession(url=url, postdata=postdata,
            #                               cookie=convert_cookies_format(
            #                                   sess.cookies.get_dict())).get_payloads(
            #             payload)
            #
            #     for r in f.fuzz(hc=[400]):
            #         print(r)
            pass
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
         'string64': r'^.{1,64}$',
         'string256': r'^.{1,256}$',
         'domainError': {'domain': r'^.+$',
                         'code': r'^.+$'},
         'pageToken': r'^[A-Za-z0-9+/]+=$',
         'pagedCollection': {'cursors': {'after': r'^[A-Za-z0-9+/]+=$',
                                         'before': r'^[A-Za-z0-9+/]+=$'}},
         'queueStatus': {'size': r'^(-)?\d+$'},
         'progress': {'total': r'^(-)?\d+$',
                      'current': r'^(-)?\d+$'},
         'actor': {'id': r'^.{1,64}$',
                   'clusterId': r'^.{1,64}$'},

         'executionState': r'(enqueued|assigned|started|paused|completed)',
         'blob': r'^.+$',
         'resultCode': r'(ok|error|warning|cancelled|abandoned|timedout)',
         'executionResult': {'code': r'(ok|error|warning|cancelled|abandoned|timedout)',
                             'error': {'domain': r'^.+$',
                                       'code': r'^.+$'},
                             'payload': r'^.+$'},
         'time': r'^(\d+)-(0[1-9]|1[012])-(0[1-9]|[12]\d|3[01])[Tt]([01]\d|2[0-3]):([0-5]\d):([0-5]\d|60)(\.\d+)?(([Zz])|([\+|\-]([01]\d|2[0-3])))$',
         'duration': r'^(([01]?\d|2[0-3])h)?(([0-5]?\d)m)?(([0-5]?\d)s)?$',
         'linkedResource': {'id': r'^.{1,64}$',
                            'type': r'^.{1,64}$',
                            'name': r'^.{1,256}$'},
         'workflowDefinition': {'uuid': r'^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$',
                                'type': r'^.{1,64}$',
                                'tags': r'^.{1,64}$',
                                'progress': {'total': r'^(-)?\d+$',
                                             'current': r'^(-)?\d+$'}},
         'taskPriority': r'(low|belowNormal|normal|aboveNormal|high)',
         'taskDefinition': {'uuid': r'^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$',
                            'type': r'^.{1,64}$',
                            'queue': r'^.{1,64}$',
                            'priority': r'(low|belowNormal|normal|aboveNormal|high)',
                            'heartBeatInterval': r'^(([01]?\d|2[0-3])h)?(([0-5]?\d)m)?(([0-5]?\d)s)?$',
                            'queueTimeout': r'^(([01]?\d|2[0-3])h)?(([0-5]?\d)m)?(([0-5]?\d)s)?$',
                            'ackTimeout': r'^(([01]?\d|2[0-3])h)?(([0-5]?\d)m)?(([0-5]?\d)s)?$',
                            'execTimeout': r'^(([01]?\d|2[0-3])h)?(([0-5]?\d)m)?(([0-5]?\d)s)?$',
                            'lifeTime': r'^(([01]?\d|2[0-3])h)?(([0-5]?\d)m)?(([0-5]?\d)s)?$',
                            'maxAssignCount': r'^(-)?\d+$',
                            'cancellable': r'(True|False)',
                            'startedByUser': r'^.{1,256}$',
                            'policy': {'id': r'^.{1,64}$',
                                       'type': r'^.{1,64}$',
                                       'name': r'^.{1,256}$'},
                            'resource': {'id': r'^.{1,64}$',
                                         'type': r'^.{1,64}$',
                                         'name': r'^.{1,256}$'},
                            'tags': r'^.{1,64}$',
                            'affinity': {'agentId': r'^.{1,64}$',
                                         'clusterId': r'^.{1,64}$'},
                            'argument': r'^.+$',
                            'workflowId': r'^(-)?\d+$',
                            'context': r'^.+$'},
         'activityDefinition': {'uuid': r'^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$',
                                'type': r'^.{1,64}$',
                                'taskId': r'^(-)?\d+$',
                                'parentActivityId': r'^(-)?\d+$',
                                'progress': {'total': r'^(-)?\d+$',
                                             'current': r'^(-)?\d+$'},
                                'tags': r'^.{1,64}$',
                                'resource': {'id': r'^.{1,64}$',
                                             'type': r'^.{1,64}$',
                                             'name': r'^.{1,256}$'},
                                'state': r'(enqueued|assigned|started|paused|completed)',
                                'details': r'^.+$'},
         'blockerDefinition': {'uuid': r'^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$',
                               'taskId': r'^(-)?\d+$',
                               'activityId': r'^(-)?\d+$',
                               'issue': r'^.+$'},
         'eventDefinition': {'code': r'^(-)?\d+$',
                             'taskId': r'^(-)?\d+$',
                             'activityId': r'^(-)?\d+$',
                             'severity': r'(info|warning|error)',
                             'message': r'^.+$',
                             'payload': r'^.+$',
                             'occurredAt': r'^(\d+)-(0[1-9]|1[012])-(0[1-9]|[12]\d|3[01])[Tt]([01]\d|2[0-3]):([0-5]\d):([0-5]\d|60)(\.\d+)?(([Zz])|([\+|\-]([01]\d|2[0-3])))$'},

         'levelOfDetail': r'(short|long|full|debug|count)',
         'timeFilter': r'^((\d+)-(0[1-9]|1[012])-(0[1-9]|[12]\d|3[01])[Tt]([01]\d|2[0-3]):([0-5]\d):([0-5]\d|60)(\.\d+)?(([Zz])|([\+|\-]([01]\d|2[0-3]))))? ((Sun|Mon|Tue|Wed|Thu|Fri|Sat), (0[1-9]|[12]\d|3[01])[Tt]([01]\d|2[0-3]) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d+) ([01]\d|2[0-3]):([0-5]\d):([0-5]\d|60) GMT)? ((Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (0[1-9]|[12]\d|3[01])[Tt]([01]\d|2[0-3])-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d+) ([01]\d|2[0-3]):([0-5]\d):([0-5]\d|60) GMT)? (((\d+)-(0[1-9]|1[012])-(0[1-9]|[12]\d|3[01]))?$',
         'taskConsumer': {'queues': r'^.{1,64}$',
                          'timeout': r'^(([01]?\d|2[0-3])h)?(([0-5]?\d)m)?(([0-5]?\d)s)?$',
                          'qos': r'^(-)?\d+$'},
         'taskHeartbeat': {'taskId': r'^(-)?\d+$'}
}


fuzzing(parsed_data['pages'][4], sess, req_types, types)

