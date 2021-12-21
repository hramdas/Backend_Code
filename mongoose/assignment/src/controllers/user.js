const express = require('express');
const User = require('../models/user')

const router = express.Router()

router.post('/', async (req, res)=>{
    const user = await User.create(req.body)
    res.status(201).send(user)
})
router.get('/', async (req, res)=>{
    const user = await User.find()
    res.status(200).send(user)
})

module.exports = router;