const express = require('express')

const {body, validationResult} = require("express-validator")

const User = require('../models/user')

const router = express.Router()

//User input validation check
router.post('/',
body('first_name').isLength({min:2}).withMessage("First Name is requires"),
body('last_name').isLength({min:2}).withMessage(" Last Name is requires"),
body('email').isEmail().withMessage("Not a valid email"),
body('pincode').isLength({min:6, max:6}).withMessage("Not a valid Pincode"),
body('gender').isLength({min:3}).withMessage("Gender is required"),
body('age').isLength({min:1, max:100}).withMessage("Age is required"),

 async function(req, res){
     const errors = validationResult(req)  //errors check
     if(!errors.isEmpty()){
         return res.status(400).json({errors: errors.array() });
     }

    const user = await User.create(req.body)
    return res.status(201).json({data:user})
})

router.get('', async (req, res)=>{
    const user = await User.find()
    return res.status(200).send(user)
})

module.exports = router;