//Importation de mongoose pour pouvoir enregistrer les données user dans la BDD
const mongoose = require('mongoose');

//Importation du plugin (complément de "unique:true" double sécuriter pour s'assurer qu'un mail ne peut pas être utiliser plusieurs fois)
const uniqueValidator = require('mongoose-unique-validator');

//Création d'un schéma
const userSchema = mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v); // regEX utilisé dans le projet 5 pour s'assurer que le format de l'email est valide
            },
            message: "Mail non valide"
        },
        required: [true, "Email required"]
    },
    password: { type: String, required: true }
});

//utilisation du plugin uniqueValidator
userSchema.plugin(uniqueValidator);

//Exportation du model User
module.exports = mongoose.model('User', userSchema);
