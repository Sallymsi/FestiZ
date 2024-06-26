const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const dbCon = require("../others/ConDb");

// Enregistre un nouvel utilisateur dans la base de donnée :
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            let name = req.body.name;
            let year = req.body.year;
            let gender = req.body.gender;
            let image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
            let email = req.body.email;
            let password = hash;

            const db = dbCon();

            let sql = "INSERT INTO user (name, year, gender, image, email, password) VALUES (?, ?, ?, ?, ?, ?)";
            let sql2 = "SELECT id, image FROM user WHERE email = ?";

            db.connect(function (err) {
                if (err) throw err;
                db.query(sql, [name, year, gender, image, email, password], function (err, result) {
                    if (err) throw err;
                });

                db.query(sql2, [email], function (err, result) {
                    if (err) throw err;
                    res.status(201).json({
                        userId: result[0].id,
                        imageUser: result[0].image,
                        token: jwt.sign(
                            { userId: result[0].id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                });
            })
        })
        .catch(error => res.status(500).json({ message: error }));
};

// Recherche si les identifiants sont correct et accorde un Token valable 24h afin de sécuriser la session de l'utilisateur :
exports.login = (req, res, next) => {
    let email = req.body.form.email;
    let password = req.body.form.password;
    let sql = "SELECT * FROM  user WHERE email= ?";

    const db = dbCon();

    db.connect(function (err) {
        if (err) throw err;
        db.query(sql, [email], function (err, result) {
            if (err) throw err;
            // Si utilisateur non trouvé
            if (!result[0]) {
                return res.status(401).json({ message: "utilisateur introuvable" });
            };
            bcrypt.compare(password, result[0].password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: result[0].id,
                        imageUser: result[0].image,
                        token: jwt.sign(
                            { userId: result[0].id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ message: 'erreur' + err }));
        });
    })
};

exports.profil = (req, res, next) => {
    let userId = req.params.userId;
    let sql = "SELECT * FROM  user WHERE id= ?";

    const db = dbCon();

    db.connect(function (err) {
        if (err) throw err;
        db.query(sql, [userId], function (err, result) {
            if (err) throw err;
            res.status(201).json(result);
        });
    })

};

exports.setProfilImage = (req, res, next) => {
    let userId = req.body.userId;
    let image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    let sql = "UPDATE user SET image = ? WHERE id = ?";

    const db = dbCon();

    db.connect(function (err) {
        if (err) throw err;
        db.query(sql, [image, userId], function (err, result) {
            if (err) throw err;
            res.status(201).json(result);
        });
    })

};