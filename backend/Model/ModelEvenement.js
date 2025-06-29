const supabase = require('../config/supabase');

exports.getLastEventByMur = async (id_mur) => {
    try {
        const { data, error } = await supabase
            .from('evenement')
            .select('id_evenement, id_badge') // Ajoutez ici les colonnes que vous voulez récupérer
            .eq('id_mur', id_mur)
            .order('created_at', { ascending: false }) // Trie par date décroissante
            .limit(1); // Ne prend que le dernier événement

        if (error) throw error;

        return data.length > 0 ? data[0] : null; // Retourne l'événement ou null si aucun trouvé
    } catch (err) {
        throw new Error(`Erreur lors de la récupération du dernier événement : ${err.message}`);
    }
};
exports.ajouterEvenement = async ({ id_mur, id_badge }) => {
  try {
    const { data, error } = await supabase
      .from('evenement')
      .insert([{ id_mur, id_badge }]);

    if (error) throw error;
    return data;
  } catch (err) {
    throw new Error(`Erreur lors de l'ajout d'un événement : ${err.message}`);
  }
};
