//MySQL2
const mysql = require('mysql2/promise');
// Conceción con Database
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'login',
});

module.exports = connection;