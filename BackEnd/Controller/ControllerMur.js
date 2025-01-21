require('dotenv').config();
const ModelMur = require('../Model/ModelMur');
const uploadPhoto = require('../helper/upload-photo'); // Importez la fonction pour télécharger la photo


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
