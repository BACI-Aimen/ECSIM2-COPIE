require('dotenv').config();
const ModelDebloque = require('../Model/ModelDebloque');

exports.attribueBadge = async (req, res) => {
  try {
    const { id_mur, id_badge } = req.body;

    if (!id_mur || !id_badge) {
      return res.status(400).json({ error: "id_mur et id_badge sont requis" });
    }

    const existe = await ModelDebloque.checkIfBadgeExists(id_mur, id_badge);
    if (existe) {
      return res.status(200).json({
        warning: "Ce badge a déjà été attribué à cet utilisateur"
      });
    }

    const attribue = await ModelDebloque.debloquerBadge(id_mur, id_badge);
    return res.status(201).json({
      message: "Badge attribué avec succès",
      debloque: attribue
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.revoquerBadge = async (req, res) => {
  try {
    const { id_mur, id_badge } = req.body;

    if (!id_mur || !id_badge) {
      return res.status(400).json({ error: "id_mur et id_badge sont requis" });
    }

    const result = await ModelDebloque.revoquerBadge(id_mur, id_badge);

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getBadgesByMur = async (req, res) => {
  try {
    const { id_mur } = req.params;

    if (!id_mur) {
      return res.status(400).json({ error: "id_mur requis" });
    }

    const badges = await ModelDebloque.getBadgesByMur(id_mur);

    return res.status(200).json(badges);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};