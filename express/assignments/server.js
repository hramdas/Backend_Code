const express = require('express')
const app = express()
app.use(express.json())

app.use(logger)

const Users = require('./users')

app.get('/', (req, res)=>{
    // const requested = next()

    res.status(200).send({api_requested_by:req.myname, Users})
})

app.post('/users', (req, res)=>{
    const newUsers = [...Users, req.body]
    res.status(201).send(newUsers)
})

app.get('/users/:email', (req, res)=>{
    const user = Users.filter((user)=> user.email == req.params.email)
    res.status(200).send({api_requested_by:req.myname, user})
})

app.patch('/users/:email', (req, res)=>{
    const newUsers = Users.map((user)=>{
        if(user.email === req.params.email){
            if(req?.body?.name) user.name = req.body.name;
            if(req?.body?.email) user.email = req.body.email;
            if(req?.body?.gender) user.gender = req.body.gender;
        }
        return user
    })

    res.status(201).send(newUsers)
})

app.delete('/users/:email', (req, res)=>{
    const newUsers = Users.filter((user)=>user.email !== req.params.email)
    res.status(201).send(newUsers)
})

function logger(req, res, next){
    req.myname = "Ram"
    next()
}

app.listen('2000', function(){
    console.log('Listening on port 2000')
})