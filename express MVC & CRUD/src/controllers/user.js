const express = require('express');
const User = require('../models/user');
const router = express.Router()
const crudController = require('./crud');

router.post('', crudController.post(User))

router.get('', crudController.getall(User))

router.get('/:id', crudController.getone(User))


// router.get('/', async(req, res)=>{
//     const users = await User.find().lean().exec();
//     res.send(users)
// })
// router.post('/', async(req, res)=>{
//     const user = await User.create(req.body)
//     res.status(201).send(user)
// })

// router.get('/:id', async(req, res)=>{
//     const user = await User.findById(req.params.id).lean().exec();
//     res.send(user)
// })

module.exports = router

