require('dotenv').config();
const ModelPodometre = require('../Model/ModelPodometre');

exports.getClassementUtilisateurActuel = async (req, res) => {
  try {
    // Récupération de la date actuelle
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1); // Premier jour du mois
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1); // Dernier jour du mois
    
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
exports.getClassementUtilisateurHistorique = async (req, res) => {
  try {
    // Récupération du mois et de l'année depuis les paramètres de la requête (format MM/YYYY)
    const { mois, annee } = req.params; // Exemple : mois = '02', annee = '2025'

    // Validation de la date
    if (!mois || !annee || mois.length !== 2 || annee.length !== 4) {
      return res.status(400).json({ message: 'Le format du mois ou de l\'année est invalide. Utilisez MM/YYYY.' });
    }

    const startOfMonth = new Date(annee, mois - 1, 1); // Premier jour du mois spécifié
    const endOfMonth = new Date(annee, mois, 1); // Dernier jour du mois spécifié

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
exports.getClassementEntiteActuel = async (req, res) => {
  try {
    // Récupération de la date actuelle
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1); // Premier jour du mois
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1); // Dernier jour du mois
    
    // Récupération du classement depuis le modèle
    const classement = await ModelPodometre.getClassementMoisEnCoursEntite(startOfMonth, endOfMonth);

    if (!classement || classement.length === 0) {
      return res.status(404).json({ message: 'Aucun utilisateur trouvé pour le classement ce mois-ci.' });
    }

    return res.status(200).json({ message: 'Classement récupéré avec succès.', classement });
  } catch (err) {
    console.error('Erreur interne :', err.message);
    return res.status(500).json({ error: 'Erreur lors de la récupération du classement.' });
  }
};
exports.getClassementEntiteHistorique = async (req, res) => {
  try {
    // Récupération du mois et de l'année depuis les paramètres de la requête (format MM/YYYY)
    const { mois, annee } = req.params; // Exemple : mois = '02', annee = '2025'
    
    // Validation de la date
    if (!mois || !annee || mois.length !== 2 || annee.length !== 4) {
      return res.status(400).json({ message: 'Le format du mois ou de l\'année est invalide. Utilisez MM/YYYY.' });
    }

    const startOfMonth = new Date(annee, mois - 1, 1); // Premier jour du mois spécifié
    const endOfMonth = new Date(annee, mois, 1); // Dernier jour du mois spécifié

    // Récupération du classement depuis le modèle
    const classement = await ModelPodometre.getClassementMoisEnCoursEntite(startOfMonth, endOfMonth);

    if (!classement || classement.length === 0) {
      return res.status(404).json({ message: 'Aucun utilisateur trouvé pour le classement ce mois-ci.' });
    }

    return res.status(200).json({ message: 'Classement récupéré avec succès.', classement });
  } catch (err) {
    console.error('Erreur interne :', err.message);
    return res.status(500).json({ error: 'Erreur lors de la récupération du classement.' });
  }
};
exports.getClassementEntiteMereHistorique = async (req, res) => {
  try {
    // Récupération du mois et de l'année depuis les paramètres de la requête (format MM/YYYY)
    const { mois, annee } = req.params; // Exemple : mois = '02', annee = '2025'
    
    // Validation de la date
    if (!mois || !annee || mois.length !== 2 || annee.length !== 4) {
      return res.status(400).json({ message: 'Le format du mois ou de l\'année est invalide. Utilisez MM/YYYY.' });
    }

    const startOfMonth = new Date(annee, mois - 1, 1); // Premier jour du mois spécifié
    const endOfMonth = new Date(annee, mois, 1); // Dernier jour du mois spécifié

    // Récupération du classement depuis le modèle
    const classement = await ModelPodometre.getClassementMoisEnCoursEntiteMere(startOfMonth, endOfMonth);

    if (!classement || classement.length === 0) {
      return res.status(404).json({ message: 'Aucun utilisateur trouvé pour le classement ce mois-ci.' });
    }

    return res.status(200).json({ message: 'Classement récupéré avec succès.', classement });
  } catch (err) {
    console.error('Erreur interne :', err.message);
    return res.status(500).json({ error: 'Erreur lors de la récupération du classement.' });
  }
};
exports.getClassementEntiteMereActuel = async (req, res) => {
  try {
    // Récupération du mois et de l'année depuis les paramètres de la requête (format MM/YYYY)
    // Récupération de la date actuelle
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1); // Premier jour du mois
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1); // Dernier jour du mois
    // Récupération du classement depuis le modèle
    const classement = await ModelPodometre.getClassementMoisEnCoursEntiteMere(startOfMonth, endOfMonth);

    if (!classement || classement.length === 0) {
      return res.status(404).json({ message: 'Aucun utilisateur trouvé pour le classement ce mois-ci.' });
    }

    return res.status(200).json({ message: 'Classement récupéré avec succès.', classement });
  } catch (err) {
    console.error('Erreur interne :', err.message);
    return res.status(500).json({ error: 'Erreur lors de la récupération du classement.' });
  }
};