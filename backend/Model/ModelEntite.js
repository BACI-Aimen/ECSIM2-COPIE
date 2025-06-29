const supabase = require('../config/supabase')
const ModelMur = require('../Model/ModelMur');


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
  exports.getAllentiteMere = async () => {
    try {
        const { data, error } = await supabase
            .from('entité')
            .select('id_entité, libellé_entité')
            .is('id_entité_1', null);

        if (error) throw error;

        return data;
    } catch (err) {
        console.error("Erreur lors de la récupération des entités filles :", err.message);
        throw new Error(err.message);
    }
};
exports.getAllentiteFilles = async () => {
  try {
      const { data, error } = await supabase
          .from('entité')
          .select('id_entité, libellé_entité')
          .not('id_entité_1', 'is', null);

      if (error) throw error;

      return data;
  } catch (err) {
      console.error("Erreur lors de la récupération des entités filles :", err.message);
      throw new Error(err.message);
  }
};
exports.getUneEntite = async (id_entité) => {
  try {
      const { data, error } = await supabase
          .from('entité')
          .select('id_entité, libellé_entité,id_mur(photo_mur),id_entité_1(id_entité,libellé_entité)')
          .eq('id_entité', id_entité);

      if (error) throw error;

      return data;
  } catch (err) {
      console.error("Erreur lors de la récupération des entités filles :", err.message);
      throw new Error(err.message);
  }
};
exports.getAllEntites = async () => {
  try {
    const { data, error } = await supabase
      .from('entité') // Nom de la table
      .select('id_entité, libellé_entité'); // Récupère uniquement l'ID et le libellé

    if (error) throw error;

    return data;
  } catch (err) {
    throw new Error(`Erreur lors de la récupération des entités : ${err.message}`);
  }
};

exports.getMursByIdEntite = async (id_entité) => {
  try {
    const { data, error } = await supabase
      .from('entité') // Nom de la table des murs
      .select('id_mur')
      .eq('id_entité', id_entité); // Récupère tous les murs liés à l'entité donnée

    if (error) throw error;

    return data.map(mur => mur.id_mur); // Renvoie une liste des ID de murs
  } catch (err) {
    throw new Error(`Erreur lors de la récupération des murs : ${err.message}`);
  }
};
exports.deleteEntiteById = async (id_entité) => {
  try {

    // 1️⃣ Vérifier si l'entité existe
    const existe = await exports.entiteExists(id_entité);
    console.log(existe)
    if (!existe) {
      return { error: "L'entité avec cet ID n'existe pas" };
    }

    // 1️⃣ Récupérer toutes les entités filles
    const { data: entites_filles, error: errEntites } = await supabase
      .from('entité')
      .select('id_entité')
      .eq('id_entité_1', id_entité); // Supposons que id_parent stocke l'ID de l'entité mère

    if (errEntites) throw errEntites;

    const ids_entites_filles = entites_filles.map(e => e.id_entité);
    ids_entites_filles.push(id_entité); // Inclure aussi l'entité mère

    // 2️⃣ Récupérer et supprimer les murs associés à ces entités
    let all_murs = [];
    for (const id of ids_entites_filles) {
      const murs = await exports.getMursByIdEntite(id);
      all_murs = all_murs.concat(murs);
    }

    // ✅ Récupérer les photos des murs avant suppression
    const photos = await ModelMur.getPhotosByMurIds(all_murs);

    // ✅ Supprimer les images du bucket
    for (const url of photos) {
      await ModelMur.SupprimerImageBucket(url); // 🔥 Appel de la méthode existante
    }

    await ModelMur.deleteMursByIds(all_murs);

    // 3️⃣ Supprimer les entités (mère + filles)
    /*const { error } = await supabase
      .from('entite')
      .delete()
      .in('id_entité', ids_entites_filles);

    if (error) throw error;*/

    return { message: "Entité et murs associés supprimés avec succès" };
  } catch (err) {
    throw new Error(`Erreur lors de la suppression : ${err.message}`);
  }
};
exports.entiteExists = async (id_entité) => {
  try {
    const { data, error } = await supabase
      .from('entité')
      .select('id_entité')
      .eq('id_entité', id_entité)
      .maybeSingle(); // On récupère une seule ligne
    if (error) throw error;

    return !!data; // Renvoie true si l'entité existe, sinon false
  } catch (err) {
    throw new Error(`Erreur lors de la vérification de l'entité : ${err.message}`);
  }
};
exports.getlibelleByIdEntite = async (id_entité) => {
  try {
    const { data, error } = await supabase
      .from('entité')
      .select('libellé_entité')
      .eq('id_entité', id_entité); // Récupère le libellé de l'entité

    if (error) throw error;

    return data
  } catch (err) {
    throw new Error(`Erreur lors de get libelle by ID entite: ${err.message}`);
  }
};
exports.createEntite = async (libelle, id_entite_fille, id_mur) => {
  try {
    const { data, error } = await supabase
      .from('entité')
      .insert([{ libellé_entité: libelle, id_entité_1: id_entite_fille, id_mur }])
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (err) {
    throw new Error(`Erreur lors de la création de l'entité : ${err.message}`);
  }
};


exports.updateEntite = async (id_entité, updates) => {
  try {
    const { data, error } = await supabase
      .from('entité')
      .update(updates)
      .eq('id_entité', id_entité)
      .select();

    if (error) throw error;

    if (!data || data.length === 0) {
      return { error: "Aucune entité trouvée avec cet ID" };
    }

    return data[0];
  } catch (err) {
    throw new Error(`Erreur lors de la modification de l'entité : ${err.message}`);
  }
};
exports.trouverParNom = async (nom_entité) => {
  try {
  const { data, error } = await supabase
    .from('entité')
    .select('id_entité') 
    .eq('libellé_entité', nom_entité)
    .single();
  if (error) {
    console.error("Erreur récupération entité :", error.message);
    return null;
  }
  return data;
}
catch (err) {
  throw new Error(`Erreur du retrouver entité : ${err.message}`);
}
}

