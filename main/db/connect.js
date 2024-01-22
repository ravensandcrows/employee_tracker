const mysql = require('mysql2');

//create the connection with the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'employees'
});

// throw err if something breaks
connection.connect(function (err){
    if (err) throw err;
});


module.exports = connection;