const express = require('express');
const User = require('../models/user');
const router = express.Router()
var cors = require('cors')


// Pagination // skip items and show page
router.get('', cors(), async(req, res)=>{
    try{

        const page = +req.query.page || 1;
        const size = +req.query.size || 2;
        const skip = (page-1) * size;  // (1-1)*2 = 0 || (2-1)*2 = 2

        const users = await User.find().limit(size).skip(skip).lean().exec();

        const totalPages = Math.ceil(await User.find().countDocuments()/size)

        res.send({users, totalPages})
    } catch(e){
        res.send(e.message)
    }
})


router.post('/', async(req, res)=>{
    const user = await User.create(req.body)
    res.status(201).send(user)
})

module.exports = router

