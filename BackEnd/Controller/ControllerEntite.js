require('dotenv').config();
const ModelEntite = require('../Model/ModelEntite');
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
