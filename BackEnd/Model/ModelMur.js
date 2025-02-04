const supabase = require('../server').supabase;
exports.ajouterMur = async (photo_mur) => {
  try {
    // Insertion du mur dans la table 'mur' avec des valeurs par défaut
    const { data, error } = await supabase
      .from('mur')
      .insert([{ gold_mur: 0, silver_mur: 0, bronze_mur: 0, photo_mur: photo_mur }])  // Assurez-vous que la colonne est bien 'photo_mur_url'
      .select();  // Utiliser .select() pour récupérer les données insérées

    // Vérification des erreurs
    if (error) {
      throw new Error(error.message);  // Si une erreur survient, on la renvoie
    }    
    return data[0];  // Retourne le premier objet (qui est l'objet mur créé) 
  } catch (err) {
    console.error("Erreur lors de l'ajout du mur:", err.message);  // Affichage de l'erreur dans la console
    throw new Error(err.message);  // Retourne une erreur si un problème survient
  }
};


// Récupérer un mur
exports.recupererMur = async (id_mur) => {
  try {
    // Appel à la base de données pour récupérer le mur par son ID
    const { data, error } = await supabase
      .from('mur')  // Remplacez 'mur' par le nom de votre table
      .select('*')
      .eq('id_mur', id_mur)  // Assurez-vous que 'id_mur' est la colonne d'ID dans votre base de données

    if (error) {
      throw new Error(error.message);
    }

    return data[0] || null;  // Retourne le premier mur trouvé ou null s'il n'y en a pas
  } catch (err) {
    console.error("Erreur interne :", err.message);
    throw new Error(err.message);  // Retourne une erreur si quelque chose ne va pas
  }
};

exports.SupprimerMurById = async (id_mur) => {
  try {
    if (!id_mur) {
      throw new Error("L'ID du mur est requis");
    }

    // Requête pour supprimer le mur par son ID
    const { data, error } = await supabase
      .from('mur') // Assure-toi que c'est bien le nom de ta table
      .delete()
      .eq('id_mur', id_mur); // Condition de suppression basée sur l'ID

    if (error) throw error;

    return { message: "Mur supprimé avec succès" };
  } catch (err) {
    console.error("Erreur lors de la suppression du mur :", err.message);
    throw new Error(err.message);
  }
};