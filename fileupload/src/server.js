const express =require('express')
const connect = require('./configs/db')
const app = express()
app.use(express.json())

const userController = require('./controllers/user')
app.use('/user', userController)

// const adminController = require('./controllers/admin')
// app.use('/admin', adminController)

app.listen('2000', async ()=>{
    await connect();
    console.log('Listening on 2000')
})