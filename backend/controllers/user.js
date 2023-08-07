const mysql = require('mysql');
const bcrypt = require('bcrypt');
const dbCon = require("../others/ConDb");

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            let name = req.body.name;
            let year = req.body.year;
            let gender = req.body.gender;
            let email = req.body.email;
            let password = hash;

            const db = dbCon();

            let sql = "INSERT INTO soiree (name, year, gender, email, password) VALUES (?, ?, ?, ?, ?)";

            db.connect(function (err) {
                if (err) throw err;
                db.query(sql, [name, year, gender, email, password], function (err, result) {
                    if (err) throw err;
                    res.status(201).json({ status: 'success', message: "Utilisateur ajouté à la BDD !" });
                });
            })
        })
        .catch(error => res.status(500).json({ message: error }));

};