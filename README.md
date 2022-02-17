# Express
- Express is an un opinionated framework of Node which means that it does not enforce any project structures or other constraints on developers and this maybe one of the reasons for its wide acceptance. Express is also a npm package downloaded with npm.
## Middleware
Middleware is something that runs before the request hits our function that handles the request (commonly called route handlers ) and after the response is sent from the route handler.

Middleware that is defined in app.use will run for all routes so a middleware like logger is a good example for it and you can also use middleware for selected routes by passing middleware function as the second argument to the function for e.g :- app.get("/", logger, function (req, res) { console.log("hello"); });

we can also pass multiple middleware by passing them as an array app.get("/", [logger, logger], function (req, res) { console.log("hello"); });

route handlers app.get and app.post are also middleware so if they are places above the app.use in our file then they will get executed first and middleware will not run as generally route handlers don't have a next().

For parsing request body we can do app.use(express.json()) middleware and it should be placed above the requests that we will handle.

For quick refresher you can watch this video on middleware in express.

# Basics of MongoDB
## Advantages of MongoDB
- MongoDB has concept of documents which means that all data related to 1 row including the column name and the value is stored together unlike in SQL so horizontal scaling is very easy and infact MongoDB defaults to a cluster containing multiple servers.
- As everything is stored together and kind of just dumped together so writing is faster than SQL databases but if the document size is big then it may not be true.
## Disadvantages of NoSQL ( Mongodb )
- As we store column name and column value in each and every row of the table thus we end up consuming a lot of space on the server and thus your storage costs will be higher but these days HDD are cheap so not a huge difference in the bills.
- SQL has a lot of similar syntax so moving from 1 database to another is easy as the syntax is highly similar and thus moving to a different database is easy but with NoSQL this cannot be guaranteed and thus learning curve can be steep.
- Relational nature of SQL makes it easier for storing and managing data but Mongodb also has relational support but it is generally better avoided as this kind of defeats the main reason for existence of Mongodb
- ACID properties are the main fortay of SQL and although latest version of Mongodb has ACID support but still adapting to this will take time.

#3 Installing Mongodb
DOWNLOAD MONGO :-
- You can download mongo from this link Mongodb installation link
- Download it from the link and then follow the instructions
- Once installed open a terminal and type mongo and if it opens an interactive shell then we are good else you might need to open another
- terminal window and type mongod to start mongo deamon and then in another window try mongo again.
- MongoDB follows mongodb protocol and generally listens on port 27017
- 
## Terminologies in MongoDB and comparison with MySQL :-
- Database in Mongodb => Entire Database for a project for e.g :- School
- Collections in Mongodb => Individual logical separations within the database for e.g:- students, classes, etc.
- Documents in Mongodb => Individual piece of data for e.g :- every student record inside students collection.
- Fields in Mongodb => individual data points of a document for e.g :- name, age of a student document.
- 
## Some basic commands for mongo :-
- `show dbs` # shows you all the databases on the mongo system
- `use test` # this will get us into that db and if db does not exists then it will create one and then take us inside it
- `db.dropDatabase()` # this will drop the current database
- `show collections` # shows all the collections in the current db
- `db.createCollection('users')` # creates a users collection in the current db
- 
## Basic CRUD in Mongo :-
- `db.users.insert({"firstName": "Dhaval", "lastName": "Chheda"})` # this will create a new document inside users
- `db.users.find({})` # this will return all the documents inside users collection
** Note ** :- Mongodb by default adds a unique _id which is unique across all collections and similar concept to MySQL

