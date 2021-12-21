const mongoose = require('mongoose');

const evaluationSchema = new mongoose.Schema({
    date : {type : Date},
    instructor : {type : mongoose.Schema.Types.ObjectId, ref : 'instructor', required : true},
    topic : {type : mongoose.Schema.Types.ObjectId, ref : 'topic', required : true}
})

module.exports = mongoose.model('evaluation', evaluationSchema)