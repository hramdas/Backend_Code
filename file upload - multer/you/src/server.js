// const { application } = require('express')
const connect = require('./config/db')
const app = require('./index')

app.listen(2200, async function(){
    await connect();
    console.log('listening on 2200')
})