- `db.users.insertMany([{"firstName": "Prateek", "lastName": "Shukla"}, {"firstName": "Prateek", "lastName": "Sharma"}])`# this will create 2 documents
- `db.users.find({}).pretty()` # this shows the query results in a pretty format
- `db.users.find({"firstName": "Prateek"}).pretty()` # shows all the documents with firstName => Prateek
- `db.users.findOne({"firstName": "Prateek"})` # shows the first document that it came across when looking for firstName => Prateek
- `db.users.update({"_id": "Object Id here"}, {$set: {"lastName": "Shah"}})` # updates document with id and replaces the lastName with Shah and if the lastName was not there then it will create it
- `db.users.update({"firstName": "Prateek"}, {$set: {"lastName": "Shah"}})` # updates the first document with firstName => Prateek and replaces the lastName with Shah and if the lastName was not there then it will create it.
- `db.users.updateMany({"firstName": "Prateek"}, {$set: {"religion": "Hindu"}})`
-`db.users.remove({"firstName": "Prateek"})` # removes all documents with firstName => Prateek
If we want to ensure only 1 document is removed then the best way is to pass a unique key .. in most cases Id db.users.remove({"_id": ObjectId of the document })

If we do not know a unique key but still want to remove just 1 document then we can do db.users.remove({"firstName": "Prateek"}, 1) # removes the first document with firstName => Prateek

# Advanced Mongo
## Importing dummy data
- First generate dummy data by going to mockeroo and then creating sample data json

- `mongoimport --drop --collection users --file ~/Desktop/Study/mongo/users.json --jsonArray`
## Comparison operators
- If we want to get results that exactly match the given condition then we use $eq and the query is as shown below :-
`db.users.find({email: {$eq: "mblakeyn@patch.com"}}).pretty()`

this is similar to :-

`db.users.find({"email": "mblakeyn@patch.com"}).pretty()`

- If we want to get results that DO NOT match the given condition then we use $ne and the query is as shown below :-

`db.users.find({email: {$ne: "mblakeyn@patch.com"}}).pretty()`

- Greater than and greater than or greater than equal to operator query are shown below :-
`db.users.find({"age": {$gt: 40}})`
`db.users.find({"age": {$gte: 40}})`

- Less than or less than equal to operator query are shown below

`db.users.find({"age": {$lt: 40}})`
`db.users.find({"age": {$lte: 40}})`

- Selecting only few fields from the document / table
if we want to restrict the number of fields returned then we can do that explicitly as below
`db.users.find({"age": {$gt: 40}}, {"age": 1})`

- Even though id is not selected it is still returned so to remove that also we need to explicitly say no to it as follows

`db.users.find({"age": {$gt: 40}}, {"age": 1, "_id": 0})`
## Range Queries
- If we want to select something from a range like age should be between 30 and 40 then we use the $in and the query is as follows :-
`db.users.find({"age": {$in: [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]}}, {"age": 1, "_id": 0})`

- Now if we want to exclude rows that fall in the age group between 30 and 40 then we use $nin and the query can be
`db.users.find({"age": {$nin: [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]}}, {"age": 1, "_id": 0})`
## Logical Operators
- AND :- If we want to use more than 1 condition and want the row to pass both the conditions then we use the $and query and it can be written as below :-
`db.users.find({$and: [{"gender": "Male"}, {"age": 42}]})`

- OR :- If we want to use more than 1 condition and want the row to pass either or both the    conditions then  we use the $or query and it can be written as below :-
`db.users.find({$or: [{"gender": "Male"}, {"age": 42}]})`

- NOR :- If we want to use more than 1 condition and want the row to pass neither of the conditions then  we use the $nor query as shown below :-
`db.users.find({$nor: [{"gender": "Male"}, {"age": 42}]})`
    - This query will return all documents that:
    Contain the gender field whose value is not equal to Male and contain the age field whose value is not equal to 42.
    Contain the gender field whose value is not equal to Male but do not contain the age field 3) Do not contain the gender field but contain the age field whose value is not equal to 42/
    Do not contain the gender field and do not contain the age field.

- NOT :- If we want to the query to not match any of the conditions then we can also use the $not query as shown below :-
`db.users.find({"age": {$not: {$gt: 40}}})`
## ELEMENT OPERATORS
- in this we check if a field exists and use $exists if it does then does it match a condition
for e.g :- `db.movies.find({cast: {$exists: true, $in: ["Paul Boyton"]}})`

