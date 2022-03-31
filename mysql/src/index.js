const express = require('express')
const app = express()
app.use(express.json())

app.get('/',(req, res)=>{
    res.status(200).send("Server working")
})

const userRoute = require('./routes/users')
app.use('/user', userRoute)

module.exports = app