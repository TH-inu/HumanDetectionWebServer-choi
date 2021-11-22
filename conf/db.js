const mysql = require('mysql');

var conn = mysql.createConnection({
    host        : '192.168.35.88',
    user        : 'root',
    password    : 'more1234',
    database    : 'test'
});

module.exports = conn;