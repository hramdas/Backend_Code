const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title : {type:String},
    price : {type:String, required:true},
    author: {type: mongoose.Schema.Types.ObjectId, ref:'user', required:true}
},
{
    versionKey:false
})

module.exports = mongoose.model("book", bookSchema)
