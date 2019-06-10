import os
import json
import wfuzz


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
print(parsed_data['pages'])
