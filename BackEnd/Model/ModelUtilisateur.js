const supabase = require('../server').supabase;
exports.loginUser = async (login,password) => {
  try {

  } catch (err) {
    console.error("Erreur lors de la connexion:", err.message);  // Affichage de l'erreur dans la console
    throw new Error(err.message);  
  }
};


exports.loginAdmin = async (login,password) => {
  try {

  } catch (err) {
    console.error("Erreur lors de la connexion:", err.message);  // Affichage de l'erreur dans la console
    throw new Error(err.message);  
  }
};
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

