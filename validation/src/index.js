const express = require('express')

const app = express()
app.use(express.json())

const userController = require('./controllers/user')
app.use('/users', userController)

module.exports = app;