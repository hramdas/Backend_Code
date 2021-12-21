const express = require('express');
const Student = require('../models/student');
const router = express.Router()
const crudController = require('./crud');

router.post('', crudController.post(Student))

// router.get('', crudController.getall(Student))
// router.get('/:id', crudController.getone(Student))


router.get('/', async(req, res)=>{
    const students = await Student.find().populate('user').lean().exec();
    res.send(students)
})
router.get('/:id', async(req, res)=>{
    const student = await Student.findById().populate('user').lean().exec();
    res.send(student)
})

// router.post('/', async(req, res)=>{
//     const student = await Student.create(req.body)
//     res.status(201).send(student)
// })

module.exports = router;