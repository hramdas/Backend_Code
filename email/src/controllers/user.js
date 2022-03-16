const express = require('express');
const User = require('../models/user');
const router = express.Router()
var cors = require('cors')
const sendMail = require('../utils/sendmail')


router.post('/', async(req, res)=>{
    const user = await User.create(req.body)

    var message = {
        from: "ramdas@dailyup.in",
        to: "hedgapurer@gmail.com",
        subject: "Nodemailer test",
        text: "Plaintext version of the message",
        html: "<h1>HTML version of the message</h1>"
      };

      sendMail(message)

    res.status(201).send({user})
})
router.get('/', async(req, res)=>{
  let user = User.find().lean().exec();
  res.status(200).send(user)
})


module.exports = router

