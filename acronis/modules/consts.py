"""
This module contains params, that are used in our fuzzer
"""

import random
import rstr

domain = 'https://mc-w5vz-1306.msp.ru.corp.acronis.com'

req_types = [random.randint(1, 10 ** 9), -random.randint(1, 10 ** 9),
             random.randint(10 ** 50, 10 ** 100),
             -random.randint(10 ** 50, 10 ** 100),
             random.uniform(0.0, 5.0), -random.uniform(0.0, 5.0), 0,
             rstr.letters(1, 64),
             rstr.letters(65, 256), rstr.nonwhitespace(1, 64),
             rstr.nonwhitespace(65, 256),
             rstr.letters(257, 2000), rstr.nonwhitespace(257, 2000),
             int(bool(random.getrandbits(1))),
             'абвгдеёжзийклмнопрстуфхцчшщъыьэюя']
"""
:type: list

Contains parameters of different types(str, int, long int), 
that our fuzzer places as a QueryParameter or UriParameter in request methods 
from RAML specification to identify incorrect error codes
"""

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
"""
:type: dict

Contains regular expressions for types from RAML specification
Are used by rstr library to generate correct param of choden type
"""
