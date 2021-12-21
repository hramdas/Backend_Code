const express = require('express');
const Author = require('../models/author')

const router = express.Router()

router.post('/', async (req, res)=>{
    const author = await Author.create(req.body)
    res.status(201).send(author)
})

router.get('/', async (req, res)=>{
    const author = await Author.find()
    res.status(200).send(author)
})

module.exports = router;