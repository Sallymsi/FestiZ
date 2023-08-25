const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
// const multer = require('../middlewares/multer-config');
// const auth = require('../middleware/auth');

// Initialisation des routes à partir du Routeur d'Express :
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
// router.delete('/deleteUser', auth, userCtrl.deleteUser);
router.get('/profil/:userId', userCtrl.profil);
// router.get('/getAdmin', userCtrl.getAdmin);
// router.post('/changeInfo', auth, multer, userCtrl.changeInfo);

module.exports = router;