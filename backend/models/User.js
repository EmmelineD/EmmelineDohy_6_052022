//Importation de mongoose
const mongoose = require('mongoose');

//Importation du plugin
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
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Mail non valide"
        },
        required: [true, "Email required"]
    },
    password: { type: String, required: true }
});

//Plugin appliqué au schéma pour empecher d'avoir plusieurs utilisateurs avec la meme adresse mail
userSchema.plugin(uniqueValidator);

//Exportation du shcéma sous forme de modèle
module.exports = mongoose.model('User', userSchema);