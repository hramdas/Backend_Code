const express = require('express');
const evaluation = require('../models/evaluation');
const Evaluation = require('../models/evaluation');
const Student = require('../models/student');
const router = express.Router()
const crudController = require('./crud');

router.post('', crudController.post(Evaluation))

router.get('', crudController.getall(Evaluation))
router.get('/:id', crudController.getone(Evaluation))

module.exports = router;
