//importation de password-validator
const passwordValidator = require("password-validator");    

//création d'un schéma
const passwordSchema = new passwordValidator(); 

//propriétés
passwordSchema
    .is().min(5)                                    
    .is().max(100)                                  
    .has().uppercase()                              
    .has().lowercase()                              
    .has().digits()                                 
    .has().not().spaces()                           
    .is().not().oneOf(['Passw0rd', 'Password123']); 

//exportation du schéma
module.exports = passwordSchema;

