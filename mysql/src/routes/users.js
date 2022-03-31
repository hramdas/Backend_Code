const express = require('express');
const router = express.Router()
const connection = require('../config')

router.get('/', (req, res)=>{
    connection.query('SELECT * FROM `users`',
    (error, results, fields) => {
    if(!error) return res.status(200).send(results);
    else return res.status(400).send({Error : "Something went wrong"});
  });
})

module.exports = router