- if your collection has all documents with same number of fields and still want to test then you can remove a field by writing below query
`db.movies.update({ "_id" : ObjectId("6032974fa20240c92bd2a420")}, {$unset: {"cast": ""}})`

- There are a lot of such operators and we will touch base on some of them later in the course and you can check them out on the documentation link below
Documentation link :- [MongoDB Operators link](https://docs.mongodb.com/manual/reference/operator/)
## Sorting, Limiting and Offseting
- Sorting :- sorting can happen in ascending and descending logic
`db.users.find({"age": {$lt: 80}}, {"age": 1, "\_id": 0}).sort({age: -1})`

- Limiting :- after sorting or without we normally would want to limit the number of results so we can extend the above query as below :-
`db.users.find({"age": {$lt: 80}}, {"age": 1, "\_id": 0}).sort({age: -1}).limit(5)`

- Offseting :- we can use the skip() to skip a few documents as shown below
`db.users.find({"age": {$lt: 80}}, {"age": 1, "\_id": 0}).sort({age: -1}).skip(2).limit(5)`

- For quick refresher on MongoDB you can check this video [MongoDB refresher](https://www.youtube.com/watch?v=ofme2o29ngU).
## Connecting Express with MongoDB
- To connect Express with MongoDB we need to use the mongoose package which provides an easy API to interact with MongoDB.

- For quick refresher on Mongoose or to get an indepth knowledge you can refer to this video [Mongoose Refresher](https://www.youtube.com/watch?v=4yqu8YF29cU)
## Mongoose Relationships
- Relationships means how one collection is related to the other collection and there are 3 main types of relationships
    - One to One :- here 1 document of first collection is related to exactly one document in the other collection and vice versa.
    for e.g :- we can have users and students collection and 1 user is related to exactly 1 student and 1 student is also related to exactly 1 user hence 1 - 1 relationship. So now to connect both collections we need to add a reference ( technically referred to as foreign key ) in either collection of the other collection so either we need to add student_id inside users collection or user_id inside students collection so how to determine where should it be added ?
    The solution is pretty simple as you need to ask yourself who is independent and who is dependent or how we learnt in class as parent and child, so in our example of users and students all students have to a user or in other words all users don't need to be students as some can be admin, teachers, etc. so student is dependent and user is independent or students is child and users is parent so the rule of thumb is that parent collection id should be inside child collection or in simple language we need to have user_id inside students but 1 important thing to be remember is there is no right or wrong, this is just a better approach.

    - One to Many :- here 1 document of first collection is related to many documents in the second collection and 1 document in second collection is related to 1 document in the first collection.
    for e.g :- we can have users and posts collection and 1 user can have many posts but 1 post belongs to exactly 1 user hence 1 - many relationship. So now to connect both collections we need to add a reference in either collection of the other collection so either we need to add post_id inside users collection or user_id inside posts collection so how to determine where should it be added ?
    The solution is pretty simple as you need to ask yourself again who is independent and who is dependent or how we learnt in class as parent and child, so in our example of users and posts, a post cannot exist without a user and a user can exist without writing a post. so post is dependent and user is independent or posts is child and users is parent so again applying the same rule of thumb that parent collection id should be inside child collection or in simple language we need to have user_id inside posts and here this is almost the correct solution and counter arguments are neglible.

    - Many to Many :- here 1 document of first collection is related to many documents in the second collection and 1 document in second collection is also related to many documents in the first collection.
    for e.g :- we can have tags and posts collection and 1 post can have many tags and 1 tag can also belong to many posts hence many - many relationship. So now to connect both collections we need to add a reference in either collection of the other collection so either we need to add post_id inside tags collection or tag_id inside posts collection so how to determine where should it be added ?.

    NOTE :- you can also create a separate collection just for the mapping and this is how its done in SQL but we will not discuss it here.

    The solution is a little tricky as here we don't have a parent child relationship but the relationship is more like siblings. So to decide where to add the foreign key so you have to ask yourself how will it be queried so just to check 1 scenario which is having post_id inside tags so what happens when you create a post? here if a post has 20 tags then you have to insert 1 post and update 20 tags which can be a little time consuming and also whenever you update the post then you might have to also update the tags and also 1 tag can be connected with thousands of posts so the post_id foreign key array will be of thousands of items and hence unmanageable. Lets consider the other approach which is we adding tag_ids foreign key inside posts then when you create a post you have to do just 1 insert into posts and also 1 post logically might have 10-20 tags at max so the foreign key array is also manageable hence I would recommend adding tag_ids to posts collection and this is not right solution or anything but I feel its a better solution.

    For video reference I will highly recommend to visit the live class tutorial for relationships as this is probably the best material available for refreshing relationships memory.
# MVC
Our applications generally consists of 3 layers

- View Layer :- This is the client facing side of the application
- Application Layer :- This is where the application logic sits
- Business Layer or Data Layer :- This is where the business transactions are made
Above are kind of technical definitions of the layers but the above layers in more simpler language is :-

- View Layer :- Frontend of the application and as we are using React for all of the frontend needs hence we don't have a view layer in our express application but you can create views in express but out of scope for this course.

- Application Layer :- This is like the co-ordinator of the system and it takes in requests from the view layer and then delegates to different parts of the code and business layer to get different things, for e.g :- passing to validations, authentication and authorisation systems for check auth and validations, database models for getting the required data processing done and then finally decidig on how to format the output and then send the output to the view layer and generally are represented by controllers.

- Business Layer or Data Layer :- This is where the database activities happen and is the heart of the application and if represented in model files.

# Pagination
- Pagination means dividing the total results into smaller chunks which can be shown as pages to not overwhelm the customer and also more the data we pass to the frontend, slower the performance and we end up wasting users internet which may not be necessary so for these reasons we have pagination

- For Pagination we only need 2 things from the frontend , which is page number and items per page ( this may not be required if page size is fixed on the frontend ).

- The query for pagination is :-
`db.model.find({"query to be executed"}).skip(offset).limit(size)`

- so how to calculate offset and size ?
Now if we are on page 1 then we need first 10 results so offset is 0 and size is 10. so If we are on page 2 then we need results from 11 to 20 and size is 10. so from above dummy calculation we can formulate our page calculation as :-
`offset = ( page - 1) * size`
`size = size` ( same number that we received from frontend )

Finally we also need to calculate the totalPages for the query so that frontend can show the next and previous arrows properly, for e.g :- if the user is on last page then they will not show next and if he is on first page then they will not show previous and a lot of other cool things can be done with this totalPages data.
# Emails
- The most common protocol for sending emails is SMTP ( Simple Mail Transfer Protocol ) but you may also want to know about IMAP and POP3 which are mostly used by our email clients.

- Sending emails is integral part of almost all applications and emails can be of 2 types

    - Transactional :- This are triggered by events that happen in the system like registration, payment, etc

    - Promotional :- These are sent in bulk and mostly for marketing purposes and are commonly generated through cron jobs or some UI given to the business team.

- For sending emails in Express and node in general we use the Nodemailer package and before sending an email you need to configure a few things

- configure an SMTP server to do the actual work of sending emails and there are many SMTP service providers like AWS SES, Sendgrid, Mailchimp but for testing the best provider is mailtrap.io which intercepts the mail send from your system to the recipient and you can clearly see how the email looks.

- Once you finalise the provider then you can create an account and it will give you some credentials which you need to save in your machine and use it for authentication with the SMTP provider.

- Once you have this then you can write the code and send an email ..
# Validations
- validations are used to validate post form fields to ensure that whatever we need is present in the way we want it to be present and even though you guys are used to doing frontend validations but still validations must be performed on backend also as frontend code is available inside browser and user might modify it to bypass our validations hence backend validation is required and also remember to add validations to your database schema so that you have an additional layer of protection but you should never default to database validations.

- we will use [express-validator](https://express-validator.github.io/docs/) and documentation for the same is available at express validator.
# File Uploads
- For uploading files you need to ensure that your frontend form is using encType of multipart/form-data and then you pass the file in the post request and this then we upload this file to local system and then optionally push it to cloud (In production systems DO NOT put things inside local system ) and once the file is saved, we will use the file path and save it in the database for retrieval later.

- We are using [multer](https://www.npmjs.com/package/multer) npm package to help us with file uploads and you can check how it is used in the video.


# Authentication
- Authentication is restricting some parts of the application to only those users who identify themselves. Users identifying themselves also helps developers serve them better as it allows developers to show things relevant to them like in e-commerce applications we can know your preferences and show you products which match your preference.

- Question) What is the difference between Authentication and Authorisation ?

- Answer) Authentication has users identify themselves and after we know the identity then they may or may not be able to access certain parts of the application for e.g :- in a bank a person from home loan department may not be able to handle cashiering work or vice versa and we may also have super users which can be branch manager who may have access to all departments inside the bank and this is generally referred to as RBAC ( Role Based Access Control ) and we will look into authorisation in the next lecture.

- Question) How do we authenticate a user?

- Answer) The most common way is When a user signs up we associate a token with the user and that token is sent to the frontend and frontend then sends that token with every request that needs authentication ( or you may send it with every request ) and backend tries to find the associated user and then all actions are associated with that user.

Today we are going to accomplish this token based authentication using json web tokens

- Question) What is JSON web tokens ?

