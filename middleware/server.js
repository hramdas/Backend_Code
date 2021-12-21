const express = require('express')

const app = express()
app.use(express.json())

const Users = require('./user')

const authorise = () => {
    return (req, res, next) => {
      // const originalSendFunc = res.send.bind(res);
      // res.send = function (body) {
        req.name = "Nrupul Dev";

        //console.log(body); // do whatever here
      //   return originalSendFunc(body);
      // };
      next();
    };
  };

// app.use(authorise)

app.get('/user', authorise(),  (req, res)=>{
    res.send({requested: req.body.name, requested_by : "Ramdas"})
})

app.post('/', authorise(),  (req, res)=>{
    res.send([...Users, {requested_by : req.name}])
})

app.get('/', authorise(),  (req, res)=>{
    res.send({Users : Users, requested_by : req.name})
})


// function logger(res, req, next){
//     console.log("inside logger")

//     const originalSendFunc = res.send.bind(res);
//     res.send = function(body){
//         body.name = "Ram";
//         console.log(body)
//         return originalSendFunc(body)
//     }

//     next()
 
// }

app.listen('2000', function(){
    console.log('Listening on port 2000')
})