const supabase = require('../config/supabase')
exports.ajouterPodometre = async ({ nombrepas_podometre, id_utilisateur }) => {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    // Vérifier si une entrée existe pour aujourd'hui
    const { data: existingData, error: fetchError } = await supabase
      .from('podomètre_journalier')
      .select('*')
      .eq('id_utilisateur', id_utilisateur)
      .gte('created_at_podometre', todayStart.toISOString())
      .lte('created_at_podometre', todayEnd.toISOString())
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw new Error("Erreur lors de la vérification des données existantes : " + fetchError.message);
    }

    if (existingData) {
      // Mettre à jour l'enregistrement existant
      const { data: updatedData, error: updateError } = await supabase
        .from('podomètre_journalier')
        .update({ nombrepas_podometre })
        .eq('id_podometre', existingData.id_podometre)
        .select();

      if (updateError) {
        throw new Error("Erreur lors de la mise à jour des données du podomètre : " + updateError.message);
      }

      return updatedData[0]; // Retourner les données mises à jour
    } else {
      // Créer une nouvelle entrée
      const { data: newData, error: insertError } = await supabase
        .from('podomètre_journalier')
        .insert([{ nombrepas_podometre, id_utilisateur }])
        .select();

      if (insertError) {
        throw new Error("Erreur lors de l'ajout des données du podomètre : " + insertError.message);
      }

      return newData[0]; // Retourner les données insérées
    }
  } catch (err) {
    console.error("Erreur interne dans le modèle Podomètre :", err.message);
    throw new Error("Erreur interne dans le modèle Podomètre.");
  }
};
exports.getClassementMoisEnCours = async (startOfMonth, endOfMonth) => {
  try {
    const { data, error } = await supabase
      .from('podomètre_journalier')
      .select('id_utilisateur,utilisateur(pseudo_utilisateur,isAdmin), totalpas:nombrepas_podometre.sum()')
      .gte('created_at_podometre', startOfMonth.toISOString())
      .lte('created_at_podometre', endOfMonth.toISOString())
      .eq('utilisateur.isAdmin', false) // Filtrer les utilisateurs non-admin
        
    if (error) {
      console.error('Erreur lors de l\'agrégation :', error.message);
      throw error;
    } else {
      const classementTrie = data.filter(item => item.utilisateur !== null);
      const classementTrie2 = classementTrie.sort((a, b) => b.totalpas - a.totalpas);      
      return classementTrie2;
    }
  } catch (err) {
    console.error('Erreur lors de l\'exécution de la requête :', err.message);
  }
  
};
exports.getClassementMoisEnCoursEntite = async (startOfMonth, endOfMonth) => {
  try {
    console.log("test");
    
    const { data, error } = await supabase
      .from('podomètre_journalier')
      .select('utilisateur(id_entité(libellé_entité)), totalpas:nombrepas_podometre.sum()')
      .gte('created_at_podometre', startOfMonth.toISOString())
      .lte('created_at_podometre', endOfMonth.toISOString())
      .eq('utilisateur.isAdmin', false) // Filtrer les utilisateurs non-admin
        
    if (error) {
      console.error('Erreur lors de l\'agrégation :', error.message);
      throw error;
    } else {
      const classementTrie = data.filter(item => item.utilisateur !== null);
      const classementTrie2 = classementTrie.sort((a, b) => b.totalpas - a.totalpas);      
      return classementTrie2;
    }
  } catch (err) {
    console.error('Erreur lors de l\'exécution de la requête :', err.message);
  }
  
};
exports.getClassementMoisEnCoursEntiteMere = async (startOfMonth, endOfMonth) => {
  try {
    
    const { data, error } = await supabase
      .from('podomètre_journalier')
      .select('utilisateur(id_entité(id_entité_1(libellé_entité))), totalpas:nombrepas_podometre.sum()')
      .gte('created_at_podometre', startOfMonth.toISOString())
      .lte('created_at_podometre', endOfMonth.toISOString())
      .eq('utilisateur.isAdmin', false) // Filtrer les utilisateurs non-admin
        
    if (error) {
      console.error('Erreur lors de l\'agrégation :', error.message);
      throw error;
    } else {
      const classementTrie = data.filter(item => item.utilisateur !== null);
      const classementTrie2 = classementTrie.sort((a, b) => b.totalpas - a.totalpas);      
      return classementTrie2;
    }
  } catch (err) {
    console.error('Erreur lors de l\'exécution de la requête :', err.message);
  }
  
};
exports.getMonClassementEntiteMere = async (startOfMonth, endOfMonth,entite_mere) => {
  try {
    
    const { data, error } = await supabase
      .from('podomètre_journalier')
      .select('id_utilisateur,utilisateur(pseudo_utilisateur,id_entité(id_entité_1(libellé_entité)),isAdmin), totalpas:nombrepas_podometre.sum()')
      .gte('created_at_podometre', startOfMonth.toISOString())
      .lte('created_at_podometre', endOfMonth.toISOString())
      .eq('utilisateur.id_entité.id_entité_1', entite_mere)
        
    if (error) {
      console.error('Erreur lors de l\'agrégation :', error.message);
      throw error;
    } else {
      const classementTrie = data.filter(item => item.utilisateur.id_entité !== null);
      const classementTrie2 = classementTrie.sort((a, b) => b.totalpas - a.totalpas);     
      return classementTrie2;
    }
  } catch (err) {
    console.error('Erreur lors de l\'exécution de la requête :', err.message);
  }
  
};
exports.getMonClassementEntiteFille = async (startOfMonth, endOfMonth,entite_fille) => {
  try {
    
    const { data, error } = await supabase
      .from('podomètre_journalier')
      .select('id_utilisateur,utilisateur(pseudo_utilisateur,id_entité(libellé_entité),isAdmin), totalpas:nombrepas_podometre.sum()')
      .gte('created_at_podometre', startOfMonth.toISOString())
      .lte('created_at_podometre', endOfMonth.toISOString())
      .eq('utilisateur.id_entité.id_entité', entite_fille)
        
    if (error) {
      console.error('Erreur lors de l\'agrégation :', error.message);
      throw error;
    } else {
      const classementTrie = data.filter(item => item.utilisateur.id_entité !== null);
      const classementTrie2 = classementTrie.sort((a, b) => b.totalpas - a.totalpas);     
      return classementTrie2;
    }
  } catch (err) {
    console.error('Erreur lors de l\'exécution de la requête :', err.message);
  }
  
};
//-------------------------Fonctions du Scheduler-----------------------------------
exports.getClassementMoisEnCoursCron = async (startOfMonth, endOfMonth) => {
  try {
    const { data, error } = await supabase
      .from('podomètre_journalier')
      .select('id_utilisateur,utilisateur(pseudo_utilisateur,isAdmin,id_mur), totalpas:nombrepas_podometre.sum()')
      .gte('created_at_podometre', startOfMonth.toISOString())
      .lte('created_at_podometre', endOfMonth.toISOString())
      .eq('utilisateur.isAdmin', false) // Filtrer les utilisateurs non-admin
        
    if (error) {
      console.error('Erreur lors de l\'agrégation :', error.message);
      throw error;
    } else {
      const classementTrie = data.filter(item => item.utilisateur !== null);
      const classementTrie2 = classementTrie.sort((a, b) => b.totalpas - a.totalpas);      
      return classementTrie2;
    }
  } catch (err) {
    console.error('Erreur lors de l\'exécution de la requête :', err.message);
  }
  
};