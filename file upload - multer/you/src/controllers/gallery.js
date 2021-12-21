const express = require('express')
const upload = require('../middlewares/upload')
const Gallery = require('../models/gallery')
const router = express.Router()

router.post('/', upload.any('galleryImage'), async function(req, res){
    const filePaths = req.files.map(file => file.path)
    
    const gallery = await Gallery.create({
        user_id : req.body.user_id,
        pictures: filePaths   //file.path
    })
    return res.status(200).send(gallery)
})

// router.post('/bulk', upload.array('galleryImage', 5), async (req, res)=>{
//     const gallery = await Gallery.create({
//         first_name : req.body.first_name,
//         last_name : req.body.last_name,
//         profile_pic : req.file.path
//     })
//     res.send(gallery)
// })

module.exports = router

