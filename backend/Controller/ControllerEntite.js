require('dotenv').config();
const ModelEntite = require('../Model/ModelEntite');
const uploadPhoto = require('../helper/upload-photo'); // Importez la fonction pour télécharger la photo
const ModelMur = require('../Model/ModelMur');

exports.getAllEntiteMere = async (req, res) => {
  try {
    const entites = await ModelEntite.getAllentiteMere();
         
     
         if (!entites || entites.length === 0) {
           return res.status(404).json({ error: "Aucun utilisateur trouvé" });
         }
         return res.status(200).json(entites);
      
  } catch (err) {
    console.error('Erreur interne :', err.message);
    return res.status(500).json({ error: 'Erreur lors de la récupération des entités meres.' });
  }
};
exports.getUneEntite = async (req, res) => {
  try {
    const { id_entite } = req.params;
    console.log(id_entite);

    if (!id_entite) {
      return res.status(400).json({ error: "ID de l'entité requis" });
    }

    let entites = await ModelEntite.getUneEntite(id_entite);

    // Transformation des données
    entites = entites.map(entite => ({
      id_entité: entite.id_entité,
      libellé_entité: entite.libellé_entité,
      photo_mur: entite.id_mur?.photo_mur || null, // Remplace id_mur par photo_mur directement
      entité_mere: entite.id_entité_1 || null // Renomme id_entité_1 en entité_mere
    }));

    return res.status(200).json(entites);
  } catch (err) {
    console.error('Erreur interne :', err.message);
    return res.status(500).json({ error: "Erreur lors de la récupération de l'entité" });
  }
};

exports.getAllEntiteFilles = async (req, res) => {
  try {
    const entites = await ModelEntite.getAllentiteFilles();
         
     
         if (!entites || entites.length === 0) {
           return res.status(404).json({ error: "Aucun utilisateur trouvé" });
         }
         return res.status(200).json(entites);
      
  } catch (err) {
    console.error('Erreur interne :', err.message);
    return res.status(500).json({ error: 'Erreur lors de la récupération des entités filles.' });
  }
};
exports.getAllEntites = async (req, res) => {
  try {
    const entites = await ModelEntite.getAllEntites();

    if (!entites || entites.length === 0) {
      return res.status(404).json({ error: "Aucune entité trouvée" });
    }

    return res.status(200).json(entites);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
exports.deleteEntite = async (req, res) => {
  try {
    const { id_entite } = req.params;

    if (!id_entite) {
      return res.status(400).json({ error: "ID de l'entité requis" });
    }

    const result = await ModelEntite.deleteEntiteById(id_entite);

    if (result.error) {
      return res.status(404).json(result);
    }

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
exports.updateEntite = async (req, res) => {
  try {
    const { id_entite, libelle_entite, id_entite_1 } = req.body;

    const image = req.file;    
    if (!id_entite) {
      return res.status(400).json({ error: "ID de l'entité requis" });
    }
    if(image!=undefined) // donc a bien une photo -> on la change
    {
      console.log("changement de pp");      
      const Mur = await ModelMur.getMurByEntiteId(id_entite);
      if (image.size > 1 * 1024 * 1024) {  // Limite de 1 Mo
        return res.status(400).json({ error: "La taille de l'image ne doit pas dépasser 1 Mo." });
      }

    const imageURL = await uploadPhoto(image);
    if (!imageURL) {
      return res.status(500).json({ error: "Échec du téléchargement de l'image." });
    }    
      await ModelMur.updatePhotoMur(imageURL,Mur.id_mur)
      await ModelMur.SupprimerImageBucket(Mur.photo_mur)
    }
   // pas de photo on change le reste


    const updates = {};
    if (libelle_entite !== undefined) updates.libellé_entité = libelle_entite;
    if (id_entite_1 !== undefined) updates.id_entité_1 = id_entite_1;
    const updated = await ModelEntite.updateEntite(id_entite, updates);

    if (updated.error) {
      return res.status(404).json(updated);
    }

    return res.status(200).json({
      message: "Entité mise à jour avec succès",
      entite: updated
    });
  } catch (err) {
    console.error('Erreur interne :', err.message);
    return res.status(500).json({ error: 'Erreur lors de la modif de l entité.' });
  }
};
exports.CreateEntite = async (req, res) => {
  try {
    const {libelle,id_entite_mere } = req.body;
    const image = req.file;
    // Vérification de la taille de l'image
     if (image.size > 1 * 1024 * 1024) {  // Limite de 1 Mo
      return res.status(400).json({ error: "La taille de l'image ne doit pas dépasser 1 Mo." });
    }
    // Upload de l'image sur Supabase
    const imageURL = await uploadPhoto(image);
    if (!imageURL) {
      return res.status(500).json({ error: "Échec du téléchargement de l'image." });
    }
    const nouveauMur = await ModelMur.ajouterMur(imageURL)
    if (!nouveauMur) {
      return res.status(500).json({ error: "Échec de la création du mur." });
    }
    const nouvelleEntite = await ModelEntite.createEntite(libelle,id_entite_mere,nouveauMur.id_mur)  
    return res.status(201).json({ message: "Entite créé avec succés", entite: nouvelleEntite });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


