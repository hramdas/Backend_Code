const express = require('express');
const Result = require('../models/result');
const Student = require('../models/student');
const router = express.Router()
const crudController = require('./crud');

router.post('', crudController.post(Result))

router.get('', async (req, res)=>{
    const results = await Result.find().populate('student').populate('evaluation')
    res.send(results)
})

router.get('/:id', crudController.getone(Result))

//Top 2 scored students
router.get('/:id/top', async (req, res)=>{
    const studentres = await Result.find({Student : req.params.id}).sort({score : -1}).populate({
        path : 'student',
        populate : {
            path : 'user'
        }
    }).limit(2)
    res.send(studentres)
})


//All students using evaluation id
router.get('/:id/evaluation', async (req, res)=>{
    const students = await Result.find({evaluation : req.params.id}).populate({path : 'student', select : 'user'})

    res.send(students)
})

module.exports = router;
