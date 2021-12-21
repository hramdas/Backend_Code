const express = require('express')
const router = express.Router()
const Section = require('../models/section')
const Book = require('../models/book')
const Author = require('../models/author')

router.post('/', async (req, res)=>{
    try{
        const section = await Section.create(req.body)
        res.status(201).send(section)
    } catch(e){
        res.status(500).send({message : e.message})
    }
})

router.get('/', async (req, res)=>{
    const section = await Section.find().lean().exec()
    res.send(section)
})

//Not checked books in a section
router.get('/check/:id', async(req, res)=>{
    const books = await Book.find({section : req.params.id}).lean().exec();
    const newBooks = books.filter((book)=> book.checkout == undefined)
    res.send(newBooks)
})

//Books in a section
router.get('/:id/books', async(req, res)=>{
    const section = await Section.findById(req.params.id);
    const books = await Book.find({section : section._id})
    res.send({section, books})
})

//Book in a section by a author
router.get('/:sec/:auth', async(req, res)=>{
    const section = await Section.findById(req.params.sec);
    const author = await Author.findById(req.params.auth);
    const books = await Book.find({section : section._id, author : author._id})
    res.send({section,author, books})
})


module.exports = router;