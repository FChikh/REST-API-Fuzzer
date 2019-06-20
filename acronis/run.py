from modules.py_parser import fetch_parsed_data
from modules.fuzzer import fuzz
import urllib3
import sys
import time
start_time = time.time()

file = open('log.txt', 'w')
console_stdout = sys.stdout

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

print('Starting...')
while True:
    path = input('Full path to main RAML doc')
    try:
        print('Parsing RAML...')
        data = fetch_parsed_data(path)
    except:
        print('Wrong path!')
    else:
        print('Finished')
        break
hc = []
sc = []
while True:
    ans = input('Want to specify errors, that should not be shown? (y/n)')
    if ans in ['y', 'Y']:
        try:
            hc = list(map(int, input('Specify them, splitting with spaces').split()))
        except TypeError:
            print('Wrong format')
        else:
            break
    elif ans in ['n', 'N']:
        break
    else:
        pass
while True:
    ans = input('Want to specify errors, that should be shown? (y/n)')
    if ans in ['y', 'Y']:
        try:
            sc = list(map(int, input('Specify them, splitting with spaces').split()))
        except TypeError:
            print('Wrong format')
        else:
            break
    elif ans in ['n', 'N']:
        break
    else:
        pass

print('Fuzzing...')
sys.stdout = file
fuzz(data, hc, sc)
sys.stdout = console_stdout
print('Done! Check out log.txt file')
print("--- %s seconds ---" % (time.time() - start_time))
