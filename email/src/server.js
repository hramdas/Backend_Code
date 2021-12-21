const express = require('express')

const connect = require('./config/db')
const app = express()
app.use(express.json())

const userController = require('./controllers/user')
app.use('/user', userController)

app.listen('2000', async()=>{
    await connect();
    console.log('Listening on 2000')
})

