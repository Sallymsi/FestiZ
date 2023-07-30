const mysql = require('mysql');
const dbCon = require("../others/ConDb");

exports.setParty = (req, res, next) => {
    let name = req.body.name;
    let city = req.body.city;
    let activity = req.body.activity;
    let address = req.body.address;
    let lat = req.body.lat;
    let lng = req.body.lng;
    let date = req.body.date;
    let people = req.body.people;
    let minYear = req.body.minYear;
    let maxYear = req.body.maxYear;
    let gender = req.body.gender;

    const db = dbCon();

    let sql = "INSERT INTO soiree (name, city, activity, address, lat, lng, date, people, minYear, maxYear, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    db.connect(function (err) {
        if (err) throw err;
        db.query(sql, [name, city, activity, address, lat, lng, date, people, minYear, maxYear, gender], function (err, result) {
            if (err) throw err;
            res.status(201).json({ status: 'success', message: "Soirée ajouté à la BDD !" });
        });
    })
};


exports.getParty = (req, res, next) => {

    const db = dbCon();

    let sql = "SELECT name, city, activity, address, lat, lng, date, people, minYear, maxyear, gender FROM soiree";

    db.connect(function (err) {
        if (err) throw err;
        db.query(sql, function (err, result) {
            if (err) throw err;
            res.status(201).json(result);
        });
    })
};