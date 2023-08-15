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
            let email = req.body.email;
            let password = hash;

            const db = dbCon();

            let sql = "INSERT INTO user (name, year, gender, email, password) VALUES (?, ?, ?, ?, ?)";

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

// Recherche si les identifiants sont correct et accorde un Token valable 24h afin de sécuriser la session de l'utilisateur :
exports.login = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    let sql = "SELECT * FROM  user WHERE email= ?";

    const db = dbCon();

    db.connect(function (err) {
        if (err) throw err;
        db.query(sql, [email], function (err, result) {
            if (err) throw err;
            if (!result[0]) {
                return res.status(401).json({ error: "utilisateur introuvable" })
            };
            bcrypt.compare(password, result[0].password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: result[0].id,
                        token: jwt.sign(
                            { userId: result[0].id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ message: error }));
        });
    })
};