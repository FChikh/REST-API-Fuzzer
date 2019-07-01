"""
This module is a launcher of our fuzzer
To run fuzzer, use 'python3 run.py' command
"""

import argparse
import sys
import time

import urllib3
from modules.fuzzer import fuzz
from modules.py_parser import fetch_parsed_data


def main():
    """
    Make console input/output, open/make file log.txt, specify fuzzer for user, call fetch_parsed_data() to fetch parsed
    data and fuzz() to fuzz
    :return: none
    """

    parser = argparse.ArgumentParser(
        description='Process some information about what to test')
    parser.add_argument('path',
                        help='Path to main RAML specification of your REST API')
    parser.add_argument('host', help='Address of testing server, with protocol')
    parser.add_argument('--hc',
                        help='Response codes to be hidden, if nothing classified - would be taken from RAML doc',
                        type=int, nargs='*')
    parser.add_argument('--sc',
                        help='Response codes to be shown, if nothing classified - would be taken from RAML doc',
                        type=int, nargs='*')
    parser.add_argument('--mode',
                        help='Choose beetween modes: 1 - random routing, 2 - fuzzing of parameters, 12 - both',
                        choices=['1', '2', '12'], required=True)
    args = parser.parse_args()

    urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
    start_time = time.time()
    file = open('log.txt', 'w')
    console_stdout = sys.stdout

    print('Starting...')
    try:
        print('Parsing RAML...')
        data, sensor = fetch_parsed_data(args.path)
        out = sensor.stdout.read(1)
        if int(out):
            pass
        else:
            print('Wrong path!')
            raise ValueError
    except ValueError:
        sys.exit(0)
    else:
        print('Finished')
    specification = ''
    specification_codes = []
    try:
        if [x for x in ["sc"] if len(vars(args)[x]) >= 0] and \
                [x for x in ["hc"] if len(vars(args)[x]) >= 0]:
            print('Bad usage: Hide and show filters flags are mutually '
                  'exclusive. Only one group could be specified.')
            sys.exit(0)
    except TypeError:
        pass
    if vars(args)['hc'] is not None:
        specification = 'hc'
        specification_codes = vars(args)['hc']
    if vars(args)['sc'] is not None:
        specification = 'sc'
        specification_codes = vars(args)['sc']
    print('Fuzzing...')
    sys.stdout = file
    fuzz(data, specification, specification_codes, args.host, args.mode)
    sys.stdout = console_stdout
    print('Done! Check out log.txt file')
    print("--- %s seconds ---" % (time.time() - start_time))


if __name__ == '__main__':
    main()
