*********************
Fuzzer
*********************

------------------
Functions
------------------

~~~~~~~~~~~~~~~~~~
fuzzer:
~~~~~~~~~~~~~~~~~~
.. code-block:: python

   def convert_cookies_format(cookies):
      """Convert cookies from dictionary to array.
         Argument:
            cookies(dict) - dictionary that contains cookies from session
         Return:
            new_cookies(array) - array of strings of format 'key=value'"""
   def convert_types(formatted_dict):
      """TODO"""
   def authorize():
      """Authorize on server* and return session.
         Return:
            session(Session) - object of current session"""
   def parse_params(params, fuzz=''):
      """Parse queryParameters and return result
         Arguments:
            params(array) - array of queryParameters
            fuzz(dict/string) - contain queryParameter or empty string
         Return:
            result(string) - string of format 'key=value&key=value&...'"""
   def fuzz_first_step(page, hc, sc):
      """Fuzz uri and look for undeclared pages.
         Use function authorize() to declare session.
         Use recursion to fuzz all pages.
         Arguments:
            page(dict) - dictionary that contain data about page.
            hc(array) - array of status codes that must be ignored.
            sc(array) - array"""

   def fuzz_second_step(page, hc, sc):
      """Fuzz parameters and look for undeclared status codes.
         Use function authorize() to declare session.
         Use recursion to fuzz all pages."""

   def fuzz():

~~~~~~~~~~~~~~~~~~
py_parser:
~~~~~~~~~~~~~~~~~~
.. code-block:: python

    def parse(parsed_page, page, data):
        """ * Parse data from JSON to usable format, use recursion to parse
              all data, probably work with RAML v1.0, probably can be
              optimised
            * Variables:
                * All variables used only as iterators but probably their
                  names can be changed for better understanding
            * Arguments:
                * parsed_page(dict) - dictionary contained parsed data
                  for current page
                * page(dict) - dictionary contained data from JSON for
                  current page
                * data(dict) - dictionary contained data from JSON"""
    def fetch_parsed_data():
        """ * Start parser.js to parse data from RAML to JSON, fetch data
              from JSON file, use parse() to parse JSON file, return
              parsed data
            * Variables:
                data(dict) - dictionary contained data from JSON
                parsed_data(dict) - dictionary contained parsed data
            * Arguments:
                path(str) - string contained full path to RAML file
            * Return:
                parsed_data(dict) - variable parsed_data"""

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
              specify fuzzer for user, call fetch_parsed_data() to fetch parsed data
              and fuzz() to fuzz
            * Variables:
                * ans(str) - string contained user answer
                * data(dict) - dictionary contained parsed data from json
                * start_time(time) - time variable used for calculation of program
                 working time
                * specification(string) - can be '', 'hc', 'sc', used in fuzz,
                  specify wfuzz
                * specification_codes(array) - array of status codes used in fuzz,
                  can also be changed in fuzz""
