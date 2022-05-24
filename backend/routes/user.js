//Importation d'express
const express = require('express');

//Création du routeur
const router = express.Router();

//Importation de password-validator
const password = require('../middleware/password');

//Importation du controller
const userCtrl = require('../controllers/user');

//Création des routes 
router.post('/signup', password, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;