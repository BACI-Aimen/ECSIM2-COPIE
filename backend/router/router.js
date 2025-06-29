const upload = require('../server').upload;
module.exports = function(app) {
    const ControllerMur = require('../Controller/ControllerMur');
    const ControllerUtilisateur = require('../Controller/ControllerUtilisateur');
    const ControllerPodometre = require('../Controller/ControllerPodometre');
    const ConrollerClassement = require('../Controller/ControllerClassement');
    const ControllerEntite = require('../Controller/ControllerEntite');
    const ControllerBadge = require('../Controller/ControllerBadge');
    const ControllerDebloque = require('../Controller/ControllerDebloque');
    const ControllerReaction = require('../Controller/ControllerReaction');

    const jwt = require('../middleware/verifyJwtToken');
    const verif = require('../middleware/validate_web');

    // se connecter
    app.post('/login',                                          verif.login,                    ControllerUtilisateur.login)
    //GESTION DES MURS
    app.get('/mur/:id_mur',                                                                     ControllerMur.recupererMur)
    app.get('/getMurUtilisateursEtEntiteRecherche',             jwt.verifyTokenUser,            ControllerMur.getMurUtilisateursEtEntiteRecherche)
    app.get('/MurUtilisateur/:id_mur',                          jwt.verifyTokenUser,            ControllerMur.getUnMurUtilisateurByID)
    app.get('/MonMurUtilisateur',                               jwt.verifyTokenUser,            ControllerMur.getMonMurUtilisateurById)

    //app.post('/addmur',                                         jwt.verifyTokenUser,            upload.single('photo_mur'), ControllerMur.ajouterMur); 
    //GESTION DES UTILISATEURS
    app.post('/createUser',                                     jwt.verifyTokenAdmin,           ControllerUtilisateur.creerCompteUser)
    app.post('/mdpoublie',                                      verif.verifyEmail,              ControllerUtilisateur.motdepasseoublie)
    app.post('/verifieCode',                                                                    ControllerUtilisateur.verifierCodeReinitialisation)
    app.post('/finaliserInscription',upload.single('photo_mur'),[verif.verifyMdp,jwt.verifyTokenUser],             ControllerUtilisateur.finaliserInscription); 
    app.put('/updateUser',                                      jwt.verifyTokenAdmin,           ControllerUtilisateur.updateCompte)
    app.get('/compteUtilisateur/:id_utilisateur',               jwt.verifyTokenAdmin,           ControllerUtilisateur.getCompteUtilisateurById)
    app.get('/monCompteUtilisateur',                            jwt.verifyTokenUser,            ControllerUtilisateur.getMonCompteUtilisateurById)
    app.get('/monCompteAdmin',                                  jwt.verifyTokenAdmin,           ControllerUtilisateur.getMonCompteUtilisateurById)
    app.get('/getAllUtilisateurs',                              jwt.verifyTokenAdmin,           ControllerUtilisateur.getAllUtilisateurs)
    app.delete('/Supprimer_Utilisateur/:id_utilisateur',        jwt.verifyTokenAdmin,           ControllerUtilisateur.SupprimerUtilisateur);
    app.delete('/SupprimerMesDonnees',                          jwt.verifyTokenUser,            ControllerUtilisateur.SupprimerMesDonnees);
    app.patch('/ModifierPseudoUtilisateur',                     jwt.verifyTokenUser,            ControllerUtilisateur.updatePseudo);
    app.patch('/ModifierPP',                                    jwt.verifyTokenUser,            upload.single('photo_mur'),ControllerUtilisateur.changerPhotoProfil);
    app.post('/import-csv',                                     jwt.verifyTokenAdmin,           upload.single('csv'), ControllerUtilisateur.importerUtilisateurs);
    app.patch('/ModifierMdpUtilisateur',                        [jwt.verifyTokenUser, verif.updateMdp],            ControllerUtilisateur.updateMdp);
    app.patch('/ModifierMdpOublie',                             verif.updateMdp,                ControllerUtilisateur.updateMdpOublie);

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
    //GESTION DES ENTITES
    app.get('/getUneEntite/:id_entite',                         jwt.verifyTokenAdmin,           ControllerEntite.getUneEntite)
    app.get('/getAllEntiteMere',                                jwt.verifyTokenAdmin,           ControllerEntite.getAllEntiteMere)
    app.get('/getAllEntiteFilles',                              jwt.verifyTokenAdmin,           ControllerEntite.getAllEntiteFilles)
    app.get('/getAllEntites',                                   jwt.verifyTokenAdmin,           ControllerEntite.getAllEntites)
    app.post('/createEntite',                                   jwt.verifyTokenAdmin,           upload.single('image'),ControllerEntite.CreateEntite)
    app.delete('/SupprimerEntite/:id_entite',                   jwt.verifyTokenAdmin,           ControllerEntite.deleteEntite)
    app.patch('/ModifEntite',                                   jwt.verifyTokenAdmin,           upload.single('image'),ControllerEntite.updateEntite)
    //GESTION DES BADGES
    app.post('/createbadge',                                    jwt.verifyTokenAdmin,           upload.single('image'),ControllerBadge.CreerBadge)
    app.get('/getAllBadges',                                    jwt.verifyTokenAdmin,           ControllerBadge.getAllBadges)
    app.get('/getAllBadgesVisible',                             jwt.verifyTokenUser,            ControllerBadge.getAllBadgesVisible)
    app.get('/getBadgeAdmin/:id',                               jwt.verifyTokenAdmin,           ControllerBadge.getBadge)
    app.delete('/SupprimerBadge/:id_badge',                     jwt.verifyTokenAdmin,           ControllerBadge.supprimerBadge)
    app.get('/getBadgeUser/:id',                                jwt.verifyTokenUser,            ControllerBadge.getBadgeUser)
    app.put('/modifierBadge/:id',                               jwt.verifyTokenAdmin,           upload.single('image'),ControllerBadge.ModifierBadge)
    //GESTION DES BADGES DEBLOQUE
    app.post('/AttribueBadge',                                  jwt.verifyTokenAdmin,           ControllerDebloque.attribueBadge)
    app.post('/RevoquerBadge',                                  jwt.verifyTokenAdmin,           ControllerDebloque.revoquerBadge)
    app.get('/GetBadgeDebloqueUtilisateur/:id_mur',             jwt.verifyTokenAdmin,           ControllerDebloque.getBadgesByMur)
    //GESTION DES REACTIONS
    app.post('/CreateReaction',                                 jwt.verifyTokenAdmin,           upload.single('image'),ControllerReaction.creerReaction)
    app.get('/getAllReactions',                                 jwt.verifyTokenUser,            ControllerReaction.getReactions)
    app.get('/getAllReactionsAdmin',                            jwt.verifyTokenAdmin,           ControllerReaction.getReactions)
    app.get("/getReaction/:id",                                 jwt.verifyTokenAdmin,           ControllerReaction.getReactionById);
    app.delete("/DeleteReaction/:id",                           jwt.verifyTokenAdmin,           ControllerReaction.deleteReaction);
    app.put("/modifierReaction/:id",                            jwt.verifyTokenAdmin,           upload.single('image'),ControllerReaction.updateReaction)
    app.get("/getReactByEvent/:id",                             jwt.verifyTokenUser,            ControllerReaction.getReactByEvent);
    app.post('/reagir',                                         jwt.verifyTokenUser,            upload.single('image'),ControllerReaction.posterReaction)

}


  