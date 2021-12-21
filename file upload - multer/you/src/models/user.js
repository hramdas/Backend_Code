const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name : {type:String, required:true},
    last_name : {type: String },
    profile_pic : {type: String, required:true},
},{
    versionKey:false,
    timestamps:false
})

module.exports = mongoose.model('users', userSchema)

