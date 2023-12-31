const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const app = express();
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post')
const dbCon = require("./others/ConDb.js");

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Evite les bloquage CORS en autorisant les entêtes :
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// const db = dbCon()

// db.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");
//     var sql = "CREATE TABLE user (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100), year VARCHAR(100), gender VARCHAR(100), image VARCHAR(255), email VARCHAR(100) UNIQUE, password VARCHAR(100))";
//     db.query(sql, function (err, result) {
//         if (err) throw err;
//         console.log("Table created");
//     });
// });

// db.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");
//     var sql = "CREATE TABLE soiree (id INT AUTO_INCREMENT PRIMARY KEY, userId INT, name VARCHAR(100), city VARCHAR(100), activity VARCHAR(100), address VARCHAR(255), lat FLOAT, lng FLOAT, date DATE, people INT, minYear INT, maxYear INT, gender VARCHAR(100))";
//     db.query(sql, function (err, result) {
//         if (err) throw err;
//         console.log("Table created");
//     });
// });

// db.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");
//     var sql = "CREATE TABLE soiree_user (userId INT, partyId INT)";
//     db.query(sql, function (err, result) {
//         if (err) throw err;
//         console.log("Table created");
//     });
// });

// // Initialisation des routes pour les fichiers/images utilisateurs :
app.use('/images', express.static(path.join(__dirname, 'images')));
// app.use('/files', express.static(path.join(__dirname, 'files')));

// // Initialisation des routes Post et Users :
app.use('/api/post', postRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;