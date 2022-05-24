const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const sauceCtrl = require('../controllers/sauce');

router.get('/', auth, sauceCtrl.getAllSauces); // afficher tous les objets
router.post('/', auth, multer, sauceCtrl.createSauce); // créer un objet (placer multer après auth sinon une image peut être enregistré sans l'authentification)
router.get('/:id', auth, sauceCtrl.getOneSauce); // récupération d'un objet avec son id
router.put('/:id', auth, multer, sauceCtrl.modifySauce); // modifier un objet
router.delete('/:id', auth, sauceCtrl.deleteSauce); // supprimer un objet
router.post('/:id/like', auth, sauceCtrl.likeDislikeSauce); // like dislike

module.exports = router;