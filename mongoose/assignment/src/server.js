const express = require('express')
const mongoose = require('mongoose')
const connect = require('./config/db')
const app = express()
app.use(express.json())


const authController = require('./controllers/author')
app.use('/author', authController)

const bookController = require('./controllers/book')
app.use('/book', bookController)

const sectionController = require('./controllers/section')
app.use('/section', sectionController)

const userController = require('./controllers/user')
app.use('/user', userController)

app.listen('2000', async ()=>{
    await connect();
    console.log('Listening on 2000')
})