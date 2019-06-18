import urllib3
import sys
from py_parser import fetch_parsed_data
from fuzzer import fuzzing_component1, fuzzing_component2


file = open('log.txt', 'w')
sys.stdout = file

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

data = fetch_parsed_data()
fuzzing_component1(data)
for page in data['pages']:
    fuzzing_component2(page)
