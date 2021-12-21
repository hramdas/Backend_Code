const express = require('express')
const Book = require('../models/book')
const Author = require('../models/author')

const router = express.Router()
router.post('/', async (req, res)=>{
    const book = await Book.create(req.body);
    res.status(201).send(book)
})

router.get('/', async (req, res)=>{
    const book = await Book.find();
    res.status(201).send(book)
})

//Books not checked
router.get('/check', async(req, res)=>{
    const books = await Book.find().lean().exec();
    const newBooks = books.filter((book)=> book.checkout == undefined)
    res.send({books, newBooks})
})

router.get('/:id', async (req, res)=>{
    const book = await Book.findById(req.params.id);
    res.status(200).send(book)
})

//All books written by a author
router.get('/:id/author', async (req, res)=>{
    const author = await Author.findById(req.params.id).lean().exec();
    const books = await Book.find({author : author._id})
    res.status(200).send({author, books})
})

router.patch('/:book/:user', async (req, res)=>{
    const book = await Book.findByIdAndUpdate(req.params.book, {$set : {checkout : req.params.user}})
    res.send(book)
})


module.exports = router