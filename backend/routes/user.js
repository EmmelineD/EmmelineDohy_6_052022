//importation d'express
const express = require('express');

//création des routes via express
const router = express.Router();

//importation du model password
const password = require('../middleware/password');

//importation du controller user
const userCtrl = require('../controllers/user');

//création d'un user
router.post('/signup', password, userCtrl.signup);
//connexion d'un user déjà existant
router.post('/login', userCtrl.login);

//exporter les routes créées
module.exports = router;
