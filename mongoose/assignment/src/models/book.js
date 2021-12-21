const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    name : {type : String, required : true},
    body : {type : String},
    author : [{type : mongoose.Schema.Types.ObjectId, ref : "author", required : true}],
    section : {type : mongoose.Schema.Types.ObjectId, ref : "section", required : true},
    checkout : {type : mongoose.Schema.Types.ObjectId, ref : "user"},
})

module.exports = mongoose.model('book', bookSchema)