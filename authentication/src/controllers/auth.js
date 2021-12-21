const User = require('../models/user')
const jsonwebtoken = require('jsonwebtoken')
require('dotenv').config()

const newToken = (user)=>{
    return jsonwebtoken.sign({user : user}, process.env.JTW_KEY)
}

const register = async (req, res)=>{
    try{
        // Check is email provided already exist
        let user = await User.findOne({email : req.body.email}).lean().exec();

        //if exist throw error
        if(user) return res.status(400).json({status : 'failed', message : 'User already registered' })
        user = await User.create(req.body);
        
        //Crate token
        const token = newToken(user) //function on top
        res.status(201).send({user, token})

    } catch(e){
        res.status(500).json({message : e.message})
    }
}

const login = async (req, res)=>{
    try{
        let user = await User.findOne({email : req.body.email})
        //if user not available
        if(!user) return res.status(400).json({status : 'failed', message : 'Please check details users' })
        
        const match = await user.checkPassword(req.body.password)

        if(!match) return res.status(400).json({status : 'failed', message : 'Please check details pass' })

        const token = newToken(user)
        res.status(201).send({user, token});

    }catch(e){
        return res.status(500).json({message : e.message})
    }
}

module.exports = { register, login}