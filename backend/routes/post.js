const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require('../middlewares/auth');
// const multer = require('../middleware/multer-file');

// Initialisation des routes à partir du Routeur d'Express :
router.post('/set-party', postCtrl.setParty);
router.delete('/cancel-party/:partyId', postCtrl.cancelParty);
router.get('/get-party', postCtrl.getParty);
router.get('/party-user/:userId', postCtrl.getPartyUser);
router.post('/add-user-to-party', postCtrl.addUserToParty);
router.get('/get-user-participate-to-party/:partyId', postCtrl.getUserParticipateToParty);
// router.delete('/delete', auth, postCtrl.deleteMsg);
// router.delete('/deleteAnswer', auth, postCtrl.deleteAnswer);
// router.put('/update', auth, multer, postCtrl.updateMsg);
// router.put('/updateAnswer', auth, multer, postCtrl.updateAnswer);


module.exports = router;