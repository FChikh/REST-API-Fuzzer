# REST-API-Fuzzer

This is the prototype of intelligent fuzzer for services, written with REST API rules, which was created during the Summer school internship. Authors: Fedor Chikhachev, Egor Degterenko, Konstantin Korkin, Lubov Sadovskaya (Moscow State Public School №444 students)

## How it works:
* It analyzes RAML specification for your REST API
* It has 2 fuzzing sessions. Firstly, random routing. Simply going to popular routes. Secondly, GET & POST params fuzzing, 
based on what it found in your RAML specification. 

## Usage
```
usage: python3 run.py [-h] [--hc [HC [HC ...]]] [--sc [SC [SC ...]]] --mode {1,2,12}
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

```

### Check this out!

Full documentation could be found in docs folder.
