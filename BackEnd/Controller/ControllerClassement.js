require('dotenv').config();
const ModelPodometre = require('../Model/ModelPodometre');

exports.getClassementUtilisateurActuel = async (req, res) => {
  try {
    // Récupération de la date actuelle
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1); // Premier jour du mois
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0); // Dernier jour du mois

    // Récupération du classement depuis le modèle
    const classement = await ModelPodometre.getClassementMoisEnCours(startOfMonth, endOfMonth);

    if (!classement || classement.length === 0) {
      return res.status(404).json({ message: 'Aucun utilisateur trouvé pour le classement ce mois-ci.' });
    }

    return res.status(200).json({ message: 'Classement récupéré avec succès.', classement });
  } catch (err) {
    console.error('Erreur interne :', err.message);
    return res.status(500).json({ error: 'Erreur lors de la récupération du classement.' });
  }
};
