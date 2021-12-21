const express = require('express');
const Instructor = require('../models/instructor');
const router = express.Router()
const crudController = require('./crud');

router.post('', crudController.post(Instructor))

router.get('', crudController.getall(Instructor))
router.get('/:id', crudController.getone(Instructor))

module.exports = router;