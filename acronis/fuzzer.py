import os
import json


os.system('node parser.js')
with open('parsed.json', 'r') as json_file:
    parsed_data = json.load(json_file)


def parsing(parsed_page, page):
    try:
        parsed_page['baseUri'] = page['baseUri']
    except KeyError:
        try:
            parsed_page['uri'] = page['absoluteUri']
        except KeyError:
            pass

    try:
        parsed_page['protocols'] = page['methods'][0]['protocols']
    except KeyError:
        parsed_page['protocols'] = page['protocols']

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
                        for type in parsed_data['types']:
                            if type[list(type.keys())[0]]['name'] == tmp_dict['type']:
                                tmp_dict['type'] = type[list(type.keys())[0]]['type'][0]
                    except KeyError:
                        pass
                    tmp_method['queryParameters'].append(tmp_dict)
            except KeyError:
                pass
            tmp_method['responses'] = []
            try:
                for response in method['responses']:
                    tmp_dict = {'code': method['responses'][response]['code'],
                                'type': method['responses'][response]['body']['application/json']['type'][0]}
                    parsed_page['responses'].append(tmp_dict)
            except KeyError:
                pass
            parsed_page['methods'].append(tmp_method)
    except KeyError:
        pass

    parsed_page['pages'] = []
    try:
        for resource in page['resources']:
            parsed_page['pages'].append({})
            parsing(parsed_page['pages'][len(parsed_page['pages']) - 1], resource)
    except KeyError:
        pass


data = {}
parsing(data, parsed_data)
print(data)
