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
## MVC
Our applications generally consists of 3 layers

- View Layer :- This is the client facing side of the application
- Application Layer :- This is where the application logic sits
- Business Layer or Data Layer :- This is where the business transactions are made
Above are kind of technical definitions of the layers but the above layers in more simpler language is :-

- View Layer :- Frontend of the application and as we are using React for all of the frontend needs hence we don't have a view layer in our express application but you can create views in express but out of scope for this course.

- Application Layer :- This is like the co-ordinator of the system and it takes in requests from the view layer and then delegates to different parts of the code and business layer to get different things, for e.g :- passing to validations, authentication and authorisation systems for check auth and validations, database models for getting the required data processing done and then finally decidig on how to format the output and then send the output to the view layer and generally are represented by controllers.

- Business Layer or Data Layer :- This is where the database activities happen and is the heart of the application and if represented in model files.

For video refresher I would recommend you visit the pre class lecture for MVC which is [MVC Pre class]([MVC Pre class](https://masai-course.s3.ap-south-1.amazonaws.com/lecture/5716/material/fd4771e85e1f916f239624486bff502d/zoom_0.mp4)
