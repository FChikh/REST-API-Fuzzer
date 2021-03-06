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
        """ * Convert cookies from dictionary format to list
            * Variables:
                * new_cookies(list) - list of strings of format 'key=value'
            * Argument:
                * cookies(dict) - dictionary contained cookies from session
            * Return:
                * new_cookies(list) - variable new_cookies"""

    def convert_types(type_dict):
        """ * Check dictionary on nested dictionaries, convert it into one
              dictionary without nested dictionaries
            * Variables:
                * formatted_dict(dict) - dictionary contained data from
                  type_dict without nested dictionary in it
            * Arguments:
                * type_dict(dict) - dictionary that can contain nested
                  dictionaries
            * Return:
                * formatted_dict(dict) - variable formatted_dict"""

    def authorize(domain):
        """ * Authorize on server, return session
            * Variables:
                * session(obj) - session object contained current session
                * headers(dict) - dictionary contained data for login
            * Arguments:
                * domain(str) - string contained domain name of server
            * Return:
                * session(Session) - variable session"""

    def parse_params(params, fuzz=''):
        """ * Parse queryParameters for lower level of parameters, return
              result
            * Variables:
                * result(str) - string contained data about queryParameters,
                  use following format: 'key=value&...'
            * Arguments:
                * params(list) - list of parameters
                * fuzz(str) - string contained parameter name
            * Return:
                * result(str) - variable result"""

    def print_fuzz_data(page, specification, specification_codes, fuzz_sess,
                        url, cur_method='get', postdata=''):
        """ * Launch fuzzing, print results, url, postdata
            * Arguments:
                * page(dict) - dictionary that contain data about page
                * specification(str) - string that can be '', 'hc', 'sc', used
                  to specify wfuzz
                * specification_codes(list) - list of integers contained
                  status codes, used to specify specification of wfuzz
                * fuzz_sess(obj) - fuzzing session object contained data about
                  current fuzzing session
                * url(str) - string contained current url
                * cur_method(str) - string contained current method
                * postdata(str) - string contained data of post method"""

    def fuzz_first_step(page, specification, specification_codes, domain):
        """ * Fuzz uri, look for undeclared pages, use authorize() to set
              session, use print_fuzz_data() to print data about fuzzing,
              use recursion to fuzz all pages
            * Variables:
                * session(obj) - session object contained current session
                * url(string) - string contained current url
                * fuzz_sess(obj) - fuzzing session object contained current
                  fuzzing session
            * Arguments:
                * page(dict) - dictionary that contain data about page
                 * specification(str) - string that can be '', 'hc', 'sc', used
                  in print_fuzz_data() to specify wfuzz
                * specification_codes(list) - list of integers contained
                  status codes, used in print_fuzz_data to specify specification
                  of wfuzz
                * domain(str) - string contained domain name of server"""

    def fuzz_second_step(page, specification, specification_codes, domain):
        """ * Fuzz parameters, look for undeclared status codes, use
              authorize() to set session, use print_fuzz_data() to print data,
              about fuzzing use recursion to fuzz all pages
            * Variables:
                * session(obj) - session object contained current session
                * url(string) - string contained current url
                * fuzz_sess(obj) - fuzzing session object contained current
                  fuzzing session
            * Arguments:
                * page(dict) - dictionary that contain data about page
                * specification(str) - string that can be '', 'hc', 'sc', used
                  in print_fuzz_data() to specify wfuzz
                * specification_codes(list) - list of integers contained
                  status codes, used in print_fuzz_data to specify specification
                  of wfuzz
                * domain(str) - string contained domain name of server"""

    def fuzz(data, specification, specification_codes, domain):
        """ * Run fuzz_first_step() and fuzz_second_step() to fuzz server
            * Variables:
                * None
            * Arguments:
                * data(dict) - dictionary that contain data about server
                * specification(str) - string that can be '', 'hc', 'sc', used
                  in fuzz_first_step() and fuzz_second_step() to specify wfuzz
                * specification_codes(list) - list of integers contained
                  status codes, used in fuzz_first_step() and fuzz_second_step()
                  to specify specification of wfuzz
                * domain(str) - string contained domain name of server"""

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
                * sensor(obj) - object contained response from parser.js
            * Arguments:
                * path(str) - string contained full path to RAML file
            * Return:
                * parsed_data(dict) - variable parsed_data
                * sensor(obj) - variable sensor"""

~~~~~~~~~~~~~~~~~~
consts:
~~~~~~~~~~~~~~~~~~
.. code-block:: python

    req_types = []
        """ * req_types(list) - const list contained data for fuzzing"""
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
                * console_stdout(obj) - object contained data about output
                  stream
                * data(dict) - dictionary contained parsed data from json
                * domain(str) - string contained domain name of server
                * file(obj) - object contained data about log.txt
                * out(str) - string that can be '0', '1', used to catch 'Wrong
                  path!' error
                * start_time(time) - time variable used for calculation of
                  program working time
                * specification(str) - string that can be '', 'hc', 'sc', used
                  in fuzz, used to specify wfuzz
                * specification_codes(list) - list of integers contained
                  status codes, used in fuzz, can be changed in fuzz"""

------------------
Cmd help
------------------
.. code-block:: none

    usage: run.py [-h] [--hc [HC [HC ...]]] [--sc [SC [SC ...]]] --mode {1,2,12}
                  path host

    Process some information about what to test

    positional arguments:
      path                Path to main RAML specification of your REST API
      host                Address of testing server, with protocol

    optional arguments:
      -h, --help          show this help message and exit
      --hc [HC [HC ...]]  Response codes to be hidden, if nothing classified -
                          would be taken from RAML doc
      --sc [SC [SC ...]]  Response codes to be shown, if nothing classified -
                          would be taken from RAML doc
      --mode {1,2,12}     Choose beetween modes: 1 - random routing, 2 - fuzzing
                          of parameters, 12 - both
