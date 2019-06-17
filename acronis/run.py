from parser import fetch_parsed_data
from fuzzer import fuzzing_component1, fuzzing_component2

import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

data = fetch_parsed_data()
fuzzing_component1(data)
fuzzing_component2(data)
