require('dotenv').config();
const ModelMur = require('../Model/ModelMur');
const ModelUtilisateur = require('../Model/ModelUtilisateur');
const ModelEntite = require('../Model/ModelEntite');
const uploadPhoto = require('../helper/upload-photo'); // Importez la fonction pour télécharger la photo

//a supp
exports.ajouterMur = async (req, res) => {
    try {
        // Vérifier que Multer a bien placé le fichier dans req.file
        const photo_mur = req.file;  

        if (!photo_mur) {
            return res.status(400).json({ error: "Le fichier photo_mur est requis." });
        }
        // Appel à la fonction uploadPhoto pour télécharger la photo dans Supabase
        const photoURL = await uploadPhoto(photo_mur);  // Utilisez photo_mur comme fichier binaire        
        if (!photoURL) {
            return res.status(500).json({ error: "Erreur lors du téléchargement de la photo." });
        }
        
        // Appel au modèle pour ajouter un mur avec l'URL de la photo téléchargée
        const nouveauMur = await ModelMur.ajouterMur(photoURL);
        if (photo_mur && photo_mur.path) {
          fs.unlink(photo_mur.path, (err) => {
              if (err) {
                  console.error("Erreur lors de la suppression du fichier temporaire:", err.message);
              } else {
                  console.log("Fichier temporaire supprimé avec succès.");
              }
          });
      }
        return res.status(201).json({ message: "Mur ajouté avec succès", data: nouveauMur });
    } catch (err) {
        console.error("Erreur interne :", err.message);
        return res.status(500).json({ error: 'Erreur lors de l\'ajout du mur' });
    }
};

//Récup un mur
exports.recupererMur = async (req, res) => {
    try {
        const { id_mur } = req.params;
        
        // Validation : Vérifier l'ID fourni
        if (!id_mur) {
          return res.status(400).json({ error: "L'ID du mur est requis." });
        }
  
        // Appel au modèle pour récupérer un mur
        const mur = await ModelMur.recupererMur(id_mur);
  
        if (!mur) {
          return res.status(404).json({ error: "Mur introuvable" });
        }
  
        return res.status(200).json(mur);
      } catch (err) {
        console.error("Erreur interne :", err.message);
        return res.status(500).json({ error: 'Erreur lors de la récupération du mur' });
      }
}

exports.getMurUtilisateursEtEntiteRecherche = async (req, res) => {
    try {
      const utilisateurs = await ModelUtilisateur.getAllmurRecherche();
      
  
      if (!utilisateurs || utilisateurs.length === 0) {
        return res.status(404).json({ error: "Aucun utilisateur trouvé" });
      }
  
      const entitemur = await ModelEntite.getEntitemurRecherche();
  
      if (!entitemur || entitemur.length === 0) {
        return res.status(404).json({ error: "Aucun utilisateur trouvé" });
      }
  
      // Formater les utilisateurs dans la structure souhaitée
      const utilisateursFormatted = utilisateurs.map(user => ({
        Id: user.id_utilisateur,                   // ID de l'utilisateur
        Nom: user.pseudo_utilisateur,  // Pseudo de l'utilisateur
        Id_mur: user.id_mur            // ID du mur associé
      }));
  
      // Formater les entités dans la structure souhaitée
      const entitesFormatted = entitemur.map(entite => ({
        Id: entite.id_entité,                 // ID de l'entité
        Nom: entite.libellé_entité,     // Libellé de l'entité
        Id_mur: entite.id_mur           // ID du mur associé
      }));
  
      // Fusionner les deux listes
      const mergedList = [...utilisateursFormatted, ...entitesFormatted];
  
      return res.status(200).json(mergedList); // Retourne la liste des utilisateurs
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };