import os
import json


def parsing(parsed_page, page):
    try:
        parsed_page['baseUri'] = page['baseUri']
    except KeyError:
        try:
            parsed_page['uri'] = page['absoluteUri']
        except KeyError:
            print(page)
    try:
        parsed_page['protocols'] = page['methods'][0]['protocols']
    except KeyError:
        parsed_page['protocols'] = page['protocols']
    try:
        parsed_page['method'] = page['methods'][0]['method']
    except KeyError:
        pass
    try:
        parsed_page['responses'] = []
        for response in page['methods'][0]['responses']:
            tmp_dict = {'code': page['methods'][0]['responses'][response]['code'],
                        'type': page['methods'][0]['responses'][response]['body']['application/json']['type']}
            parsed_page['responses'].append(tmp_dict)
    except KeyError:
        pass
    parsed_page['pages'] = []
    try:
        for resource in page['resources']:
            parsed_page['pages'].append({})
            parsing(parsed_page['pages'][len(parsed_page['pages']) - 1], resource)
    except KeyError:
        pass


os.system('node parser.js')
with open('parsed.json', 'r') as json_file:
    data = json.load(json_file)
print(data.keys())
data = {'types': data['types'], 'resources': data['resources'], 'baseUri': data['baseUri']}
for resource in data['resources']:
    print(resource)

for resource in data['resources']:
    for method in resource['methods']:
        if method['method'] == 'get':

        elif method['method'] == 'post':
            pass
        elif method['method'] == 'put':
            pass
        elif method['method'] == 'delete':
            pass

    pass
