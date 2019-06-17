from parser import fetch_parsed_data
from fuzzer import fuzzing_component1, fuzzing_component2

data = fetch_parsed_data()
fuzzing_component1(data)
fuzzing_component2(data)