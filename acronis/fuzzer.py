import os
import json
import random
import string
os.system('node parser.js')
with open('parsed.json', 'r') as json_file:
    data = json.load(json_file)
print(data.keys())
data = {'types': data['types'], 'resources': data['resources'], 'baseUri': data['baseUri']}
for resource in data['resources']:
    print(resource)
