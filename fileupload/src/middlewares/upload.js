const path = require('path') //inbuild
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../uploads')); //File path,  dirname = current folder path
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + '_' + file.originalname)
    }
  })

  //Filter file types allowed
  const fileFilter = (req, file, cb)=> {
   if(file.mimetype === "image/jpeg" || file.mimetype === "image/png" ){
    cb(null, true)
   } else {
       cb(null, false)
   }
  }

module.exports = multer({
    storage : storage,
    fileFilter : fileFilter,
    limits : {
        fileSize : 1024*1024*5
    }
})