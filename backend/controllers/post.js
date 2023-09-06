const dbCon = require("../others/ConDb");

// Create a party :
exports.setParty = (req, res, next) => {
    let userId = req.body.userId;
    let userImage = req.body.userImage;
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

    console.log(userImage);
    const db = dbCon();

    let sql = "INSERT INTO soiree (userId, userImage, name, city, activity, address, lat, lng, date, people, minYear, maxYear, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    db.connect(function (err) {
        if (err) throw err;
        db.query(sql, [userId, userImage, name, city, activity, address, lat, lng, date, people, minYear, maxYear, gender], function (err, result) {
            if (err) throw err;
            res.status(201).json({ status: 'success', message: "Soirée ajouté à la BDD !" });
        });
    })
};

// Get all party :
exports.getParty = (req, res, next) => {

    const db = dbCon();

    let sql = "SELECT soiree.id, userId,  soiree.name, city, activity, address, lat, lng, date, people, minYear, maxyear, soiree.gender, user.image FROM soiree JOIN user ON soiree.userId = user.id ";

    db.connect(function (err) {
        if (err) throw err;
        db.query(sql, function (err, result) {
            if (err) throw err;
            res.status(201).json(result);
        });
    })
};

// Get Party only one user :
exports.getPartyUser = (req, res, next) => {
    let userId = req.params.userId;

    const db = dbCon();

    let sql = "SELECT * FROM soiree WHERE userId= ?";

    db.connect(function (err) {
        if (err) throw err;
        db.query(sql, [userId], function (err, result) {
            if (err) throw err;
            res.status(201).json(result);
        });
    })
};

// Add user to party :
exports.addUserToParty = (req, res, next) => {
    let userId = req.body.userId;
    let partyId = req.body.partyId;

    const db = dbCon();

    let sql = "INSERT INTO soiree_user (partyId, userId)";

    db.connect(function (err) {
        if (err) throw err;
        db.query(sql, [partyId, userId], function (err, result) {
            if (err) throw err;
            console.log(result);
            res.status(201).json({ status: 'success', message: "User ajouté à la BDD !" });
        });
    })
};