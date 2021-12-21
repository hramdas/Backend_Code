// console.log('dd')

const express = require('express')
const app = express()
app.use(express.json())   //middleware

const users = require('./users')

app.get('/', (req, res)=>{
    res.status(200).send(users)
})

app.post('/', (req, res)=>{
    console.log(req.body)

    const User = [...users, req.body]
    res.send(User)
    // res.status(200).send(users)
})

app.patch("/:id", (req, res)=>{
   const newUsers = users.map((user)=>{
       if(user.email === req.params.id){
           if(req?.body?.name) user.name = req.body.name;
           if(req?.body?.email) user.email = req.body.email;
           if(req?.body?.gender) user.gender = req.body.gender;
       }

       return user
    })
    res.status(200).send(newUsers)
})

app.delete('/:id', (req, res)=>{
    const newUsers = users.filter((user)=> user.email !== req.params.id)
    res.send(newUsers)
})

app.listen(2000, function(){
    console.log("Listening on port 2000")
})