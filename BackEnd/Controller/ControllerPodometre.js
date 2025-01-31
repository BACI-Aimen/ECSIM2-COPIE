require('dotenv').config();
const ModelPodometre = require('../Model/ModelPodometre');


exports.ajouterPodometre = async (req, res) => {
  try {
    const { nombrePas } = req.body;
    if (!nombrePas) {
      return res.status(400).json({ error: 'Le nombre de pas est requis.' });
    }

    const id_utilisateur = req.user.id_utilisateur; // Récupéré via le middleware
    const podometre = await ModelPodometre.ajouterPodometre({
      nombrepas_podometre: nombrePas,
      id_utilisateur,
    });

    if (!podometre) {
      return res.status(500).json({ error: 'Erreur lors de l\'ajout des données du podomètre.' });
    }

    return res.status(201).json({ message: 'Données du podomètre ajoutées avec succès.', podometre });
  } catch (err) {
    console.error("Erreur interne :", err.message);
    return res.status(500).json({ error: 'Erreur lors de l\'ajout des données du podomètre.' });
  }
};