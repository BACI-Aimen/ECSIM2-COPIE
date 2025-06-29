const supabase = require('../config/supabase');

exports.getAllDebloqueByIdMur = async (id_mur) => {
    try {
      const { data, error } = await supabase
        .from('débloque')
        .select('id_badge')
        .eq('id_mur', id_mur); // Récupère le libellé de l'entité
  
      if (error) throw error;
  
      return data
    } catch (err) {
      throw new Error(`Erreur lors de la récupération des murs : ${err.message}`);
    }
  };
  // Vérifie si le badge est déjà attribué
exports.checkIfBadgeExists = async (id_mur, id_badge) => {
  const { data, error } = await supabase
    .from('débloque')
    .select('*')
    .eq('id_mur', id_mur)
    .eq('id_badge', id_badge)
    .maybeSingle();

  if (error) throw error;
  return !!data; // true si déjà attribué
};

// Attribue le badge
exports.debloquerBadge = async (id_mur, id_badge) => {
  const { data, error } = await supabase
    .from('débloque')
    .insert([{ id_mur, id_badge }])
    .select();

  if (error) throw error;
  return data[0];
};

exports.revoquerBadge = async (id_mur, id_badge) => {
  try {
    const { error } = await supabase
      .from('débloque')
      .delete()
      .match({ id_mur, id_badge });

    if (error) throw error;

    return { message: "Badge révoqué avec succès" };
  } catch (err) {
    throw new Error(`Erreur lors de la révocation du badge : ${err.message}`);
  }
};
exports.getBadgesByMur = async (id_mur) => {
  try {
    const { data, error } = await supabase
      .from('débloque')
      .select('id_badge, badge (nom_badge)')
      .eq('id_mur', id_mur);

    if (error) throw error;

    // Formater pour retourner un tableau propre
    const result = data.map(entry => ({
      id_badge: entry.id_badge,
      nom_badge: entry.badge?.nom_badge || null
    }));

    return result;
  } catch (err) {
    throw new Error(`Erreur lors de la récupération des badges débloqués : ${err.message}`);
  }
};