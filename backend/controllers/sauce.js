// récupération du model de création d'une sauce
const Sauce = require('../models/Sauce');
const fs = require('fs');

 // créer une sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce ajoutée !'}))
    .catch(error => res.status(400).json({ error }));
};

// récupération d'une sauce avec son id
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

// modifier une sauce
exports.modifySauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }) 
      .then(sauce => {
          if(req.auth.userId == sauce.userId) {
            let sauceObject;
            //si l'image est modifié
            if(req.file){
              //on supprime l'ancienne image avant d'intégrer la nouvelle
              const filename = sauce.imageUrl.split('/images/')[1];
              fs.unlink(`images/${filename}`, () => {
              })
              sauceObject = {
                              ...JSON.parse(req.body.sauce),
                              imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                            }
              }else{
                sauceObject = { ...req.body };
              }
            Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet modifié !'}))
            .catch(error => res.status(400).json({ error }));
          } else {
            res.status(400).json({message : 'Non authorisé !'})
          }
        })
};

// supprimer une sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }) 
      .then(sauce => {
        if(req.auth.userId == sauce.userId) {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id }) // suppression de l'image dans la BDD
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        });
      } else {
        res.status(400).json({message : 'Non authorisé !'})
      }
      })
      .catch(error => res.status(500).json({ error }));
  };

// afficher toutes les sauces
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};

//Like dislike une sauce
exports.likeDislikeSauce = (req, res, next) => {
  const like = req.body.like;
  const userId = req.body.userId;
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => { 
        let userLike = sauce.usersLiked.find(id => id === userId);
        let userDislike = sauce.usersDisliked.find(id => id === userId);
        switch (like) {
            case 1 :
                if (!userLike) {
                    sauce.likes += 1;
                    sauce.usersLiked.push(userId);
                } else {
                    throw new Error('un seul like possible!');
                } 
                if (userDislike) {
                    throw new Error('annuler votre dislike avant de liker!');
                }
            break;
            case 0 :
                if (userLike) {
                    sauce.likes -= 1;
                    sauce.usersLiked = sauce.usersLiked.filter(id => id !== userId);
                }
                else {
                    if (userDislike) {
                    sauce.dislikes -= 1;
                    sauce.usersDisliked = sauce.usersDisliked.filter(id => id !== userId);
                    }   
                }
            break;
            case -1 :
                if (!userDislike) {
                    sauce.dislikes += 1;
                    sauce.usersDisliked.push(userId);
                } else {
                    throw new Error('un seul dislike possible!');
                } 
                if (userLike) {
                    throw new Error('annuler votre like avant de disliker!');
                }
        }
        sauce.save()
            .then(() => res.status(201).json({ message: 'préférence enregistrée !' }))
            .catch(error => res.status(400).json({ error }));

        })
    .catch(error => res.status(500).json({ error : error.message }));
      };
