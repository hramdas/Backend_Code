const nodemailer = require('nodemailer')  //npm i nodemailer
require('dotenv').config()  //npm i dotenv

module.exports = nodemailer.createTransport({
    host:  "smtp.gmail.com",
    port: 465,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: process.env.EMAIL,  //from .env
      pass: process.env.PASS
    },
  });