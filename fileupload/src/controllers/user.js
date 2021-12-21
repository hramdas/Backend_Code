const express = require('express')
const User = require('../models/user')
const router = express.Router()
const upload =  require('../middlewares/upload')

//After user signup send mail to user and admins.
router.post("", upload.single("picture"), async (req, res)=>{

  try{
    const user = await User.create({
      name : req.body.name,
      picture : req.file.path
    })
    res.status(201).send(user)

  } catch (e){
    res.status(500).send(e.message)
  }
})

router.post("/multiple", upload.any("picture"), async (req, res)=>{
  const filePaths = req.files.map(file=>file.path)

  try{
    const user = await User.create({
      name : req.body.name,
      picture : filePaths
    })
    res.status(201).send(user)
  } catch (e){
    res.status(400).send(e.message)
  }
})

//Pagination
router.get('', async (req, res)=>{
    let page = +req.query.page || 1;
    let size = +req.query.size || 5;
    let skip = (page-1)*size
    const users = await User.find().skip(skip).limit(size).lean().exec();
    res.send(users)
})

module.exports = router