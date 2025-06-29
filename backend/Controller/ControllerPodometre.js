require('dotenv').config();
const ModelPodometre = require('../Model/ModelPodometre');
const ModelUtilisateur = require('../Model/ModelUtilisateur');
const ModelEvenement = require('../Model/ModelEvenement')
const ModelEntite = require('../Model/ModelEntite')


exports.ajouterPodometre = async (req, res) => {
  try {
    const { nombrePas,T_EXPO_NOTIF } = req.body;
   // console.log(T_EXPO_NOTIF);
    
    if (!nombrePas) {
      return res.status(400).json({ error: 'Le nombre de pas est requis.' });
    }

    const id_utilisateur = req.user.id_utilisateur; // Récupéré via le middleware
    const podometre = await ModelPodometre.ajouterPodometre({
      nombrepas_podometre: nombrePas,
      id_utilisateur,
      T_EXPO_NOTIF
    });  
    if (!podometre) {
      return res.status(500).json({ error: 'Erreur lors de l\'ajout des données du podomètre.' });
    }
     // Appel modèle : vérifie si badge débloqué
    let id_mur = await ModelUtilisateur.getIdMurByUserId(id_utilisateur)
    const badgesDebloques = await ModelPodometre.verifierBadges(id_utilisateur,id_mur);
     for (const badge of badgesDebloques) {
      await ModelEvenement.ajouterEvenement({
        id_mur,
        id_badge: badge.id_badge,
      });
    }
     //Vérifier les badges par entité
      const entitesObj = await ModelUtilisateur.getEntiteEtEntiteMereById(id_utilisateur);
      //console.log(entitesObj);
            
      const id_entite_fille = (entitesObj.id_entité.id_entité); 
      const id_entite_mere = (entitesObj.id_entité.id_entité_1);
      const badgesEntiteFille = await ModelPodometre.verifierBadgesCollectifs(id_entite_fille);
      const badgesMere = await ModelPodometre.verifierBadgesCollectifsEntiteMere(id_entite_mere);
      id_mur= await ModelEntite.getMursByIdEntite(id_entite_fille)
      for (const badge of badgesEntiteFille) {
          await ModelEvenement.ajouterEvenement({
            id_mur,
            id_badge: badge.id_badge,
          });
        }
      id_mur = await ModelEntite.getMursByIdEntite(id_entite_mere)
      for (const badge of badgesMere) {
              await ModelEvenement.ajouterEvenement({
                id_mur,
                id_badge: badge.id_badge,
              });
            }
    return res.status(201).json({
      message: 'Données du podomètre ajoutées avec succès.',
      podometre,
      badgesDebloques,
    });
  } catch (err) {
    console.error("Erreur interne :", err.message);
    return res.status(500).json({ error: 'Erreur lors de l\'ajout des données du podomètre.' });
  }
};