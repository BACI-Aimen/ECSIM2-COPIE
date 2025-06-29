const supabase = require('../config/supabase')

exports.creerReaction = async ({ nom_reaction, texte_reaction, image_reaction_url }) => {
  const { data, error } = await supabase
    .from('réaction')
    .insert([{ nom_reaction, texte_reaction, image_reaction: image_reaction_url }])
    .select();

  if (error) {
    throw new Error("Erreur lors de la création de la réaction : " + error.message);
  }

  return data[0]; // Retourne la réaction insérée
};
exports.getAllReactions = async () => {
  const { data, error } = await supabase
    .from('réaction')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error("Erreur lors de la récupération des réactions : " + error.message);
  }

  return data;
};
exports.getReactionById = async (id_reaction) => {
  const { data, error } = await supabase
    .from('réaction')
    .select('*')
    .eq('id_reaction', id_reaction)
    .single();

  if (error) {
    throw new Error("Erreur lors de la récupération de la réaction : " + error.message);
  }

  return data;
};
exports.deleteReactionById = async (id_reaction) => {
  const { error } = await supabase
    .from('réaction')
    .delete()
    .eq('id_reaction', id_reaction);

  if (error) {
    throw new Error("Erreur lors de la suppression de la réaction : " + error.message);
  }

  return true;
};

exports.updateReactionById = async (id_reaction, fieldsToUpdate) => {
    console.log(fieldsToUpdate);
    
  const { data, error } = await supabase
    .from('réaction')
    .update(fieldsToUpdate)
    .eq('id_reaction', id_reaction)
    .select();

  if (error) {
    throw new Error("Erreur lors de la mise à jour de la réaction : " + error.message);
  }
  return data[0];
};
