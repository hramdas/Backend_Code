const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    user : {type : mongoose.Schema.Types.ObjectId, ref : 'user', required : true},
    roll_no : {type : Number, required : true},
    batch :  {type : String, required : true},
},{
    versionKey : false,
    timestamps : true
})

module.exports = mongoose.model('student', studentSchema)
