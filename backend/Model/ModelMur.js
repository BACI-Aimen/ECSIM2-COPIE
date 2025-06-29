const supabase = require('../config/supabase')
const ModelUtilisateur = require('../Model/ModelUtilisateur');
const ModelEntite = require('../Model/ModelEntite');
const ModelBadge = require('../Model/ModelBadge');
const ModelDebloque = require('../Model/ModelDebloque');
const ModelPodometre = require('../Model/ModelPodometre');
const ModelEvenement = require('../Model/ModelEvenement');
const ModelReagit = require('../Model/ModelReagit');


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
exports.updatePhotoMur = async (photoURL,id_mur) => {
  try {
    const { error } = await supabase
    .from('mur')
    .update({ photo_mur: photoURL })
    .eq('id_mur', id_mur);
    if (error) {
      throw new Error(error.message);
    }

    return null;  // Retourne le premier mur trouvé ou null s'il n'y en a pas
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
exports.SupprimerImageBucket = async (anciennePhotoURL) => {
  try {
      if (anciennePhotoURL) {
          const anciennePhotoPath = anciennePhotoURL.split('/').pop();
          const { error: deleteError } = await supabase.storage
              .from('photos')
              .remove([anciennePhotoPath]);
          
          if (deleteError) throw deleteError;
          console.log("Ancienne photo supprimée avec succès");
      }
  } catch (err) {
      console.error("Erreur lors de la suppression de l'ancienne photo:", err.message);
      throw new Error(err.message);
  }
};
exports.incrementGold = async (id_mur, x = 1) => {
  try {
    const { data, error } = await supabase
      .rpc('increment_gold', { x, row_id: id_mur });

    if (error) throw error;

    return { message: `Gold incrémenté de ${x} avec succès` };
  } catch (err) {
    console.error("Erreur lors de l'ajout de gold :", err.message);
    throw new Error(err.message);
  }
};

exports.incrementSilver = async (id_mur, x = 1) => {
  try {
    const { data, error } = await supabase
      .rpc('increment_silver', { x, row_id: id_mur });

    if (error) throw error;

    return { message: `Silver incrémenté de ${x} avec succès` };
  } catch (err) {
    console.error("Erreur lors de l'ajout de gold :", err.message);
    throw new Error(err.message);
  }
};
exports.incrementBronze = async (id_mur, x = 1) => {
  try {
    const { data, error } = await supabase
      .rpc('increment_bronze', { x, row_id: id_mur });

    if (error) throw error;

    return { message: `Bronze incrémenté de ${x} avec succès` };
  } catch (err) {
    console.error("Erreur lors de l'ajout de gold :", err.message);
    throw new Error(err.message);
  }
};
exports.deleteMursByIds = async (ids_murs) => {
  try {
    if (ids_murs.length === 0) return { message: "Aucun mur à supprimer" };

    const { error } = await supabase
      .from('mur')
      .delete()
      .in('id_mur', ids_murs); // Supprime tous les murs dont l'ID est dans la liste

    if (error) throw error;

    return { message: `${ids_murs.length} mur(s) supprimé(s)` };
  } catch (err) {
    throw new Error(`Erreur lors de la suppression des murs : ${err.message}`);
  }
};
exports.getPhotosByMurIds = async (ids_mur) => {
  try {
    if (!ids_mur.length) return []; // Si la liste est vide, on retourne un tableau vide

    const { data, error } = await supabase
      .from('mur')
      .select('photo_mur')
      .in('id_mur', ids_mur); // Récupérer les photos des murs à supprimer

    if (error) throw error;

    return data.map(mur => mur.photo_mur); // Retourner uniquement les photos
  } catch (err) {
    throw new Error(`Erreur lors de la récupération des photos : ${err.message}`);
  }
};
exports.getMurByEntiteId = async (id_entite) => {
  try {    
    const { data, error } = await supabase
      .from('entité')
      .select('*')
      .eq('id_entité', id_entite)
      .single(); // On récupère une seule ligne

    if (error) throw error;

    return data
  } catch (err) {
    throw new Error(`Erreur lors de la récupération de l'ID du mur : ${err.message}`);
  }
};

exports.getPhotoByIdMur = async (id_mur) => {
  try {
    const { data, error } = await supabase
      .from('mur')
      .select('photo_mur')
      .eq('id_mur', id_mur) // Récupérer les photos des murs à supprimer

    if (error) throw error;

    return data; // Retourner uniquement les photos
  } catch (err) {
    throw new Error(`Erreur lors de la récupération des photos : ${err.message}`);
  }
};

exports.getMurUtilisateur = async (id_mur) => {
  try {
    //Récupération ID utilsateur lié au mur
    const utilisateur = await ModelUtilisateur.getUserIdAndStreakByIdMur(id_mur);

    //Récupération des entités fille et mère
    const entités = await ModelUtilisateur.getEntiteEtEntiteMereById(utilisateur.id_utilisateur);


    const libelle_entité1 = await ModelEntite.getlibelleByIdEntite(entités?.id_entité?.id_entité_1)
    const libelle_entité2 = await ModelEntite.getlibelleByIdEntite(entités?.id_entité?.id_entité)

    const allbadges = await ModelBadge.getAllBadgesVisible()
    const filteredBadges = allbadges.map(({ id_badge, nom_badge, image_badge }) => ({
      id_badge,
      nom_badge,
      image_badge
    }));


    const badgeUnlock = await ModelDebloque.getAllDebloqueByIdMur(id_mur)

    const pasUtilisateur = await ModelPodometre.getAllPasByIdUtilisateur(utilisateur.id_utilisateur)

    const stats = getStatsPodometre(pasUtilisateur);

    var FinalLastEvent = {

    }
      let userDataReaction = []

    const LastEvent = await ModelEvenement.getLastEventByMur(id_mur)
    
    if(LastEvent == null){
      
      FinalLastEvent = {
        NoEvent: "Pas d'évenement pour cette utilisateur"
      }
      console.log(FinalLastEvent)
    }
    else{
      const badgeEvent = await ModelBadge.getBadge(LastEvent?.id_badge)
      const nomBadge = badgeEvent.nom_badge
      FinalLastEvent = {
        ...LastEvent,
        nomBadge
      };

      const last2reagis = await ModelReagit.get2LastReactByEvent(LastEvent?.id_evenement)
          console.log(last2reagis);

      if (last2reagis.length >= 1) {
    const Tempuser1 = await ModelUtilisateur.getUserPseudoById(last2reagis[0]?.id_utilisateur)
    const user1 = await exports.getPhotoByIdMur(Tempuser1?.id_mur)
    userDataReaction.push({
      ...Tempuser1,
      photo_mur: user1?.[0]?.photo_mur,
      reaction:last2reagis[0].id_reaction
    })
  }

  if (last2reagis.length >= 2) {
    const Tempuser2 = await ModelUtilisateur.getUserPseudoById(last2reagis[1]?.id_utilisateur)
    const user2 = await exports.getPhotoByIdMur(Tempuser2?.id_mur)
    userDataReaction.push({
      ...Tempuser2,
      photo_mur: user2?.[0]?.photo_mur,
      reaction:last2reagis[1].id_reaction
    })
  }
    }

    // const userDataReaction = [
    //   { ...Tempuser1, photo_mur:  user1?.[0]?.photo_mur},
    //   { ...Tempuser2, photo_mur:  user2?.[0]?.photo_mur}
    // ];

    // Récupération du mur 
    const { data, error } = await supabase 
      .from('mur')
      .select('gold_mur, silver_mur, bronze_mur, photo_mur')
      .eq('id_mur', id_mur)
    if (error) throw error;

    // Concaténation des données dans un objet unique
    const resultat = {
      //id_utilisateur: id_utilisateur,  // ID de l'utilisateur lié au mur
      entite_mère: libelle_entité1,     // Entités fille et mère
      entite_fille: libelle_entité2,
      Statistique: stats,
      pseudo_utilisateur: utilisateur.pseudo_utilisateur,
      Streak: utilisateur.current_streak,
      filteredBadges,
      badgeUnlock,
      pasUtilisateur,
      FinalLastEvent,
      userDataReaction,
  
      ...data                    // Ajout des informations du mur
    };

    return resultat; // Retourne toutes les infos dans un seul objet
    //return data[0]; // Retourne le mur utilisateur formaté
    //return data;
  } catch (err) {
    throw new Error(`Erreur lors de la récupération du mur utilisateur : ${err.message}`);
  }
};




//---------------------------------------------------

const getStatsPodometre = (data) => {
  if (!data || data.length === 0) {
      return "Pas de stat pour cette utilisateur";
  }

  // Initialisation des variables
  let totalPas = 0;
  let meilleurScore = 0;
  const listePas = [];

  data.forEach(entry => {
      totalPas += entry.nombrepas_podometre;
      meilleurScore = Math.max(meilleurScore, entry.nombrepas_podometre);
      listePas.push(entry.nombrepas_podometre);
  });

  // Calcul de la moyenne de pas par jour
  const moyenneParJour = totalPas / data.length;

  // Calcul de la médiane
  listePas.sort((a, b) => a - b);
  const milieu = Math.floor(listePas.length / 2);
  const medianePas = listePas.length % 2 === 0
      ? (listePas[milieu - 1] + listePas[milieu]) / 2
      : listePas[milieu];

  return {
      totalPas,
      moyenneParJour: Math.round(moyenneParJour),
      meilleurScore,
      medianePas
  };
};
