import os
import json


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
         'string64': r'^[^\t\n\r\s]{1,64}$',
         'string256': r'^[^\t\n\r\s]{1,256}$',
         'domainError': {'domain': r'^[^\t\n\r\s]+$',
                         'code': r'^[^\t\n\r\s]+$'},
         'pageToken': r'^[A-Za-z0-9+/]+=$',
         'pagedCollection': {'cursors': {'after': r'^[A-Za-z0-9+/]+=$',
                                         'before': r'^[A-Za-z0-9+/]+=$'}},
         'queueStatus': {'size': r'^(-)?\d+$'},
         'progress': {'total': r'^(-)?\d+$',
                      'current': r'^(-)?\d+$'},
         'actor': {'id': r'^[^\t\n\r\s]{1,64}$',
                   'clusterId': r'^[^\t\n\r\s]{1,64}$'},

         'executionState': r'(enqueued|assigned|started|paused|completed)',
         'blob': r'^[^\t\n\r\s]+$',
         'resultCode': r'(ok|error|warning|cancelled|abandoned|timedout)',
         'executionResult': {'code': r'(ok|error|warning|cancelled|abandoned|timedout)',
                             'error': {'domain': r'^[^\t\n\r\s]+$',
                                       'code': r'^[^\t\n\r\s]+$'},
                             'payload': r'^[^\t\n\r\s]+$'},
         'time': r'^(\d+)-(0[1-9]|1[012])-(0[1-9]|[12]\d|3[01])[Tt]([01]\d|2[0-3]):([0-5]\d):([0-5]\d|60)(\.\d+)?(([Zz])|([\+|\-]([01]\d|2[0-3])))$',
         'duration': r'^(([01]?\d|2[0-3])h)?(([0-5]?\d)m)?(([0-5]?\d)s)?$',
         'linkedResource': {'id': r'^[^\t\n\r\s]{1,64}$',
                            'type': r'^[^\t\n\r\s]{1,64}$',
                            'name': r'^[^\t\n\r\s]{1,256}$'},
         'workflowDefinition': {'uuid': r'^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$',
                                'type': r'^[^\t\n\r\s]{1,64}$',
                                'tags': r'^[^\t\n\r\s]{1,64}$',
                                'progress': {'total': r'^(-)?\d+$',
                                             'current': r'^(-)?\d+$'}},
         'taskPriority': r'(low|belowNormal|normal|aboveNormal|high)',
         'taskDefinition': {'uuid': r'^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$',
                            'type': r'^[^\t\n\r\s]{1,64}$',
                            'queue': r'^[^\t\n\r\s]{1,64}$',
                            'priority': r'(low|belowNormal|normal|aboveNormal|high)',
                            'heartBeatInterval': r'^(([01]?\d|2[0-3])h)?(([0-5]?\d)m)?(([0-5]?\d)s)?$',
                            'queueTimeout': r'^(([01]?\d|2[0-3])h)?(([0-5]?\d)m)?(([0-5]?\d)s)?$',
                            'ackTimeout': r'^(([01]?\d|2[0-3])h)?(([0-5]?\d)m)?(([0-5]?\d)s)?$',
                            'execTimeout': r'^(([01]?\d|2[0-3])h)?(([0-5]?\d)m)?(([0-5]?\d)s)?$',
                            'lifeTime': r'^(([01]?\d|2[0-3])h)?(([0-5]?\d)m)?(([0-5]?\d)s)?$',
                            'maxAssignCount': r'^(-)?\d+$',
                            'cancellable': r'(True|False)',
                            'startedByUser': r'^[^\t\n\r\s]{1,256}$',
                            'policy': {'id': r'^[^\t\n\r\s]{1,64}$',
                                       'type': r'^[^\t\n\r\s]{1,64}$',
                                       'name': r'^[^\t\n\r\s]{1,256}$'},
                            'resource': {'id': r'^[^\t\n\r\s]{1,64}$',
                                         'type': r'^[^\t\n\r\s]{1,64}$',
                                         'name': r'^[^\t\n\r\s]{1,256}$'},
                            'tags': r'^[^\t\n\r\s]{1,64}$',
                            'affinity': {'agentId': r'^[^\t\n\r\s]{1,64}$',
                                         'clusterId': r'^[^\t\n\r\s]{1,64}$'},
                            'argument': r'^[^\t\n\r\s]+$',
                            'workflowId': r'^(-)?\d+$',
                            'context': r'^[^\t\n\r\s]+$'},
         'activityDefinition': {'uuid': r'^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$',
                                'type': r'^[^\t\n\r\s]{1,64}$',
                                'taskId': r'^(-)?\d+$',
                                'parentActivityId': r'^(-)?\d+$',
                                'progress': {'total': r'^(-)?\d+$',
                                             'current': r'^(-)?\d+$'},
                                'tags': r'^[^\t\n\r\s]{1,64}$',
                                'resource': {'id': r'^[^\t\n\r\s]{1,64}$',
                                             'type': r'^[^\t\n\r\s]{1,64}$',
                                             'name': r'^[^\t\n\r\s]{1,256}$'},
                                'state': r'(enqueued|assigned|started|paused|completed)',
                                'details': r'^[^\t\n\r\s]+$'},
         'blockerDefinition': {'uuid': r'^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$',
                               'taskId': r'^(-)?\d+$',
                               'activityId': r'^(-)?\d+$',
                               'issue': r'^[^\t\n\r\s]+$'},
         'eventDefinition': {'code': r'^(-)?\d+$',
                             'taskId': r'^(-)?\d+$',
                             'activityId': r'^(-)?\d+$',
                             'severity': r'(info|warning|error)',
                             'message': r'^[^\t\n\r\s]+$',
                             'payload': r'^[^\t\n\r\s]+$',
                             'occurredAt': r'^(\d+)-(0[1-9]|1[012])-(0[1-9]|[12]\d|3[01])[Tt]([01]\d|2[0-3]):([0-5]\d):([0-5]\d|60)(\.\d+)?(([Zz])|([\+|\-]([01]\d|2[0-3])))$'},

         'levelOfDetail': r'(short|long|full|debug|count)',
         'timeFilter': r'^(\d+)-(0[1-9]|1[012])-(0[1-9]|[12]\d|3[01])[Tt]([01]\d|2[0-3]):([0-5]\d):([0-5]\d|60)(\.\d+)?(([Zz])|([\+|\-]([01]\d|2[0-3])))$',
         'taskConsumer': {'queues': r'^[^\t\n\r\s]{1,64}$',
                          'timeout': r'^(([01]?\d|2[0-3])h)?(([0-5]?\d)m)?(([0-5]?\d)s)?$',
                          'qos': r'^(-)?\d+$'},
         'taskHeartbeat': {'taskId': r'^(-)?\d+$'}
}
