// import { createConnection } from 'mysql';
const mysql = require('mysql');

// Information de connexion mySql :
// export default function dbCon() {
module.exports = function dbCon() {
    return mysql.createConnection({
        database: "festiz",
        host: "localhost",
        user: "root",
        password: "root",
    })
};




// con.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");
// });
// };


// con.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");
//     var sql = "CREATE TABLE soiree (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100), city VARCHAR(100), date DATETIME, people INT, minYear INT, maxYear INT, gender VARCHAR(100))";
//     con.query(sql, function (err, result) {
//         if (err) throw err;
//         console.log("Table created");
//     });
// });