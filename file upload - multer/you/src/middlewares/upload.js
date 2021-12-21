const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'))
      },
      filename : function (req, file, cb){
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniquePrefix + '-' + file.originalname)  //uploaded fine name
    }
})

const fileFilter = (req, file, cb) => {
    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted
  
     // To accept the file pass `true`, like so:
    if(file.mimetype == "image/jpeg"|| file.mimetype == "image/png"){
        cb(null, true)
    } else {
        cb(null, false)
    }
  }

module.exports = multer({
    storage : storage,
    fileFilter : fileFilter,
    limits : {
        filesize : {
            filesize : 1024 * 1024 * 5
        }
    }
})