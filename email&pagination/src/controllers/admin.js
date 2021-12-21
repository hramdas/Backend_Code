const express = require('express')
const Admin = require('../models/admin')
const sendmail = require('../utils/sendmail')

const router = express.Router()

router.get('', async (req, res) => {
    const admin = await Admin.find().lean().exec()
    return res.status(200).send(admin)
})


router.post('', async (req, res)=>{
    const admin = await Admin.create(req.body)
    return res.status(201).send({admin})
})

module.exports = router



