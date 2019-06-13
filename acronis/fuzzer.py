import os
import json
import requests
import string
import random
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)


os.system('node parser.js')
with open('parsed.json', 'r') as json_file:
    data = json.load(json_file)


def get_fuzzing(page):
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
            g = s.get('https://mc-master-0604.msp.ru.corp.acronis.com' + page['baseUri'] + '/' +
                  ''.join(random.choices(string.ascii_letters + string.digits + '_.~-', k=random.randint(1, 100))))
            if g.status_code != 404:
                print(g)
    except KeyError:
        for i in range(1000):
            g = s.get('https://mc-master-0604.msp.ru.corp.acronis.com' + page['uri'] + '/' +
                  ''.join(random.choices(string.ascii_letters + string.digits + '_.~-', k=random.randint(1, 100))))
            if g.status_code != 404:
                print(g)
    for i in page['pages']:
        get_fuzzing(i)


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
                                    tmp_dict['properties'][tmp['name']][i] = tmp['properties'][i]['type'][0]

                    tmp_method['queryParameters'].append(tmp_dict)
            except KeyError:
                pass
            try:
                tmp_method['body'] = {'name': method['body']['application/json']['type'][0], 'properties': []}
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
                                        tmp_parameter = parameter['properties'][property_tmp]
                                        tmp_dict['properties'][tmp_parameter['name']] = tmp_parameter['type'][0]
                                        if tmp_parameter['type'][0] == 'object':
                                            tmp_dict['properties'][tmp_parameter['name']] = {}
                                            for i in tmp_parameter['properties']:
                                                tmp_dict['properties'][tmp_parameter['name']][i] = tmp['properties'][i]['type'][0]
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
                                'type': method['responses'][response]['body']['application/json']['type'][0]}
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


parsed_data = {}
parsing(parsed_data, data)
types = {'uuid': r'^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$',
         'integer': r'^\d+$',
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


get_fuzzing(parsed_data)
