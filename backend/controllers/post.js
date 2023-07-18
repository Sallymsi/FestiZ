const mysql = require('mysql');
const express = require('express');
const dbCon = require("../others/ConDb");

exports.test = (req, res, next) => {

    res.status(201).json({ message: "C'est OK !" });
};

exports.post = (req, res, next) => {
    let name = req.body.name;
    let city = req.body.city;
    let date = req.body.date;
    let people = req.body.people;
    let minYear = req.body.minYear;
    let maxYear = req.body.maxYear;
    let gender = req.body.gender;

    const db = dbCon();

    let sql = "INSERT INTO soiree (name, city, date, people, minYear, maxYear, gender) VALUES (?, ?, ?, ?, ?, ?, ?)";

    db.connect(function (err) {
        if (err) throw err;
        db.query(sql, [name, city, date, people, minYear, maxYear, gender], function (err, result) {
            if (err) throw err;
            res.status(201).send({ status: 'success', message: "Soirée ajouté à la BDD !" });
        });
    })
};