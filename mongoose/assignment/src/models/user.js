const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name : {type : String, required : true, unique : true},
    last_name : {type : String, required : true}
})

module.exports = mongoose.model("user", userSchema)
