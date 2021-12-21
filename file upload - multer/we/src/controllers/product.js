const express = require('express')
const upload = require("../middlewares/file-upload")
const Product = require('../model/product')
const router = express.Router()

router.post("/", upload.single("productImages") , async function (req, res) {  //use key(productImages) while uploading file
    const product = await Product.create({
        name:req.body.name,
        price:req.body.price,
        image :req.file.path
    })

  return res.status(201).send(product)
})

router.post("/multiple", upload.any("productImages"), async function (req, res){
    const filePaths = req.files.map(file => file.path)
    const product = await Product.create({
        name:req.body.name,
        price:req.body.price,
        image : filePaths
    })
    return res.status(200).send(product)
})

// router.get("")
module.exports = router;