const upload = require('../server').upload;
module.exports = function(app) {
    const ControllerMur = require('../Controller/ControllerMur');
    const ControllerUtilisateur = require('../Controller/ControllerUtilisateur');
    const jwt = require('../middleware/verifyJwtToken');
    // se connecter
    //GESTION DES MURS
    app.get('/mur/:id_mur', ControllerMur.recupererMur)
    app.post('/mur', upload.single('photo_mur'), ControllerMur.ajouterMur); 
    //GESTION DES UTILISATEURS
    app.post('/createUser',jwt.verifyTokenAdmin, ControllerUtilisateur.creerCompteUser)
    app.post('/loginUser', ControllerUtilisateur.loginUser)
    app.post('/loginAdmin', ControllerUtilisateur.loginAdmin)


}

