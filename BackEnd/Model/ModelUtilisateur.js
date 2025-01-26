const supabase = require('../server').supabase;
//Imo uselesse je vériferais plus tard
// exports.loginUser = async (login,password) => {
//   try {

//   } catch (err) {
//     console.error("Erreur lors de la connexion:", err.message);  // Affichage de l'erreur dans la console
//     throw new Error(err.message);  
//   }
// };


// exports.loginAdmin = async (login,password) => {
//   try {

//   } catch (err) {
//     console.error("Erreur lors de la connexion:", err.message);  // Affichage de l'erreur dans la console
//     throw new Error(err.message);  
//   }
// };
exports.creerUtilisateur = async ({mail_utilisateur,mdp_utilisateur, id_entité,role }) => {
  try {
    console.log('model',mdp_utilisateur);
    isAdmin = role
    const { data, error } = await supabase
      .from('utilisateur')
      .insert([
        {
          mail_utilisateur,
          mdp_utilisateur,
          id_entité,
          isAdmin,
        },
      ])
      .select(); // Récupérer les données insérées

    if (error) throw error;

    return data[0]; // Retourne le premier utilisateur créé
  } catch (err) {
    console.error("Erreur lors de la création de l'utilisateur :", err.message);
    throw new Error(err.message);
  }
};
exports.trouverParEmail = async (email) => {
  try {
    const { data, error } = await supabase
      .from('utilisateur')
      .select('*')
      .eq('mail_utilisateur', email)
      .single();

    if (error && error.code !== 'PGRST116') {
      // Code PGRST116 signifie "row not found", ce qui est une réponse acceptable ici
      throw new Error(error.message);
    }

    return data; // Retourne l'utilisateur si trouvé, sinon null
  } catch (err) {
    console.error("Erreur lors de la vérification de l'email :", err.message);
    throw new Error("Impossible de vérifier l'email.");
  }
};

exports.updateUtilisateur = async (id_utilisateur, pseudo_utilisateur, mdp_utilisateur, id_mur) => {
  try {
    const { data, error } = await supabase
      .from('utilisateur')  // Nom de la table
      .update({
        pseudo_utilisateur,
        mdp_utilisateur,
        id_mur, 
      })
      .eq('id_utilisateur', id_utilisateur);  // Filtrer par l'ID de l'utilisateur

    if (error) {
      throw new Error(error.message);
    }

    // Retourner les nouvelles informations de l'utilisateur après la mise à jour
    return data; 
  } catch (err) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur:', err.message);
    throw err;
  }
};