const express = require("express");

const sendMail = require("../utils/sendmail");

const router = express.Router();
const User = require("../models/user"); //src\models\user.js
const Admin = require("../models/admin");
// const User = require('../models/admin');

router.get("", async function (req, res) {
  //Pagination users
  const page = +req.query.page || 1; //Page Number
  const size = +req.query.size || 10; //Items on a page
  const offset = (page - 1) * size; // 1-1*10 = 0 ; 2-1*10=
  const users = await User.find().skip(offset).limit(size).lean().exec();

  const totalUserCount = await User.find().countDocuments();
  const totalPages = Math.ceil(totalUserCount / size);
  return res.send({ users, totalPages, page, size });
});

router.post("", async function (req, res) {
  const user = await User.create(req.body);

  // Send mail to user
  sendMail({
    from: "noreplay@abc.com",
    to: req.body.email,
    subject:
      "Welcome to ABC system " + req.body.first_name + " " + req.body.last_name,
    text: "Hi " + req.body.first_name + ", Please confirm your email address",
  });

  // Send mail to all admins
  // const admin = await Admin.find().lean().exec()
  // admin.forEach(function(data) {
  //     console.log(data.email, 'Data:  ', data)

  //     sendMail({
  //         from:'noreplay@abc.com',
  //         to:data.email,
  //         subject:req.body.first_name+ ' ' + req.body.last_name + ' has registered with us',
  //         text:'Please welcome '+ req.body.first_name+ ' ' + req.body.last_name
  //     })

  // })

  return res.status(201).send({ user });
});

module.exports = router;
