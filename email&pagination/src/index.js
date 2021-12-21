const express = require('express');

const app = express();

app.use(express.json())

const  userController = require('./controllers/user')
app.use("/users", userController)

const adminController = require('./controllers/admin')
app.use('/admin', adminController)

module.exports = app;  //to server

