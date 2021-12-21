const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    student : {type : mongoose.Schema.Types.ObjectId, ref : 'student', required : true},
    evaluation : {type : mongoose.Schema.Types.ObjectId, ref : 'evaluation', required : true},
    score : {type : Number, required : true}
},{
    versionKey : false
})

module.exports = mongoose.model('result', resultSchema)