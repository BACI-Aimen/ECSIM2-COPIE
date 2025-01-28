const upload = require('../server').upload;
module.exports = function(app) {
    const ControllerMur = require('../Controller/ControllerMur');
    const ControllerUtilisateur = require('../Controller/ControllerUtilisateur');
    const ControllerPodometre = require('../Controller/ControllerPodometre');
    const ConrollerClassement = require('../Controller/ControllerClassement');

    const jwt = require('../middleware/verifyJwtToken');
    const verif = require('../middleware/validate_web');

    // se connecter
    //GESTION DES MURS
    app.get('/mur/:id_mur',                                                                     ControllerMur.recupererMur)
    //app.post('/addmur',                                         jwt.verifyTokenUser,            upload.single('photo_mur'), ControllerMur.ajouterMur); 
    //GESTION DES UTILISATEURS
    app.post('/createUser',                                     jwt.verifyTokenAdmin,           ControllerUtilisateur.creerCompteUser)
    app.post('/loginUser',                                      verif.login,                    ControllerUtilisateur.loginUser)
    app.post('/loginAdmin',                                     verif.login,                    ControllerUtilisateur.loginAdmin)
    app.post('/finaliserInscription',                           jwt.verifyTokenUser,            upload.single('photo_mur'), ControllerUtilisateur.finaliserInscription); 
    //PODOMETRE
    app.post('/addNbPasJour',                                   jwt.verifyTokenUser,            ControllerPodometre.ajouterPodometre)
    //CLASSEMENT
    app.get('/classementUtilisateurActuel',                     jwt.verifyTokenUser,            ConrollerClassement.getClassementUtilisateurActuel)
    app.get('/classementUtilisateurHistorique/:mois/:annee',    jwt.verifyTokenUser,            ConrollerClassement.getClassementUtilisateurHistorique)

}


  