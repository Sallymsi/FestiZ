// import { createConnection } from 'mysql';
const mysql = require('mysql');

// Information de connexion mySql :
module.exports = function dbCon() {
    return mysql.createConnection({
        database: "festiz",
        host: "localhost",
        user: "root",
        password: "root",
    })
};
