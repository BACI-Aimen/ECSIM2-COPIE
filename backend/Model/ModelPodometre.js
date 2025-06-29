const supabase = require('../config/supabase')
exports.ajouterPodometre = async ({ nombrepas_podometre, id_utilisateur,T_EXPO_NOTIF }) => {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

      // 1. Mettre à jour T_EXPO_NOTIF si fourni
    if (T_EXPO_NOTIF) {
      const { error: notifUpdateError } = await supabase
        .from('utilisateur')
        .update({ T_EXPO_NOTIF })
        .eq('id_utilisateur', id_utilisateur);

      if (notifUpdateError) {
        throw new Error("Erreur lors de la mise à jour de T_EXPO_NOTIF : " + notifUpdateError.message);
      }
    }
    // Vérifier si une entrée existe pour aujourd'hui
    const { data: existingData, error: fetchError } = await supabase
      .from('podomètre_journalier')
      .select('*')
      .eq('id_utilisateur', id_utilisateur)
      .gte('created_at', todayStart.toISOString())
      .lte('created_at', todayEnd.toISOString())
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
exports.supprimerDonnees = async (id_utilisateur) => {
  try {
    const { error } = await supabase
      .from('podomètre_journalier')
      .delete()
      .eq('id_utilisateur', id_utilisateur);

    if (error) {
      throw error;
    }

    console.log(`Données supprimées pour l'utilisateur avec l'ID ${id_utilisateur}`);
  } catch (err) {
    console.error('Erreur lors de l\'exécution de la requête :', err.message);
  }
};
exports.getClassementMoisEnCours = async (startOfMonth, endOfMonth) => {
  try {
    const { data, error } = await supabase
      .from('podomètre_journalier')
      .select('id_utilisateur,utilisateur(pseudo_utilisateur,isAdmin), totalpas:nombrepas_podometre.sum()')
      .gte('created_at', startOfMonth.toISOString())
      .lte('created_at', endOfMonth.toISOString())
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
    //console.log("test");
    
    const { data, error } = await supabase
      .from('podomètre_journalier')
      .select('utilisateur(id_entité(libellé_entité)), totalpas:nombrepas_podometre.sum()')
      .gte('created_at', startOfMonth.toISOString())
      .lte('created_at', endOfMonth.toISOString())
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
      .gte('created_at', startOfMonth.toISOString())
      .lte('created_at', endOfMonth.toISOString())
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
      .gte('created_at', startOfMonth.toISOString())
      .lte('created_at', endOfMonth.toISOString())
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
      .gte('created_at', startOfMonth.toISOString())
      .lte('created_at', endOfMonth.toISOString())
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
exports.getAllPasByIdUtilisateur = async (id_utilisateur) => {
  try {
    const { data, error } = await supabase
      .from('podomètre_journalier')
      .select('created_at, nombrepas_podometre')
      .eq('id_utilisateur', id_utilisateur);

    if (error) throw error;

    return data
  } catch (err) {
    throw new Error(`Erreur lors de la récupération des pas : ${err.message}`);
  }
};
exports.verifierBadges = async (id_utilisateur,id_mur) => {
  // Récupérer tous les badges
  const { data: badges, error: errBadges } = await supabase
    .from('badge')
    .select('*');

  if (errBadges) throw new Error(`Erreur récupération badges : ${errBadges.message}`);

  const badgesDebloques = [];

  for (const badge of badges) {
    const { id_badge, nombre_badge, periodicite_debut_badge, periodicite_fin_badge } = badge;

    // Somme des pas dans la période
    const { data: pasData, error: errSum } = await supabase
      .from('podomètre_journalier')
      .select('nombrepas_podometre')
      .eq('id_utilisateur', id_utilisateur)
      .gte('created_at', periodicite_debut_badge)
      .lte('created_at', periodicite_fin_badge);

    if (errSum) throw new Error(`Erreur somme pas : ${errSum.message}`);

    // Calcul de la somme
    const pasTotal = pasData.reduce((acc, cur) => acc + cur.nombrepas_podometre, 0);

    if (pasTotal >= nombre_badge) {
      // Vérifier s'il a déjà débloqué ce badge
      const { data: dejaDebloque, error: errDebloque } = await supabase
        .from('débloque')
        .select('*')
        .eq('id_mur', id_mur)
        .eq('id_badge', id_badge)
        .single();

        
      if (errDebloque && errDebloque.code !== 'PGRST116') throw new Error(`Erreur vérif débloque : ${errDebloque.message}`);

      if (!dejaDebloque) {
        // Insérer dans débloque
        const { error: errInsert } = await supabase
          .from('débloque')
          .insert({
            id_mur,
            id_badge,
          });

        if (errInsert) throw new Error(`Erreur insertion débloque : ${errInsert.message}`);

        badgesDebloques.push(badge);
      }
    }
  }

  return badgesDebloques;
};


exports.verifierBadgesCollectifs = async (id_entite) => {
  try {
    // Récupérer tous les badges
    const { data: badges, error: errBadges } = await supabase
      .from('badge')
      .select('*');

    if (errBadges) throw new Error(`Erreur récupération badges : ${errBadges.message}`);

    const badgesDebloques = [];

    for (const badge of badges) {
      const { id_badge, nombre_badge, periodicite_debut_badge, periodicite_fin_badge } = badge;
      
        // Récupérer tous les utilisateurs de l'entité
        const { data: utilisateurs, error: errUsers } = await supabase
          .from('utilisateur')
          .select('id_utilisateur')
          .eq('id_entité', id_entite);

        if (errUsers) throw new Error(`Erreur récupération utilisateurs : ${errUsers.message}`);

        const ids = utilisateurs.map(u => u.id_utilisateur);

        if (ids.length === 0) continue;

        // Récupérer les pas de tous les utilisateurs dans la période
        const { data: pasData, error: errPas } = await supabase
          .from('podomètre_journalier')
          .select('nombrepas_podometre')
          .in('id_utilisateur', ids)
          .gte('created_at', periodicite_debut_badge)
          .lte('created_at', periodicite_fin_badge);

        if (errPas) throw new Error(`Erreur récupération pas : ${errPas.message}`);

        const total = pasData.reduce((acc, cur) => acc + cur.nombrepas_podometre, 0);
        if (total >= nombre_badge) {
          // Récupérer le mur de l'entité
          const { data: mur, error: errMur } = await supabase
            .from('entité')
            .select('id_mur')
            .eq('id_entité', id_entite)
            .single();

          if (errMur && errMur.code !== 'PGRST116') throw new Error(`Erreur récupération mur : ${errMur.message}`);
          if (!mur) continue;
          // Vérifier si déjà débloqué
          const { data: dejaDebloque, error: errDebloque } = await supabase
            .from('débloque')
            .select('*')
            .eq('id_mur', mur.id_mur)
            .eq('id_badge', id_badge)
            .single();

          if (errDebloque && errDebloque.code !== 'PGRST116') throw new Error(`Erreur vérif débloque : ${errDebloque.message}`);
 

          if (!dejaDebloque) {
            // Insérer dans débloque
            //console.log("insert pour entite ",mur.id_mur);
            //console.log("le badge : ",id_badge);
            
            
            const { error: errInsert } = await supabase
              .from('débloque')
              .insert({
                id_mur: mur.id_mur,
                id_badge,
              });

            if (errInsert) throw new Error(`Erreur insertion débloque : ${errInsert.message}`);

            badgesDebloques.push({ id_badge, id_mur: mur.id_mur });
          }
        }
      
    }

    return badgesDebloques;
  } catch (err) {
    console.error('Erreur vérification badge collectif :', err.message);
    throw err;
  }
};
exports.verifierBadgesCollectifsEntiteMere = async (id_entite_mere) => {
  try {
    const { data: badges, error: errBadges } = await supabase
      .from('badge')
      .select('*');

    if (errBadges) throw new Error(`Erreur récupération badges : ${errBadges.message}`);

    const badgesDebloques = [];

    // 1. Récupérer les entités filles de l'entité mère
    const { data: entitesFilles, error: errFilles } = await supabase
      .from('entité')
      .select('id_entité')
      .eq('id_entité_1', id_entite_mere);

    if (errFilles) throw new Error(`Erreur récupération entités filles : ${errFilles.message}`);

    const idsFilles = entitesFilles.map(e => e.id_entité);
    if (idsFilles.length === 0) return badgesDebloques; // Rien à faire

    // 2. Récupérer tous les utilisateurs de ces entités filles
    const { data: utilisateurs, error: errUsers } = await supabase
      .from('utilisateur')
      .select('id_utilisateur')
      .in('id_entité', idsFilles);

    if (errUsers) throw new Error(`Erreur récupération utilisateurs : ${errUsers.message}`);

    const idsUtilisateurs = utilisateurs.map(u => u.id_utilisateur);
    if (idsUtilisateurs.length === 0) return badgesDebloques;

    // 3. Parcourir chaque badge
    for (const badge of badges) {
      const { id_badge, nombre_badge, periodicite_debut_badge, periodicite_fin_badge } = badge;

      // 4. Récupérer les pas pour tous ces utilisateurs dans la période
      const { data: pasData, error: errPas } = await supabase
        .from('podomètre_journalier')
        .select('nombrepas_podometre')
        .in('id_utilisateur', idsUtilisateurs)
        .gte('created_at', periodicite_debut_badge)
        .lte('created_at', periodicite_fin_badge);

      if (errPas) throw new Error(`Erreur récupération pas : ${errPas.message}`);

      const total = pasData.reduce((acc, cur) => acc + cur.nombrepas_podometre, 0);
      //console.log("ENTITÉ MÈRE :", id_entite_mere, " - Total pas sur période :", total);

      if (total >= nombre_badge) {
        const { data: mur, error: errMur } = await supabase
          .from('entité')
          .select('id_mur')
          .eq('id_entité', id_entite_mere)
          .single();        
        if (errMur && errMur.code !== 'PGRST116') throw new Error(`Erreur récupération mur : ${errMur.message}`);
        if (!mur) continue;

        // 6. Vérifier si badge déjà débloqué
        const { data: dejaDebloque, error: errDebloque } = await supabase
          .from('débloque')
          .select('*')
          .eq('id_mur', mur.id_mur)
          .eq('id_badge', id_badge)
          .single();

        if (errDebloque && errDebloque.code !== 'PGRST116') throw new Error(`Erreur vérif débloque : ${errDebloque.message}`);

        // 7. Débloquer si pas encore fait
        if (!dejaDebloque) {
          const { error: errInsert } = await supabase
            .from('débloque')
            .insert({
              id_mur: mur.id_mur,
              id_badge,
            });

          if (errInsert) throw new Error(`Erreur insertion débloque : ${errInsert.message}`);

          badgesDebloques.push({ id_badge, id_mur: mur.id_mur });
        }
      }
    }

    return badgesDebloques;
  } catch (err) {
    console.error('Erreur vérification badge collectif (entité mère) :', err.message);
    throw err;
  }
};
//-----------------CRON---------------
exports.getClassementMoisEnCoursCron = async (startOfMonth, endOfMonth) => {
  try {
    const { data, error } = await supabase
      .from('podomètre_journalier')
      .select('id_utilisateur,utilisateur(pseudo_utilisateur,isAdmin,id_mur), totalpas:nombrepas_podometre.sum()')
      .gte('created_at', startOfMonth.toISOString())
      .lte('created_at', endOfMonth.toISOString())
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

exports.getClassementMoisEnCoursEntiteCron = async (startOfMonth, endOfMonth) => {
  try {
    //console.log("test");
    
    const { data, error } = await supabase
      .from('podomètre_journalier')
      .select('utilisateur(id_entité(libellé_entité,id_mur)), totalpas:nombrepas_podometre.sum()')
      .gte('created_at', startOfMonth.toISOString())
      .lte('created_at', endOfMonth.toISOString())
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
exports.getClassementMoisEnCoursEntiteMereCron = async (startOfMonth, endOfMonth) => {
  try {
    
    const { data, error } = await supabase
      .from('podomètre_journalier')
      .select('utilisateur(id_entité(id_entité_1(libellé_entité,id_mur))), totalpas:nombrepas_podometre.sum()')
      .gte('created_at', startOfMonth.toISOString())
      .lte('created_at', endOfMonth.toISOString())
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
exports.getMonClassementEntiteMereCron = async (startOfMonth, endOfMonth,entite_mere) => {
  try {
    const { data, error } = await supabase
      .from('podomètre_journalier')
      .select('id_utilisateur,utilisateur(pseudo_utilisateur,id_mur,id_entité(id_entité_1(libellé_entité)),isAdmin), totalpas:nombrepas_podometre.sum()')
      .gte('created_at', startOfMonth.toISOString())
      .lte('created_at', endOfMonth.toISOString())
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
exports.getMonClassementEntiteFilleCron = async (startOfMonth, endOfMonth,entite_fille) => {
  try {
    
    const { data, error } = await supabase
      .from('podomètre_journalier')
      .select('id_utilisateur,utilisateur(pseudo_utilisateur,id_entité(libellé_entité),isAdmin,id_mur), totalpas:nombrepas_podometre.sum()')
      .gte('created_at', startOfMonth.toISOString())
      .lte('created_at', endOfMonth.toISOString())
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