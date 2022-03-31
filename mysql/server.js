const app = require('./src/index')

//     connection.query('SELECT * FROM `users`',function (error, results, fields) {
//       if(error) throw error
//     console.log("cConnected")
//   });

app.listen(3000, async function(){
    console.log('Server connected')
})