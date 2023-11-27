require('dotenv').config();
const mysql = require('mysql2');


const userConnect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'curr_employee'
});

//userConnect.connect();
module.exports = userConnect;