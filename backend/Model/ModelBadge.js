const supabase = require('../config/supabase');

exports.ajouterBadge = async (nom, description, nombre_badge, periodicite_debut_badge,periodicite_fin_badge,imageURL,hiden) => {
    try {

        const { data, error } = await supabase
            .from('badge')
            .insert([{
                nom_badge: nom,
                description_badge: description,
                nombre_badge,
                periodicite_debut_badge,
                periodicite_fin_badge,
                image_badge: imageURL,
                hiden
            }])
            .single();

        if (error) throw error;

        return data;
    } catch (err) {
        console.error("Erreur lors de l'ajout du badge :", err.message);
        throw new Error(err.message);
    }
};
exports.getAllBadges = async () => {
    try {
        const { data, error } = await supabase
            .from('badge')
            .select('*');

        if (error) throw error;
        
        return data;
    } catch (err) {
        console.error("Erreur lors de la récupération des badges :", err.message);
        throw new Error(err.message);
    }
};
exports.getAllBadgesVisible = async () => {
    try {
        const { data, error } = await supabase
            .from('badge')
            .select('*')
            .eq('hiden', false);

        if (error) throw error;
        
        return data;
    } catch (err) {
        console.error("Erreur lors de la récupération des badges :", err.message);
        throw new Error(err.message);
    }
};
exports.getBadge = async (id) => {
    try {
        const { data, error } = await supabase
            .from('badge')
            .select('*')
            .eq('id_badge', id)
            .single();
        if (error) throw error;
        
        return data;
    } catch (err) {
        console.error("Erreur lors de la récupération di badge :", err.message);
        throw new Error(err.message);
    }
};
exports.deleteBadge = async (id_badge) => {
    try {
      const { error } = await supabase
        .from('badge')
        .delete()
        .eq('id_badge', id_badge);
  
      if (error) throw error;
  
      return { message: "Badge supprimé avec succès" };
    } catch (err) {
      throw new Error(`Erreur lors de la suppression du badge : ${err.message}`);
    }
  };

  exports.updatePhotoBadge = async (photoURL,id_badge) => {
    try {
      const { error } = await supabase
      .from('badge')
      .update({ image_badge: photoURL })
      .eq('id_badge', id_badge);
      if (error) {
        throw new Error(error.message);
      }
  
      return null;  // Retourne le premier mur trouvé ou null s'il n'y en a pas
    } catch (err) {
      console.error("Erreur interne :", err.message);
      throw new Error(err.message);  // Retourne une erreur si quelque chose ne va pas
    }
  };

  exports.ModifierBadge = async (id, nom, description, nombre_pas, dateDebut, dateFin, hiden, imageURL = null) => {
    const fieldsToUpdate = {
      nom_badge:nom,
      description_badge:description,
      nombre_badge:nombre_pas,
      periodicite_debut_badge: dateDebut,
      periodicite_fin_badge: dateFin,
      hiden
    };
  
    // Ajouter l'image seulement si une nouvelle a été fournie
    if (imageURL) {
      fieldsToUpdate.image = imageURL;
    }
  
    const { data, error } = await supabase
      .from('badge')
      .update(fieldsToUpdate)
      .eq('id_badge', id)
      .select()
      .single();
  
    if (error) throw error;
  
    return data;
  };