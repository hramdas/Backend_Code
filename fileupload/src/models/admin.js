const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    first_name : {type : String},
    last_name : {type : String},
    email : {type : String},
},{
    versionKey : false
})

module.exports = mongoose.model('admin', adminSchema)