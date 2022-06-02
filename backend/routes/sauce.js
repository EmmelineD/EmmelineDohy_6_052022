//Importation d'Express
const express = require('express');

//Création des routes via express
const router = express.Router();

//Importation du middleware d'authentification
const auth = require('../middleware/auth');

//Importation du middleware pour les images multer
const multer = require('../middleware/multer-config');

//Importation du controllers sauce
const sauceCtrl = require('../controllers/sauce');

// afficher tous les objets
router.get('/', auth, sauceCtrl.getAllSauces); 
// créer un objet (placer multer après auth sinon une image peut être enregistré sans l'authentification)
router.post('/', auth, multer, sauceCtrl.createSauce);
// récupération d'un objet avec son id
router.get('/:id', auth, sauceCtrl.getOneSauce); 
// modifier un objet
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
// supprimer un objet
router.delete('/:id', auth, sauceCtrl.deleteSauce);
// like dislike
router.post('/:id/like', auth, sauceCtrl.likeDislikeSauce);

//exporter les routes créées
module.exports = router;
