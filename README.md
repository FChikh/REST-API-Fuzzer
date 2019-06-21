# REST-API-Fuzzer

This is the prototype of intelligent fuzzer for services, written with REST API rules, which was created during the Summer school internship in Acronis. Authors: Fedor Chikhachev, Egor Degterenko, Konstantin Korkin, Lubov Sadovskaya (Moscow State Public School №444 students)

## How it works:
* It analyzes RAML specification for your REST API
* It has 2 fuzzing sessions. Firstly, random routing. Simply going to popular routes. Secondly, GET & POST params fuzzing, 
based on what it found in your RAML specification. 

## Usage
* Start the main script: `python3 run.py`
* Then you should specify absolute path to your RAML specification and address (domain name) of server, where your service is working.
* You can also specify which response codes should be shown or shouldn't. Also you can filter response codes, that are given as possible responses in your RAML specs.
* Results of fuzzing session could be found in log.txt file


### Check this out!

Full documentation could be found in docs folder.
