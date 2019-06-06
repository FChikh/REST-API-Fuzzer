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
        parsed_page['responces'] = []
        for responce in page['methods'][0]['responces']:
            tmp_dict = {'code': responce['code'], 'type': responce['body']['type']}
            parsed_page['responces'].append(tmp_dict)
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
    parsed_data = json.load(json_file)
data = {}
parsing(data, parsed_data)
print(data)
