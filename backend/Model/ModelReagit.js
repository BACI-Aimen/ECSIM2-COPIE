const supabase = require('../config/supabase');

exports.get2LastReactByEvent = async (id_evenement) => {
    try {
        const { data, error } = await supabase
            .from('réagit')
            .select('id_utilisateur, id_reaction(nom_reaction,texte_reaction,image_reaction)') // Ajoutez ici les colonnes que vous voulez récupérer
            .eq('id_evenement', id_evenement)
            .order('created_at', { ascending: false }) // Trie par date décroissante
            .limit(2); // Ne prend que le dernier événement

        if (error) throw error;

        return data.length > 0 ? data : []; // Retourne bien les 2 dernières réactions
    } catch (err) {
        throw new Error(`Erreur lors de la récupération du dernier événement : ${err.message}`);
    }
};
exports.getReactByEvent = async (id_evenement) => {
    try {
        const { data, error } = await supabase
            .from('réagit')
            .select('id_utilisateur(pseudo_utilisateur,id_mur(photo_mur)), id_reaction(nom_reaction,texte_reaction,image_reaction)') // Ajoutez ici les colonnes que vous voulez récupérer
            .eq('id_evenement', id_evenement)
            .order('created_at', { ascending: false }) // Trie par date décroissante

        if (error) throw error;

        return data.length > 0 ? data : []; // Retourne bien les 2 dernières réactions
    } catch (err) {
        throw new Error(`Erreur lors de la récupération du dernier événement : ${err.message}`);
    }
};
exports.posterReaction = async ({ id_utilisateur, id_reaction, id_evenement }) => {
  try {
    const { data, error } = await supabase
      .from('réagit')
      .insert([{ id_utilisateur, id_reaction, id_evenement }])
      .select();

    if (error) {
      throw new Error("Erreur lors de l'insertion dans la table reagit : " + error.message);
    }

    return data[0];
  } catch (err) {
    console.error("Erreur dans le modèle posterReaction :", err.message);
    throw err;
  }
};
exports.checkReactionExist = async (id_utilisateur, id_evenement) => {
  try {
    const { data, error } = await supabase
      .from('réagit')
      .select('id_reaction')
      .eq('id_utilisateur', id_utilisateur)
      .eq('id_evenement', id_evenement);

    if (error) {
      throw new Error("Erreur lors de la vérification d'une réaction existante : " + error.message);
    }

    return data.length > 0;
  } catch (err) {
    console.error("Erreur dans checkReactionExist :", err.message);
    throw err;
  }
};

