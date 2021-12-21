const express = require('express')
const app = express()
const connect = require('./config/db')
const mongoose = require('mongoose')

const formidable = require('express-formidable');
app.use(formidable());

app.use(express.json())

//Schema
const movieSchema = new mongoose.Schema({
    movie_name : {type : String, required : true } ,
    movie_genre : {type : String, required : false },
    production_year : {type : Number, required : false },
    budget : {type : Number, required : true } ,
    id : {type : Number, required : false }
}, {
    versionKey : false,
    timestamps : true
})

//connect schema to Collection 
const Movie = mongoose.model('movie', movieSchema)  //movie = collection and schema

//controller Methods
app.get('/', async (req, res)=>{
    let movies = await Movie.find().lean().exec()
    res.status(200).send(movies)
})

// app.post('/', async (req, res)=>{
//     let movies = await Movie.create(req.body)
//     res.status(200).send(movies)
// })

//use catch to get error
app.post('/', async (req, res)=>{
    try {
        const movie = await Movie.create(req.fields)
        res.status(200).send(movie)

    } catch (e){
        res.status(500).json({ message : e.message});
    }
})


app.get('/:id', async (req, res)=>{
    const user = await User.findById(req.params.id)
    res.send(user)
})

app.patch('/:id', async (req, res)=>{
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {new : true})  //new: true = return updated
        res.status(201).send(movie)

    } catch (e){
        res.status(500).json({ message : e.message, status : "Failed"});
    }
})


app.listen('2000', async ()=>{
    await connect()
    console.log('listening on port 2000')
})