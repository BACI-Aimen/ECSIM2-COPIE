const supabase = require('../config/supabase')

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

exports.updateUtilisateurInscription = async (id_utilisateur, pseudo_utilisateur, mdp_utilisateur, id_mur) => {
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

exports.updateCompte = async ({updateFields,id_utilisateur }) => {
  try {
     // Vérifier si l'utilisateur existe
     const { data: existingUser, error: findError } = await supabase
     .from('utilisateur')
     .select('id_utilisateur')
     .eq('id_utilisateur', id_utilisateur)
     .single();

   if (findError || !existingUser) {
     throw new Error("Utilisateur non trouvé.");
   }
    // Mise à jour dans Supabase
    const { data, error } = await supabase
      .from('utilisateur')
      .update(updateFields)
      .eq('id_utilisateur', id_utilisateur)
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (err) {
    console.error('Erreur lors de la mise à jour du compte:', err.message);
    throw err;
  }
};


// Fonction pour récupérer un utilisateur par son ID
exports.getCompteUtilisateurById = async (id_utilisateur) => {
  try {
    if (!id_utilisateur) {
      throw new Error("L'ID utilisateur est requis");
    }

    // Récupération de l'utilisateur depuis la table "utilisateur"
    const { data, error } = await supabase
      .from('utilisateur')
      .select('pseudo_utilisateur, mail_utilisateur, id_entité(libellé_entité), isAdmin')
      .eq('id_utilisateur', id_utilisateur)
      .single(); // On veut un seul utilisateur

    if (error) throw error;

    return data; // Retourne l'utilisateur trouvé
  } catch (err) {
    console.error("Erreur lors de la récupération de l'utilisateur :", err.message);
    throw new Error(err.message);
  }
};


exports.getMonCompteUtilisateurById = async (id_utilisateur) => {
  try {
    if (!id_utilisateur) {
      throw new Error("L'ID utilisateur est requis");
    }

    // Première requête pour récupérer l'utilisateur et ses relations directes
    const { data: utilisateur, error: errorUtilisateur } = await supabase
      .from('utilisateur')
      .select('pseudo_utilisateur, id_entité(id_entité_1, libellé_entité), id_mur(photo_mur)')
      .eq('id_utilisateur', id_utilisateur)
      .single(); // Un seul utilisateur

    if (errorUtilisateur) throw errorUtilisateur;
    if (!utilisateur) return null;

    // Vérifier si id_entité existe et récupérer id_entité_1
    let libelle_entite_1 = null;
    if (utilisateur.id_entité) {
      const { data: entite, error: errorEntite } = await supabase
        .from('entité')
        .select('libellé_entité')
        .eq('id_entité', utilisateur.id_entité.id_entité_1) // Récupérer l'entité parent
        .single();

      if (errorEntite) throw errorEntite;
      libelle_entite_1 = entite?.libellé_entité || null;
    }
    else (console.log("id est vide"))

    // Construire l'objet final
    return {
      pseudo_utilisateur: utilisateur.pseudo_utilisateur,
      libellé_entité: utilisateur.id_entité?.libellé_entité || null,
      libellé_entité_1: libelle_entite_1, // Ajout de l'entité parent
      photo_mur: utilisateur.id_mur?.photo_mur || null
    };
  } catch (err) {
    console.error("Erreur lors de la récupération de l'utilisateur :", err.message);
    throw new Error(err.message);
  }
};

exports.getAllUtilisateurs = async () => {
  try {
    // Requête pour récupérer tous les utilisateurs avec le pseudo et l'id
    const { data, error } = await supabase
      .from('utilisateur')
      .select('id_utilisateur, pseudo_utilisateur'); // On récupère uniquement id et pseudo

    if (error) throw error;

    return data; // Retourne la liste des utilisateurs
  } catch (err) {
    console.error("Erreur lors de la récupération des utilisateurs :", err.message);
    throw new Error(err.message);
  }
};

exports.getIdMurByUserId = async (id_utilisateur) => {
  try {
    if (!id_utilisateur) {
      throw new Error("L'ID utilisateur est requis");
    }

    // Requête pour récupérer l'ID du mur associé à l'ID utilisateur
    const { data, error } = await supabase
      .from('utilisateur') // Table utilisateur
      .select('id_mur') // Sélectionner uniquement l'id_mur
      .eq('id_utilisateur', id_utilisateur) // Filtrer par ID utilisateur
      .single(); // On s'attend à un seul résultat

    if (error) throw error;

    // Vérifier si un mur a été trouvé
    if (!data || !data.id_mur) {
      throw new Error("Aucun mur associé à cet utilisateur");
    }

    return data.id_mur; // Retourner l'ID du mur
  } catch (err) {
    console.error("Erreur lors de la récupération de l'ID du mur :", err.message);
    throw new Error(err.message);
  }
};
exports.getEntiteEtEntiteMereById = async (id_utilisateur) => {
  try {
    if (!id_utilisateur) {
      throw new Error("L'ID utilisateur est requis");
    }

    const { data, error } = await supabase
    .from('utilisateur')
    .select('id_entité(id_entité,id_entité_1)')
    .eq('id_utilisateur', id_utilisateur)
    .single(); // Récupérer un seul utilisateur

  if (error) throw error;
  return data;
} catch (err) {
    console.error("Erreur lors de la récupération de l'ID du mur :", err.message);
    throw new Error(err.message);
  }
};

exports.getAllmurRecherche = async () => {
  try {
    // Requête pour récupérer tous les utilisateurs avec le pseudo et l'id
    const { data, error } = await supabase
      .from('utilisateur')
      .select('id_utilisateur, pseudo_utilisateur, id_mur') // On récupère uniquement id et pseudo
      .eq('isAdmin', "False");

    if (error) throw error;

    return data; // Retourne la liste des utilisateurs
  } catch (err) {
    console.error("Erreur lors de la récupération des utilisateurs :", err.message);
    throw new Error(err.message);
  }
};

exports.updatePseudoUtilisateur = async (id_utilisateur, nouveauPseudo) => {
  try {
    // Vérification que le pseudo n'est pas vide
    if (!nouveauPseudo || nouveauPseudo.trim().length === 0) {
      throw new Error("Le nouveau pseudo ne peut pas être vide");
    }

    // Mettre à jour le pseudo dans la base de données
    const { data, error } = await supabase
      .from('utilisateur')
      .update({ pseudo_utilisateur: nouveauPseudo })
      .eq('id_utilisateur', id_utilisateur) // Filtrer par ID utilisateur
      .select(); // Récupérer les nouvelles données (optionnel)

    if (error) throw error; // Si erreur Supabase

    if (!data || data.length === 0) {
      throw new Error("L'utilisateur n'a pas pu être trouvé ou mis à jour");
    }

    return data[0]; // Retourner l'utilisateur mis à jour
  } catch (err) {
    console.error("Erreur lors de la mise à jour du pseudo de l'utilisateur :", err.message);
    throw new Error(err.message);
  }
};

exports.updateMdpUtilisateur = async (id_utilisateur, hashedMdp) => {
  try {
    // Mettre à jour le mot de passe dans la base de données
    const { data, error } = await supabase
      .from('utilisateur')
      .update({ mdp_utilisateur: hashedMdp })
      .eq('id_utilisateur', id_utilisateur) // Filtrer par ID utilisateur
      .select(); // Récupérer les nouvelles données (optionnel)

    if (error) throw error; // Si erreur Supabase

    if (!data || data.length === 0) {
      throw new Error("L'utilisateur n'a pas pu être trouvé ou mis à jour");
    }

    return data[0]; // Retourner l'utilisateur mis à jour
  } catch (err) {
    console.error("Erreur lors de la mise à jour du mot de passe de l'utilisateur :", err.message);
    throw new Error(err.message);
  }
};

exports.getMdpUser = async (id_utilisateur) => {
  try {
    // Mettre à jour le mot de passe dans la base de données
    const { data, error } = await supabase
      .from('utilisateur')
      .select('mdp_utilisateur') // Récupérer les nouvelles données 
      .eq('id_utilisateur', id_utilisateur); // Filtrer par ID utilisateur
      
    if (error) throw error; // Si erreur Supabase

    if (!data || data.length === 0) {
      throw new Error("L'utilisateur n'a pas pu être trouvé");
    }

    const oldmdp = data[0].mdp_utilisateur;

    return oldmdp; 
  } catch (err) {
    console.error("Erreur lors de récupération de l'ancien mot de passe de l'utilisateur :", err.message);
    throw new Error(err.message);
  }
};

