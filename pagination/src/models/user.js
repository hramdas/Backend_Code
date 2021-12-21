const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name : {type : String, required : true},
    last_name : {type : String, required : false},
    gender :  {type : String, required : true},
    dob : {type : String}
},{
    versionKey : false,
    timestamps : true
})

module.exports = mongoose.model('user', userSchema)