- Answer) we take the details we want the token to have in a JSON format and then encrypt it with a Secret which is stored on the server and that generates a token which is then send to the client and then when the client sends the token back we decrypt the token using the secret and then the json information is retrieved as the final result.
Oauth
- OAuth is when applications who have large user base provide their authentication system to other applications so that they can have theuir customers authenticate through this 3rd party applications like FB, Google.

- Advantage to the customer is he does not have to remember lots of passwords and if 1 application is compromised then he does not have to fear about his credentials being used on other applications that he has signed up for.

- Security provided by FB or Google is much better then a normal small scale application so customer trusts those more than our application and from developer angle we do not have to build authentication systems ourselves and can achieve kind of password less systems.
Authorization
- Authorization comes after user authenticates and Authorisation determines which pages can a signed in user access.
- This is also called as RBAC ( Role based access control ) and it helps in security also as some compromised credentials will not lead to the entire application being compromised.
- 
# Redis
- Many times in your professional career you will encounter situations where you will be serving the same static output from the database to the users and still database will be working every time to give you that answer and when working on backend, database is the biggest cause of slow performance so you should try to eliminate it by using a key value store to serve this static data which is saved as 1 key and 1 value .. So you will say great .. lets use Mongo as it is key value store but Mongo is not built for such caching needs .. Redis is built for such use cases and is in-memory and returns the data much faster than mongo so redis can be used in this case.

- Redis was not supported for Windows but I found a link on youtube which can help you setup Redis on Windows 10 [Install Redis on Windows](https://www.youtube.com/watch?v=188Fy-oCw4w).

- Redis can also be used for queuing but this is outside the scope and there are some dedicated queue providers available but I like Redis queues.
Web Sockets
- we have learnt what http requests are and we know how server and client communicate in an http scenario but in some situations this is not ideal .. for e.g :- when you are working on a messaging app then receivers client needs to fetch data from the server and to make this happen you have to have all the clients poll the server every few seconds (technically referred to as long polling ) to fetch all the data but this is bad from user experience perspective as messages are not instantaneous plus this is very taxing on the server and you can end up with very high server bills.

- So to tackle this situation we have web sockets .. Web sockets initially using http for handshake and initial connection establishment but after that the connection is upgraded to websocket and is kept open till either the browser tab is closed or server is stopped and this allows for server and client to communicate real time and client can send data to server and server can push data relevant to the client
