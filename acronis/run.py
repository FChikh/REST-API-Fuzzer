from py_parser import fetch_parsed_data
from fuzzer import fuzz
import urllib3
import sys
import time
start_time = time.time()

file = open('log.txt', 'w')
console_stdout = sys.stdout

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

print('Starting...')
print('Parsing RAML...')
data = fetch_parsed_data('C:/Users/egorl/Downloads/REST-API-Fuzzer/acronis/api.raml')
print('Finished')
print('Fuzzing...')
sys.stdout = file
fuzz(data)
sys.stdout = console_stdout
print('Done! Check out log.txt file')
print("--- %s seconds ---" % (time.time() - start_time))
