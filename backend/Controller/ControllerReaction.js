require('dotenv').config();
const ModelReaction = require('../Model/ModelReaction');
const ModelReagit = require('../Model/ModelReagit');
const ModelMur = require('../Model/ModelMur')

const uploadPhoto = require('../helper/upload-photo');
exports.creerReaction = async (req, res) => {
  try {
    const { nom_reaction, texte_reaction } = req.body;
    const image = req.file;

    // Vérification : nom_reaction est obligatoire
    if (!nom_reaction) {
      return res.status(400).json({ error: "Le champ nom_reaction est obligatoire." });
    }

    // Vérifier qu'au moins un contenu est présent (texte ou image)
    if (!texte_reaction && !image) {
      return res.status(400).json({ error: "Veuillez fournir un texte_reaction ou une image." });
    }

    let imageURL = null;

    if (image) {
      // Vérification de la taille de l'image (max 1 Mo)
      if (image.size > 1 * 1024 * 1024) {
        return res.status(400).json({ error: "La taille de l'image ne doit pas dépasser 1 Mo." });
      }

      // Upload de l'image sur Supabase
      imageURL = await uploadPhoto(image);

      if (!imageURL) {
        return res.status(500).json({ error: "Échec du téléchargement de l'image." });
      }
    }

    // Appel au modèle pour insérer la réaction
    const nouvelleReaction = await ModelReaction.creerReaction({
      nom_reaction,
      texte_reaction: texte_reaction || null,
      image_reaction_url: imageURL
    });

    return res.status(201).json(nouvelleReaction);
  } catch (err) {
    console.error("Erreur dans le contrôleur de création de réaction :", err.message);
    return res.status(500).json({ error: "Erreur interne lors de la création de la réaction." });
  }
};
exports.getReactions = async (req, res) => {
  try {
    const reactions = await ModelReaction.getAllReactions();
    return res.status(200).json(reactions);
  } catch (err) {
    console.error("Erreur dans le contrôleur de récupération des réactions :", err.message);
    return res.status(500).json({ error: "Erreur interne lors de la récupération des réactions." });
  }
};
exports.getReactionById = async (req, res) => {
  try {
    const { id } = req.params;
     if (!id) {
      return res.status(400).json({ error: "ID est requis." });
    }
    const reaction = await ModelReaction.getReactionById(id);

    if (!reaction) {
      return res.status(404).json({ error: "Réaction non trouvée." });
    }

    return res.status(200).json(reaction);
  } catch (err) {
    console.error("Erreur dans le contrôleur de récupération d'une réaction :", err.message);
    return res.status(500).json({ error: "Erreur interne lors de la récupération de la réaction." });
  }
};
exports.deleteReaction = async (req, res) => {
  try {
    const { id } = req.params;
 if (!id) {
      return res.status(400).json({ error: "ID du badge requis pour la modification." });
    }
    await ModelReaction.deleteReactionById(id);

    return res.status(200).json({ message: "Réaction supprimée avec succès." });
  } catch (err) {
    console.error("Erreur dans le contrôleur de suppression de la réaction :", err.message);
    return res.status(500).json({ error: "Erreur interne lors de la suppression de la réaction." });
  }
};
exports.updateReaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom_reaction, texte_reaction } = req.body;
    const image = req.file;

    // Charger la réaction actuelle
    const current = await ModelReaction.getReactionById(id);
    if (!current) {
      return res.status(404).json({ error: "Réaction non trouvée." });
    }

    const fieldsToUpdate = {};

    if (nom_reaction) fieldsToUpdate.nom_reaction = nom_reaction;

    if (texte_reaction) {
      fieldsToUpdate.texte_reaction = texte_reaction;
      fieldsToUpdate.image_reaction = null;
      
      // (Optionnel) Supprimer l'ancienne image de Supabase si elle existe
      if (current.image_reaction) {
        await ModelMur.SupprimerImageBucket(current.image_reaction)
      }

    } else if (image) {
      if (image.size > 1 * 1024 * 1024) {
        return res.status(400).json({ error: "La taille de l'image ne doit pas dépasser 1 Mo." });
      }

      const imageURL = await uploadPhoto(image);
      if (!imageURL) {
        return res.status(500).json({ error: "Échec du téléchargement de l'image." });
      }

      fieldsToUpdate.image_reaction = imageURL;
      fieldsToUpdate.texte_reaction = null;
    }

    if (
      Object.keys(fieldsToUpdate).length === 0 ||
      (!fieldsToUpdate.texte_reaction && !fieldsToUpdate.image_reaction && !fieldsToUpdate.nom_reaction)
    ) {
      return res.status(400).json({ error: "Aucune donnée valide à mettre à jour." });
    }

    const updatedReaction = await ModelReaction.updateReactionById(id, fieldsToUpdate);

    return res.status(200).json(updatedReaction);
  } catch (err) {
    console.error("Erreur dans le contrôleur de mise à jour de la réaction :", err.message);
    return res.status(500).json({ error: "Erreur interne lors de la mise à jour de la réaction." });
  }
};

exports.getReactByEvent = async (req, res) => {
  try {
     const { id } = req.params;
     if (!id) {
      return res.status(400).json({ error: "ID est requis." });
    }
    const reactions = await ModelReagit.getReactByEvent(id);
    return res.status(200).json(reactions);
  } catch (err) {
    console.error("Erreur dans le contrôleur de récupération des réactions :", err.message);
    return res.status(500).json({ error: "Erreur interne lors de la récupération des réactions." });
  }
};
exports.posterReaction = async (req, res) => {
  try {
    const { id_reaction, id_evenement } = req.body;

    // Récupération de l'utilisateur via le token
    const id_utilisateur = req.user.id_utilisateur;

    if (!id_utilisateur) {
      return res.status(401).json({ error: "Utilisateur non authentifié." });
    }

    if (!id_reaction || !id_evenement) {
      return res.status(400).json({ error: "Les champs id_reaction et id_evenement sont obligatoires." });
    }

    // Vérifier si l'utilisateur a déjà réagi à cet événement
    const dejaReagit = await ModelReagit.checkReactionExist(id_utilisateur, id_evenement);
    if (dejaReagit) {
      return res.status(409).json({ error: "Vous avez déjà réagi à cet événement." });
    }

    // Insérer la réaction
    const reactionCreee = await ModelReagit.posterReaction({
      id_utilisateur,
      id_reaction,
      id_evenement,
    });

    return res.status(201).json(reactionCreee);
  } catch (err) {
    console.error("Erreur dans le contrôleur posterReaction :", err.message);
    return res.status(500).json({ error: "Erreur interne lors de l'ajout de la réaction." });
  }
};