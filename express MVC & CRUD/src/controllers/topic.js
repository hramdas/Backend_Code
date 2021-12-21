const express = require('express');
const Topic = require('../models/topic');
const router = express.Router()
const crudController = require('./crud');


router.post('', crudController.post(Topic))

router.get('', crudController.getall(Topic))

// router.post('/', async (req, res)=>{
//     const topic = await Topic.create(req.body);
//     res.status(201).send(topic)
// })

module.exports = router;
