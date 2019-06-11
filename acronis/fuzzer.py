import os
import json
import random


os.system('node parser.js')
with open('parsed.json', 'r') as json_file:
    data = json.load(json_file)


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
                tmp_method['body'] = {'name': method['body']['application/json']['type'][0], 'properties': []}
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
