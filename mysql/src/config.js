const mysql = require('mysql');
require('dotenv').config()

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.USER_PASS,
    database: 'test'
});

connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
  });

  module.exports = connection;