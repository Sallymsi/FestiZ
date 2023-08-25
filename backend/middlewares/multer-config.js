const multer = require('multer');

// Initialisation des extensions :
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

console.log('Multer 1');
// Configuration de Multer pour les images de profil utilisateur :
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        console.log('Multer 3');
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        console.log('Multer 3');
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage: storage }).single('image');