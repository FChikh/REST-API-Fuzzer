"""
This module is a parser of our fuzzer
It converts from RAML specs to JSON format
"""

import json
import os
from subprocess import PIPE, Popen


def parse(parsed_page, page, data):
    """
    Parse data from JSON to usable format, use recursion to parse all data, probably work with RAML v1.0, probably can
    be optimised
    :param parsed_page: dictionary contained parsed data for current page
    :type: dict
    :param page: dictionary contained data from JSON for current page
    :type: dict
    :param data: dictionary contained data from JSON
    :type: dict
    :return: none
    """
    try:
        parsed_page['baseUri'] = page['baseUri']
        parsed_page['is_changeable'] = False
        parsed_page['type'] = None
    except KeyError:
        try:
            parsed_page['relativeUri'] = page['relativeUri']
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
                                for property_tmp in tmp['properties']:
                                    tmp_dict['properties'][tmp['name']][property_tmp] = tmp['properties'][property_tmp]['type'][0]
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
                                            for new_property in tmp_parameter['properties']:
                                                tmp_dict['properties'][tmp_parameter['name']][new_property] = \
                                                    tmp['properties'][new_property]['type'][0]
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
            parsed_page['pages'].append({'type': parsed_page['type'],
                                         'is_changeable': parsed_page['is_changeable']});
            parse(parsed_page['pages'][-1], resource, data)
    except KeyError:
        pass


def fetch_parsed_data(path):
    """
    Start parser.js to parse data from RAML to JSON, fetch data from JSON file, use parse() to parse JSON file, return
    parsed data
    :param path: string contained full path to RAML file
    :type: str
    :return: dictionary contained parsed data and object contained response from parser.js
    :rtype: dict, obj
    """
    sensor = Popen(['node', 'modules/parser.js', path], stdout=PIPE)
    with open('modules/parsed.json', 'r') as json_file:
        data = json.load(json_file)

    parsed_data = {}
    parse(parsed_data, data, data)
    return parsed_data, sensor
