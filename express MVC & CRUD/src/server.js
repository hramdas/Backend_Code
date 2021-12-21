const express = require('express')
const router = express.Router()
const connect = require('./config/db')
const app = express()
app.use(express.json())

const userController = require('./controllers/user')
app.use('/user', userController)

const studentController = require('./controllers/student')
app.use('/student', studentController)

const topicController = require('./controllers/topic')
app.use('/topic', topicController)
app.use('/topic', topicController)

const evaluationController = require('./controllers/evaluation')
app.use('/evaluation', evaluationController)

const instructorController = require('./controllers/instructor')
app.use('/instructor', instructorController)

const resultController = require('./controllers/result')
app.use('/result', resultController)

app.listen('2000', async()=>{
    await connect();
    console.log('Listening on 2000')
})

