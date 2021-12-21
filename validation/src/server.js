const connect = require('./config/db')
const app = require('./index')

app.listen(2300, async function(){
    await connect();
    console.log('Listening on port 2200')
})

