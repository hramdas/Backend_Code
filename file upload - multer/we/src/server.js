const app = require('./index')
const connect = require('./configs/db')

const productController = require("./controllers/product")

app.use("/products", productController)

app.listen(2200, async function(){
    await connect()
    console.log('listening on 2200')
})