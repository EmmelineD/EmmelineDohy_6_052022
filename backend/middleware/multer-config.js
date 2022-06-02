//Importation de multer
const multer = require('multer');

//configuration des extensions possible
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

//Configuration du chemin pour enregistrer le fichier et sous quel nom
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension); // name = nom du fichier + extension
  }
});

//Exportation du middleware multer
module.exports = multer({ storage }).single('image');
