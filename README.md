# "Hot Takes" OpenClassrooms Projet 6
# Construisez une API sécurisée pour une application d'avis gastronomiques
6ème projet du parcours développeur web d'OpenClassrooms

## Le projet
But : construire le back-end (API) de la premiere version d'une application web de critique de sauces piquantes "Hot Takes" proposant une galerie de sauces, permettant de télécharger ses propres sauces et de liker/disliker les sauces que d'autres partagent.
L'API doit être construite selon des pratiques de code sécurisées.

Le front-end est fourni.

Compétences développées :        
➡ Implémenter un modèle logique de données conformément à la réglementation   
➡ Stocker des données de manière sécurisée   
➡ Mettre en œuvre des opérations CRUD de manière sécurisée   

Status : en cours

## Installation
dépendances à installer : 
- NodeJS 12.14 or 14.0.+
- Angular CLI 7.0.2.+
- node-sass
- express
- mongoose
- mongoose-unique-validator
- bcrypt
- jsonwebtoken
- password-validator
- helmet
- multer


1. Cloner le dépôt
- Dans le dossier front-end : run `ng serve` et Naviguez jusqu’à `http://localhost:4200/`. L’application se rechargera automatiquement si vous modifiez l’un des fichiers sources.

2. Dans le dossier backend : 
- creer un dossier images
- creer un fichier development.env et un fichier production.env et y renseigner les variables d'environnement selon l'environnement dans lequel on se trouve:
    - MONGO=chaine de connexion MongoDB
    - TOKEN=votre token secret
- run `npm install` puis 
run `nodemon server`, l'application se rechargera automatiquement si vous modifiez l'un des fichiers sources.


## Technologies & frameworks utilisés
- Javascript
- API REST Node.js / Express
- MongoDB
