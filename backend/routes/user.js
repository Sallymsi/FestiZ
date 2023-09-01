const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const multer = require('../middlewares/multer-config');
// const auth = require('../middlewares/auth');

// Initialisation des routes à partir du Routeur d'Express :
router.post('/signup', multer, userCtrl.signup);
router.post('/login', userCtrl.login);
router.post('/profil-image', userCtrl.setProfilImage);
router.get('/profil/:userId', userCtrl.profil);

module.exports = router;