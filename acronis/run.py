from py_parser import fetch_parsed_data
from fuzzer import fuzzing_component1, fuzzing_component2
import urllib3
import sys
import time
start_time = time.time()

file = open('log.txt', 'w')
console_stdout = sys.stdout

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

print('Starting...')
print('Parsing RAML...')
data = fetch_parsed_data()
print('Finished')
print('1st fuzzing component...')
sys.stdout = file
fuzzing_component1(data)
sys.stdout = console_stdout
print('Finished')
print('2nd fuzzing component...')
sys.stdout = file
for page in data['pages']:
    fuzzing_component2(page)
sys.stdout = console_stdout
print('Done! Check out log.txt file')
print("--- %s seconds ---" % (time.time() - start_time))
