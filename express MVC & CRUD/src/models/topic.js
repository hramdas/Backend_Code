const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    name : {type : String, required : true},
},{
    versionKey : false
})

module.exports = mongoose.model('topic', topicSchema)