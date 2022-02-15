# Some Server related concepts

DNS :- Domain Name Server Every computer and server has a unique IP so if we want to reach facebook.com then we basically have to reach the server that is hosting it and basically need to call that IP but remembering IP addresses which look like 157.240.0.35 is difficult and not practical so WWW decided to have DNS where these ips will get a name and then when you enter the name it will redirect to the server using the ip address that is mapped.

Ports :- Ports are logical doors on a server and every action on every port is answered by some process if the port is mapped with some process ( process => program ) so if we are running a node application on port 8000 then if we hit http://localhost:8000 then this request will come to port 8000 on our computer and as we mapped node to listen to it so our node application will respond

Headers :- Headers are something similar to metadata and headers are present on request and response and if we send request headers then server uses that for some configuration for e.g :- Accept: 'application/json' request header tells server that client is expecting response in json format similarly Content-Type: 'application/json' request header tells the server that request is in json format. Origin :- Origin is basically the entire request address and consists of 3 main parts

Scheme :- protocol for e.g :- http, https, mongodb etc.

Host :- domain name for e.g :- google.com, facebook.com

Port :- the port on which the request to hit the server on and this will define who answers the request

CORS :- Cross Origin Resource Sharing Browsers will not allow request from different origin to get response from a server on a different origin for e.g :- browser will not allow request from localhost:3000 to get response from server on localhost:8000 so browser will send a request (options request ) to the server and if it receives a header from the server that it can accept requests from localhost:3000 only then browser will send actual request to the server

Status Codes :- status codes basically represent the eventual outcome of the requests and these can be configured from backend and you should pass the correct status code back to frontend in the response so that it can be handled efficiently. Status code documentation link :- https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

REST :- Representational State Transfer basically there are different ways in which server and client can communicate with each other

SOAP :- on old standard which is rarely used these days

REST :- Rest has some ways to interact with backend so for e.g :-

get => this is used when we want to get some data from the server
post => when we want to save some new data on the server
put / patch => when we want to update some existing resource on the server
delete => when we want to delete an existing resource on the server
GraphQL :- this has only 1 endpoint which is generally a post request to /graphql and then the body of this request is then parsed and we work on it..

# Modules
Today we are going to look into Modules and require which are core concepts of node

## What is Modules :-
Modules is basically logical separation of code

Modules enable us to have small code files which can be reused and thus help in scalability and maintainability as smaller code modules help us in adding more features easily and smaller code files are easier to maintain

Modules also help us in data protection which means only those pieces of code which we want other files to inherit can be exported ( data encapsulation in other programming languages )

## Different types of modules :-
Core modules :- Node provides us some modules out of the box for e.g :- http, file to work with network requests and managing files etc out of the box

npm packages :- These are packages or node_modules provided by someone else and this functionality does not come with node installation and we can use these to get some work done instead of rewriting entire functionality again for e.g :- axios

User generated modules :- This is code that we write and we import code from one file to some other file as modules and allows us to keep our code DRY ( Don't repeat yourself ).

User generated modules :- for exporting code from our modules we use module.exports and we assign it the item we are trying to export and this can then be imported by any other file

require :- require allows us to grab code exported from some other module into our current module

In the video we have provided examples of all 3 and we will cover more code in IWY session.

Node Basics watch this video from 19:14 till the end as this covers some basic core modules like OS, Path, File, Events and Http.

# Event Loops and some Server related concepts :-
Make sure you read this document for NodeJs Event Loop as this contains everything needed to know about Event loop

Some highlights from the document

process.nextTick() process.nextTick takes callback (which is a function) as an argument and that callback is run after the file was completely executed so this basically executes before the event loop starts

setTimeout() schedules a script to be run after a minimum threshold in ms has elapsed and setTimeout even if set to 0 seconds will be sent to a timer queue and once it is ready to be executed will be put into the callback queue from where it will be moved to Call Stack and then executed

setImmediate() is designed to execute a script once the current poll phase completes so in normal case if setImmediate and setTimeout are written then you cannot be sure which gets executed first but inside an I/O cycle like reading a file so in that callback setImmediate will always execute before setTimeout

# Framework
- Framework is a software that is built with core language ( Node in our case ) and its purpose is to improve developer experience by increasing the speed and ease of development and also additional security
## Pros of framework
- Frameworks have a lot of built in code that make development easy and faster.
- Frameworks provide some security features built in.
- Integrations with some services might also be built in like mongoose helps connect express with mongodb.
- Some frameworks might have a project structure so your code can be structured by default.
- Popular frameworks are generally well maintained and updated. 
## Cons of framework
- Frameworks have a lot of additional code which needs to be loaded when every request comes in so that impacts the performance and frameworks are not as fast as core language.
# Express
- Express is an un opinionated framework of Node which means that it does not enforce any project structures or other constraints on developers and this maybe one of the reasons for its wide acceptance. Express is also a npm package downloaded with npm.
# Middleware
Middleware is something that runs before the request hits our function that handles the request (commonly called route handlers ) and after the response is sent from the route handler.

Middleware that is defined in app.use will run for all routes so a middleware like logger is a good example for it and you can also use middleware for selected routes by passing middleware function as the second argument to the function for e.g :- app.get("/", logger, function (req, res) { console.log("hello"); });

we can also pass multiple middleware by passing them as an array app.get("/", [logger, logger], function (req, res) { console.log("hello"); });

route handlers app.get and app.post are also middleware so if they are places above the app.use in our file then they will get executed first and middleware will not run as generally route handlers don't have a next().

For parsing request body we can do app.use(express.json()) middleware and it should be placed above the requests that we will handle.

For quick refresher you can watch this video on middleware in express.
