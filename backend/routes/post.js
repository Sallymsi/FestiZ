const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require('../middlewares/auth');
// const multer = require('../middleware/multer-file');

// Initialisation des routes à partir du Routeur d'Express :
router.post('/set-party', postCtrl.setParty);
router.get('/get-party', postCtrl.getParty);
router.get('/test/:userId', postCtrl.test);
router.get('/party-user/:userId', postCtrl.getPartyUser);
// router.post('/response', auth, postCtrl.reponse);
// router.delete('/delete', auth, postCtrl.deleteMsg);
// router.delete('/deleteAnswer', auth, postCtrl.deleteAnswer);
// router.put('/update', auth, multer, postCtrl.updateMsg);
// router.put('/updateAnswer', auth, multer, postCtrl.updateAnswer);
// router.get('/get', auth, postCtrl.get);
// router.get('/getAnswers', auth, postCtrl.getAnswers);
// router.get('/getLike', auth, postCtrl.getLike);
// router.get('/getLikeAnswer', auth, postCtrl.getLikeAnswer);
// router.get('/getLikeUser', auth, postCtrl.getLikeUser);
// router.get('/getLikeUserAnswer', auth, postCtrl.getLikeUserAnswer);
// router.post('/likeUp', auth, postCtrl.likeUp);
// router.post('/likeUpAnswer', auth, postCtrl.likeUpAnswer);
// router.post('/likeDown', auth, postCtrl.likeDown);
// router.post('/likeDownAnswer', auth, postCtrl.likeDownAnswer);


module.exports = router;