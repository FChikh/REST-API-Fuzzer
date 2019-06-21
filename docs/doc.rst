*********************
Fuzzer
*********************

------------------
Files
------------------

~~~~~~~~~~~~~~~~~~
fuzzer:
~~~~~~~~~~~~~~~~~~
.. code-block:: python

    def convert_cookies_format(cookies):
        """ * Convert cookies from dictionary format to array
            * Variables:
                * new_cookies(arr) - array of strings of format 'key=value'
            * Argument:
                * cookies(dict) - dictionary contained cookies from session
            * Return:
                * new_cookies(arr) - variable new_cookies"""
    def convert_types(formatted_dict):
        """TODO"""
    def authorize():
        """ * Authorize on server, return session, now work only for Acronis
            * Variables:
                * session(obj) - session object contained current session
                * headers(dict) - dictionary contained data for login
            * Return:
                * session(Session) - variable session"""
    def parse_params(params, fuzz=''):
        """ * Parse queryParameters for lower level of parameters, return
              result
            * Variables:
                * result(str) - string contained data about queryParameters,
                  use following format: 'key=value&...'
            * Arguments:
                * params(arr) - array of queryParameters
                * fuzz(dict/str) - dictionary or string contained
                  queryParameter or empty string
            * Return:
                * result(str) - variable result"""
    def fuzz_first_step(page, hc, sc):
        """ * Fuzz uri, look for undeclared pages, use authorize() to set
              session, use recursion to fuzz all pages
            * Variables:
                * session(obj) - session object contained current session
                * url(string) - string contained current url
                * fuzz_sess(obj) - fuzzing session object contained current
                  fuzzing session
            * Arguments:
                * page(dict) - dictionary that contain data about page
                * specification(str) - string that can be '', 'hc', 'sc', used
                  to specify wfuzz
                * specification_codes(arr) - array of integers contained
                  status codes, used to specify specification of wfuzz"""

    def fuzz_second_step(page, hc, sc):
        """ * Fuzz parameters, look for undeclared status codes, use
              authorize() to set session, use recursion to fuzz all pages
            * Variables:
                * session(obj) - session object contained current session
                * url(string) - string contained current url
                * fuzz_sess(obj) - fuzzing session object contained current
                  fuzzing session
            * Arguments:
                * page(dict) - dictionary that contain data about page
                * specification(str) - string that can be '', 'hc', 'sc', used
                  to specify wfuzz
                * specification_codes(arr) - array of integers contained
                  status codes, used to specify specification of wfuzz"""

    def fuzz():
        """ * Run fuzz_first_step() and fuzz_second_step() to fuzz server
            * Variables:
                * None
            * Arguments:
                * data(dict) - dictionary that contain data about server
                * specification(str) - string that can be '', 'hc', 'sc', used
                  in fuzz_first_step() and fuzz_second_step() to specify wfuzz
                * specification_codes(arr) - array of integers contained
                  status codes, used in fuzz_first_step() and fuzz_second_step()
                  to specify specification of wfuzz"""

~~~~~~~~~~~~~~~~~~
py_parser:
~~~~~~~~~~~~~~~~~~
.. code-block:: python

    def parse(parsed_page, page, data):
        """ * Parse data from JSON to usable format, use recursion to parse all
              data, probably work with RAML v1.0, probably can be optimised
            * Variables:
                * All variables used only as iterators but probably their names
                  can be changed for better understanding
            * Arguments:
                * parsed_page(dict) - dictionary contained parsed data for
                  current page
                * page(dict) - dictionary contained data from JSON for current
                  page
                * data(dict) - dictionary contained data from JSON"""
    def fetch_parsed_data():
        """ * Start parser.js to parse data from RAML to JSON, fetch data from
              JSON file, use parse() to parse JSON file, return parsed data
            * Variables:
                * data(dict) - dictionary contained data from JSON
                * parsed_data(dict) - dictionary contained parsed data
            * Arguments:
                * path(str) - string contained full path to RAML file
            * Return:
                * parsed_data(dict) - variable parsed_data"""

~~~~~~~~~~~~~~~~~~
consts:
~~~~~~~~~~~~~~~~~~
.. code-block:: python

    domain = ''
        """ * domain(str) - const string contained domain of server"""
    req_types = []
        """ * req_types(arr) - const array contained data for fuzzing"""
    types = {}
        """ * types(dict) - const dictionary contained regexes for fuzzing"""

~~~~~~~~~~~~~~~~~~
run:
~~~~~~~~~~~~~~~~~~
.. code-block:: python

    def main():
        """ * Make console input/output, open/make file log.txt,
              specify fuzzer for user, call fetch_parsed_data() to fetch parsed
              data and fuzz() to fuzz
            * Variables:
                * ans(str) - string contained user answer
                * data(dict) - dictionary contained parsed data from json
                * start_time(time) - time variable used for calculation of
                  program working time
                * specification(str) - string that can be '', 'hc', 'sc', used
                  in fuzz, used to specify wfuzz
                * specification_codes(arr) - array of integers contained
                  status codes, used in fuzz, can be changed in fuzz"""
