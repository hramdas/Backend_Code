const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
    user : {type : mongoose.Schema.Types.ObjectId, ref : 'user', required : true}
},{
    versionKey : false
})

module.exports = mongoose.model('instructor', instructorSchema)
