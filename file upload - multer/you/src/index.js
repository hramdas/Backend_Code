const express = require('express')
const app = express()

app.use(express.json())

const userController = require('./controllers/user')
app.use('/users', userController)

const galleryController = require('./controllers/gallery')
app.use('/galleries', galleryController)

module.exports = app;
