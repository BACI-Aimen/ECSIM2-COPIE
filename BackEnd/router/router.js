const upload = require('../server').upload;
module.exports = function(app) {
    const ControllerMur = require('../Controller/ControllerMur');
    const ControllerUtilisateur = require('../Controller/ControllerUtilisateur');
    const ControllerPodometre = require('../Controller/ControllerPodometre');
    const ConrollerClassement = require('../Controller/ControllerClassement');

    const jwt = require('../middleware/verifyJwtToken');
    const verif = require('../middleware/validate_web');

    // se connecter
    app.post('/login',                                          verif.login,                    ControllerUtilisateur.login)
    //GESTION DES MURS
    app.get('/mur/:id_mur',                                                                     ControllerMur.recupererMur)
    app.delete('/Supprimer_Utilisateur/:id_utilisateur',         jwt.verifyTokenAdmin,          ControllerUtilisateur.SupprimerUtilisateur);
    //app.post('/addmur',                                         jwt.verifyTokenUser,            upload.single('photo_mur'), ControllerMur.ajouterMur); 
    //GESTION DES UTILISATEURS
    app.post('/createUser',                                     jwt.verifyTokenAdmin,           ControllerUtilisateur.creerCompteUser)
    app.post('/finaliserInscription',                           jwt.verifyTokenUser,            upload.single('photo_mur'), ControllerUtilisateur.finaliserInscription); 
    app.put('/updateUser',                                      jwt.verifyTokenAdmin,           ControllerUtilisateur.updateCompte)
    app.get('/compteUtilisateur/:id_utilisateur',               jwt.verifyTokenAdmin,           ControllerUtilisateur.getCompteUtilisateurById)
    app.get('/monCompteUtilisateur',                            jwt.verifyTokenUser,            ControllerUtilisateur.getMonCompteUtilisateurById)
    app.get('/getAllUtilisateurs',                              jwt.verifyTokenAdmin,           ControllerUtilisateur.getAllUtilisateurs)
    app.get('/getMurUtilisateursEtEntiteRecherche',             jwt.verifyTokenUser,            ControllerMur.getMurUtilisateursEtEntiteRecherche)
    //PODOMETRE
    app.post('/addNbPasJour',                                   jwt.verifyTokenUser,            ControllerPodometre.ajouterPodometre)
    //CLASSEMENT
    app.get('/classementUtilisateurActuel',                     jwt.verifyTokenUser,            ConrollerClassement.getClassementUtilisateurActuel)
    app.get('/classementUtilisateurHistorique/:mois/:annee',    jwt.verifyTokenUser,            ConrollerClassement.getClassementUtilisateurHistorique)
    app.get('/classementEntiteActuel',                          jwt.verifyTokenUser,            ConrollerClassement.getClassementEntiteActuel)
    app.get('/classementEntiteHistorique/:mois/:annee',         jwt.verifyTokenUser,            ConrollerClassement.getClassementEntiteHistorique)
    app.get('/classementEntiteMereHistorique/:mois/:annee',     jwt.verifyTokenUser,            ConrollerClassement.getClassementEntiteMereHistorique)
    app.get('/classementEntiteMereActuel',                      jwt.verifyTokenUser,            ConrollerClassement.getClassementEntiteMereActuel)
    app.get('/MonclassementEntiteMereActuel',                   jwt.verifyTokenUser,            ConrollerClassement.getMonClassementEntiteMereActuel)
    app.get('/MonclassementEntiteMereHistorique/:mois/:annee',  jwt.verifyTokenUser,            ConrollerClassement.getMonClassementEntiteMereHistorique)
    app.get('/MonclassementEntiteFilleActuel',                  jwt.verifyTokenUser,            ConrollerClassement.getMonClassementEntiteFilleActuel)
    app.get('/MonclassementEntiteFilleHistorique/:mois/:annee', jwt.verifyTokenUser,            ConrollerClassement.getMonClassementEntiteFilleHistorique)
}


  