const supabase = require('../config/supabase')

exports.getEntitemurRecherche = async () => {
    try {
      // Requête pour récupérer tous les utilisateurs avec le pseudo et l'id
      const { data, error } = await supabase
        .from('entité')
        .select('id_entité, libellé_entité, id_mur') // On récupère uniquement id et pseudo
  
      if (error) throw error;
  
      return data; // Retourne la liste des utilisateurs
    } catch (err) {
      console.error("Erreur lors de la récupération des utilisateurs :", err.message);
      throw new Error(err.message);
    }
  };