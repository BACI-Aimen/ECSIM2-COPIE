require('dotenv').config();
const ModelBadge = require('../Model/ModelBadge');
const uploadPhoto = require('../helper/upload-photo'); 
const ModelMur = require('../Model/ModelMur')
exports.CreerBadge = async (req, res) => {
  try {
    const { nom, description, nombre_pas, periodicite,hiden } = req.body;
    const image = req.file;
    
    //DATE
    const today = new Date();
    let dateDebut = today.toISOString().split('T')[0]; // Date d'aujourd'hui (YYYY-MM-DD)
    let dateFin;

    if (periodicite === 'mensuelle') {
      let nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      dateFin = nextMonth.toISOString().split('T')[0]; // Date dans un mois
  
  } else if (periodicite === 'trimestrielle') {
      let nextQuarter = new Date();
      nextQuarter.setMonth(nextQuarter.getMonth() + 3);
      dateFin = nextQuarter.toISOString().split('T')[0]; // Date dans trois mois
  
  } else if (periodicite === 'annuelle') {
      let nextYear = new Date();
      nextYear.setFullYear(nextYear.getFullYear() + 1);
      dateFin = nextYear.toISOString().split('T')[0]; // Date dans un an
  
  } else if (periodicite === 'hebdomadaire') {
      let nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      dateFin = nextWeek.toISOString().split('T')[0]; // Date dans une semaine
  
  } else {
    return res.status(400).json({ error: "Périodicité non prise en charge" });
  }

    if (!nom || !description || !nombre_pas || !periodicite || !image ||  hiden == null) {
      return res.status(400).json({ error: "Tous les champs sont requis, y compris l'image." });
    }
     // Vérification de la taille de l'image
     if (image.size > 1 * 1024 * 1024) {  // Limite de 1 Mo
      return res.status(400).json({ error: "La taille de l'image ne doit pas dépasser 1 Mo." });
    }
    // Upload de l'image sur Supabase
    const imageURL = await uploadPhoto(image);
    if (!imageURL) {
      return res.status(500).json({ error: "Échec du téléchargement de l'image." });
    }

    const nouveauBadge = await ModelBadge.ajouterBadge(nom, description, nombre_pas, dateDebut,dateFin, imageURL,hiden);

    return res.status(201).json({ message: "Badge créé avec succès", badge: nouveauBadge });
  } catch (err) {
    console.error('Erreur interne :', err.message);
    return res.status(500).json({ error: 'Erreur lors de la création du badge' });
  }
};
exports.ModifierBadge = async (req, res) => {
  try {
    const { nom, description, nombre_pas, periodicite, hiden } = req.body;
    const image = req.file;
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ error: "ID du badge requis pour la modification." });
    }

    if (!nom || !description || !nombre_pas || !periodicite || hiden == null) {
      return res.status(400).json({ error: "Tous les champs sauf l'image sont requis." });
    }
    badge= await ModelBadge.getBadge(id)
    const dateDebut = badge.periodicite_debut_badge;
    //GERER ENVOI IMAGE
    if(image!=undefined) // IL ENVOIE
    {
         // Vérification de la taille de l'image
         if (image.size > 1 * 1024 * 1024) {  // Limite de 1 Mo
          return res.status(400).json({ error: "La taille de l'image ne doit pas dépasser 1 Mo." });
        }
        // Upload de l'image sur Supabase
        const imageURL = await uploadPhoto(image);
        if (!imageURL) {
          return res.status(500).json({ error: "Échec du téléchargement de l'image." });
        }
        await ModelBadge.updatePhotoBadge(imageURL,id)
        await ModelMur.SupprimerImageBucket(badge.image_badge)
        
    }

  // Si la périodicité a changé, recalculer dateFin
  let dateFin = badge;
  console.log(dateFin.periodicite_fin_badge);
  
  if (periodicite !== badge.periodicite)
  {
    const baseDate = new Date(dateDebut);

    if (periodicite === 'mensuelle') {
      baseDate.setMonth(baseDate.getMonth() + 1);
    } else if (periodicite === 'trimestrielle') {
      baseDate.setMonth(baseDate.getMonth() + 3);
    } else if (periodicite === 'annuelle') {
      baseDate.setFullYear(baseDate.getFullYear() + 1);
    } else if (periodicite === 'hebdomadaire') {
      baseDate.setDate(baseDate.getDate() + 7);
    } else {
      return res.status(400).json({ error: "Périodicité non prise en charge." });
    }
    dateFin = baseDate.toISOString().split('T')[0];
  }


  const nouveauBadge = await ModelBadge.ModifierBadge(id,nom, description, nombre_pas, dateDebut,dateFin,hiden);

    return res.status(201).json({ message: "Badge modifier avec succès", badge: nouveauBadge });
  } catch (err) {
    console.error('Erreur interne :', err.message);
    return res.status(500).json({ error: 'Erreur lors de la création du badge' });
  }
};
exports.getAllBadges = async (req, res) => {
  try {
      // Récupération de tous les badges
      const badges = await ModelBadge.getAllBadges();

      // Fonction pour déterminer la périodicité d'un badge
      const determinerPeriodicite = (dateDebut, dateFin) => {
          const debut = new Date(dateDebut);
          const fin = new Date(dateFin);
          const differenceEnJours = (fin - debut) / (1000 * 60 * 60 * 24); // Convertir en jours          
          if (differenceEnJours === 7) return "hebdomadaire";
          if (differenceEnJours === 30| differenceEnJours === 31) return "mensuelle";
          if (differenceEnJours >= 89 && differenceEnJours <= 92) return "trimestrielle";
          if (differenceEnJours >= 364 && differenceEnJours <= 366) return "annuelle";

          return "périodicité inconnue";
      };

      // Ajouter la périodicité à chaque badge
      const badgesAvecPeriodicite = badges.map(badge => ({
          ...badge,
          periodicite: determinerPeriodicite(badge.periodicite_debut_badge, badge.periodicite_fin_badge)
      }));

      return res.status(200).json(badgesAvecPeriodicite);
  } catch (err) {
      console.error('Erreur lors de la récupération des badges :', err.message);
      return res.status(500).json({ error: 'Erreur lors de la récupération des badges' });
  }
};
exports.getAllBadgesVisible = async (req, res) => {
  try {
      // Récupération de tous les badges
      const badges = await ModelBadge.getAllBadgesVisible();

      // Fonction pour déterminer la périodicité d'un badge
      const determinerPeriodicite = (dateDebut, dateFin) => {
          const debut = new Date(dateDebut);
          const fin = new Date(dateFin);
          const differenceEnJours = (fin - debut) / (1000 * 60 * 60 * 24); // Convertir en jours          
          if (differenceEnJours === 7) return "hebdomadaire";
          if (differenceEnJours === 30| differenceEnJours === 31) return "mensuelle";
          if (differenceEnJours >= 89 && differenceEnJours <= 92) return "trimestrielle";
          if (differenceEnJours >= 364 && differenceEnJours <= 366) return "annuelle";

          return "périodicité inconnue";
      };

      // Ajouter la périodicité à chaque badge
      const badgesAvecPeriodicite = badges.map(badge => ({
          ...badge,
          periodicite: determinerPeriodicite(badge.periodicite_debut_badge, badge.periodicite_fin_badge)
      }));

      return res.status(200).json(badgesAvecPeriodicite);
  } catch (err) {
      console.error('Erreur lors de la récupération des badges :', err.message);
      return res.status(500).json({ error: 'Erreur lors de la récupération des badges' });
  }
};
exports.getBadge = async (req, res) => {
  try {
      const { id } = req.params;
      // Récupération du badge par ID
      const badge = await ModelBadge.getBadge(id);

      if (!badge) {
          return res.status(404).json({ error: "Badge non trouvé" });
      }

      // Fonction pour déterminer la périodicité d'un badge
      const determinerPeriodicite = (dateDebut, dateFin) => {
          const debut = new Date(dateDebut);
          const fin = new Date(dateFin);
          const differenceEnJours = (fin - debut) / (1000 * 60 * 60 * 24); // Convertir en jours

          if (differenceEnJours === 7) return "hebdomadaire";
          if (differenceEnJours === 30 || differenceEnJours === 31) return "mensuelle";
          if (differenceEnJours >= 89 && differenceEnJours <= 92) return "trimestrielle";
          if (differenceEnJours >= 364 && differenceEnJours <= 366) return "annuelle";

          return "périodicité inconnue";
      };

      // Ajouter la périodicité au badge
      const badgeAvecPeriodicite = {
          ...badge,
          periodicite: determinerPeriodicite(badge.periodicite_debut_badge, badge.periodicite_fin_badge)
      };

      return res.status(200).json(badgeAvecPeriodicite);
  } catch (err) {
      console.error('Erreur lors de la récupération du badge :', err.message);
      return res.status(500).json({ error: 'Erreur lors de la récupération du badge' });
  }
};
exports.getBadgeUser = async (req, res) => {
  try {
      const { id } = req.params;
      // Récupération du badge par ID
      const badge = await ModelBadge.getBadge(id);
      
      if (!badge) {
          return res.status(404).json({ error: "Badge non trouvé" });
      }
      if(badge.hiden==true)
      {
        return res.status(404).json({ error: "Non autorisé a consulter pti con" });
      }
      // Fonction pour déterminer la périodicité d'un badge
      const determinerPeriodicite = (dateDebut, dateFin) => {
          const debut = new Date(dateDebut);
          const fin = new Date(dateFin);
          const differenceEnJours = (fin - debut) / (1000 * 60 * 60 * 24); // Convertir en jours

          if (differenceEnJours === 7) return "hebdomadaire";
          if (differenceEnJours === 30 || differenceEnJours === 31) return "mensuelle";
          if (differenceEnJours >= 89 && differenceEnJours <= 92) return "trimestrielle";
          if (differenceEnJours >= 364 && differenceEnJours <= 366) return "annuelle";

          return "périodicité inconnue";
      };

      // Ajouter la périodicité au badge
      const badgeAvecPeriodicite = {
          ...badge,
          periodicite: determinerPeriodicite(badge.periodicite_debut_badge, badge.periodicite_fin_badge)
      };

      return res.status(200).json(badgeAvecPeriodicite);
  } catch (err) {
      console.error('Erreur lors de la récupération du badge :', err.message);
      return res.status(500).json({ error: 'Erreur lors de la récupération du badge' });
  }
};
exports.supprimerBadge = async (req, res) => {
  try {
    const { id_badge } = req.params;

    if (!id_badge) {
      return res.status(400).json({ error: "id_badge requis" });
    }

    const result = await ModelBadge.deleteBadge(id_badge);

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};