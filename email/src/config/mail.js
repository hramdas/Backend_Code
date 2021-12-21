const nodemailer = require('nodemailer')  //npm i nodemailer
require('dotenv').config()  //npm i dotenv

//SMTP server setup
module.exports = nodemailer.createTransport({
    host: "premium216.web-hosting.com",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: process.env.SMTP_USERNAME,  //from .env
      pass: process.env.SMTP_PASSWORD
    },
  });