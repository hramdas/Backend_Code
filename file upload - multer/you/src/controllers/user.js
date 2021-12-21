const express = require('express')
const upload = require('../middlewares/upload')
const User = require('../models/user')
const fs = require('fs');
const router = express.Router();

router.get("" , async function(req, res){
   const users = await User.find().lean().exec()
   return res.status(200).send(users)
})

router.post("/", upload.single('userProfile') , async function (req, res){
   const user = await User.create({
      first_name : req.body.first_name,
      last_name : req.body.last_name,
      profile_pic : req.file.path   //file.path
   })
   
   return res.status(201).send(user)
})

router.post("/:id",upload.single('userProfile'), async (req, res)=>{
   const user = await User.findByIdAndUpdate(req.params.id, {
      first_name : req.body.first_name,
      last_name : req.body.last_name,
      profile_pic : req.file.path
   })
   return res.status(201).send(user)
})

router.delete("/:id", async(req, res)=>{
   const data = await User.findById(req.params.id)
   console.log(data.profile_pic)
   await fs.unlink(data.profile_pic, (err => {
      if (err) console.log(err);
      else {
        console.log("file deleted");
      }
    }))
   const user = await User.findByIdAndDelete(req.params.id)

   return res.send(user)
})

module.exports = router
