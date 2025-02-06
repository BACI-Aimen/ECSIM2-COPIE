require('dotenv').config();
const ModelPodometre = require('../Model/ModelPodometre');
const ModelUtilisateur = require('../Model/ModelUtilisateur');
const ModelMur = require('../Model/ModelMur')
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
exports.getMonClassementEntiteMereActuel = async (req, res) => {
  try {
    //id_entite = req.user.id_utilisateur
    les_entites = await ModelUtilisateur.getEntiteEtEntiteMereById(req.user.id_utilisateur)
    entite_fille=les_entites.id_entité.id_entité
    entite_mere=les_entites.id_entité.id_entité_1
    // console.log(entite_fille);
    // console.log(entite_mere);

    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1); // Premier jour du mois
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1); // Dernier jour du mois
    // Récupération du classement depuis le modèle
   // const classement = await ModelPodometre.getMonClassementEntiteMereActuel(startOfMonth, endOfMonth,entite_mere);
    const classement = await ModelPodometre.getMonClassementEntiteMere(startOfMonth, endOfMonth,entite_mere);

    if (!classement || classement.length === 0) {
      return res.status(404).json({ message: 'Aucun utilisateur trouvé pour le classement ce mois-ci.' });
    }

    return res.status(200).json({ message: 'Classement récupéré avec succès.', classement });
  } catch (err) {
    console.error('Erreur interne :', err.message);
    return res.status(500).json({ error: 'Erreur lors de la récupération du classement.' });
  }
};
exports.getMonClassementEntiteMereHistorique = async (req, res) => {
  try {
    //id_entite = req.user.id_utilisateur
    les_entites = await ModelUtilisateur.getEntiteEtEntiteMereById(req.user.id_utilisateur)
    entite_fille=les_entites.id_entité.id_entité
    entite_mere=les_entites.id_entité.id_entité_1
    // console.log(entite_fille);
    // console.log(entite_mere);

    // Récupération du mois et de l'année depuis les paramètres de la requête (format MM/YYYY)
    const { mois, annee } = req.params; // Exemple : mois = '02', annee = '2025'
    
    // Validation de la date
    if (!mois || !annee || mois.length !== 2 || annee.length !== 4) {
      return res.status(400).json({ message: 'Le format du mois ou de l\'année est invalide. Utilisez MM/YYYY.' });
    }

    const startOfMonth = new Date(annee, mois - 1, 1); // Premier jour du mois spécifié
    const endOfMonth = new Date(annee, mois, 1); // Dernier jour du mois spécifié
    const classement = await ModelPodometre.getMonClassementEntiteMere(startOfMonth, endOfMonth,entite_mere);

    if (!classement || classement.length === 0) {
      return res.status(404).json({ message: 'Aucun utilisateur trouvé pour le classement ce mois-ci.' });
    }

    return res.status(200).json({ message: 'Classement récupéré avec succès.', classement });
  } catch (err) {
    console.error('Erreur interne :', err.message);
    return res.status(500).json({ error: 'Erreur lors de la récupération du classement.' });
  }
};

exports.getMonClassementEntiteFilleActuel = async (req, res) => {
  try {
    //id_entite = req.user.id_utilisateur
    les_entites = await ModelUtilisateur.getEntiteEtEntiteMereById(req.user.id_utilisateur)
    entite_fille=les_entites.id_entité.id_entité
    entite_mere=les_entites.id_entité.id_entité_1
    // console.log(entite_fille);
    // console.log(entite_mere);

    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1); // Premier jour du mois
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1); // Dernier jour du mois
    // Récupération du classement depuis le modèle
   // const classement = await ModelPodometre.getMonClassementEntiteMereActuel(startOfMonth, endOfMonth,entite_mere);
    const classement = await ModelPodometre.getMonClassementEntiteFille(startOfMonth, endOfMonth,entite_fille);

    if (!classement || classement.length === 0) {
      return res.status(404).json({ message: 'Aucun utilisateur trouvé pour le classement ce mois-ci.' });
    }

    return res.status(200).json({ message: 'Classement récupéré avec succès.', classement });
  } catch (err) {
    console.error('Erreur interne :', err.message);
    return res.status(500).json({ error: 'Erreur lors de la récupération du classement.' });
  }
};
exports.getMonClassementEntiteFilleHistorique = async (req, res) => {
  try {
    //id_entite = req.user.id_utilisateur
    les_entites = await ModelUtilisateur.getEntiteEtEntiteMereById(req.user.id_utilisateur)
    entite_fille=les_entites.id_entité.id_entité
    entite_mere=les_entites.id_entité.id_entité_1
    // console.log(entite_fille);
    // console.log(entite_mere);

    // Récupération du mois et de l'année depuis les paramètres de la requête (format MM/YYYY)
    const { mois, annee } = req.params; // Exemple : mois = '02', annee = '2025'
    
    // Validation de la date
    if (!mois || !annee || mois.length !== 2 || annee.length !== 4) {
      return res.status(400).json({ message: 'Le format du mois ou de l\'année est invalide. Utilisez MM/YYYY.' });
    }

    const startOfMonth = new Date(annee, mois - 1, 1); // Premier jour du mois spécifié
    const endOfMonth = new Date(annee, mois, 1); // Dernier jour du mois spécifié
    const classement = await ModelPodometre.getMonClassementEntiteFille(startOfMonth, endOfMonth,entite_fille);

    if (!classement || classement.length === 0) {
      return res.status(404).json({ message: 'Aucun utilisateur trouvé pour le classement ce mois-ci.' });
    }

    return res.status(200).json({ message: 'Classement récupéré avec succès.', classement });
  } catch (err) {
    console.error('Erreur interne :', err.message);
    return res.status(500).json({ error: 'Erreur lors de la récupération du classement.' });
  }
};
//-----------------------POUR LE SCHEDULER---------------------//
exports.updateMedaille = async () => {
  const now = new Date();
  now.setMonth(now.getMonth() -1); // Décrémente d'un mois

  const mois = String(now.getMonth() + 1).padStart(2, '0'); // Ajoute un zéro devant si nécessaire
  const annee = now.getFullYear();
  const startOfMonth = new Date(annee, mois - 1, 1); // Premier jour du mois spécifié
  const endOfMonth = new Date(annee, mois, 1); // Dernier jour du mois spécifié
  //je dois le faire pour chaque entité (mere et fille)
  //const classement = await ModelPodometre.getMonClassementEntiteFille(startOfMonth, endOfMonth,entite_fille);

  //---------------------------------------Classement MC ------------------------------------//
  const classement = await ModelPodometre.getClassementMoisEnCoursCron(startOfMonth, endOfMonth);
  await ModelMur.incrementGold(classement[0].utilisateur.id_mur)
  await ModelMur.incrementSilver(classement[1].utilisateur.id_mur)
  await ModelMur.incrementBronze(classement[2].utilisateur.id_mur)

  console.log(`📢 Mois précédent : ${startOfMonth}/${endOfMonth}`);
};


