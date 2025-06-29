require('dotenv').config();
const { DateTime } = require('luxon');
const ModelUtilisateur = require('../Model/ModelUtilisateur');
const ModelMur = require('../Model/ModelMur');
const ModelPodometre = require('../Model/ModelPodometre');
const ModelEntite = require('../Model/ModelEntite')
const bcrypt = require('bcrypt');
const transporter = require('../helper/emailConfig');
const jwt = require('jsonwebtoken');
const uploadPhoto = require('../helper/upload-photo'); // Importez la fonction pour télécharger la photo
const uploadCsv = require('../helper/upload-csv'); // Importez la fonction pour télécharger csv

const saltRounds = 10;

exports.login= async (req, res) => {
  try {
    const { mail_utilisateur, mot_de_passe } = req.body;
    if (!mail_utilisateur || !mot_de_passe) {
      return res.status(400).json({ error: 'Email et mot de passe requis.',message: 'Les champs ne doivent pas etre vide' });
    }

    // Rechercher l'utilisateur dans la base de données
    const utilisateur = await ModelUtilisateur.trouverParEmail(mail_utilisateur);
    if (!utilisateur) {
      return res.status(400).json({ error: 'Utilisateur non trouvé.',message: 'Utilisateur non existant' });
    }
    if(utilisateur.pseudo_utilisateur===null)
    first_connexion = true
    else first_connexion = false
    // Comparer le mot de passe avec le mot de passe haché
    const match = await bcrypt.compare(mot_de_passe, utilisateur.mdp_utilisateur);
    if (!match) {
      return res.status(400).json({ error: 'Mot de passe incorrect.' ,message: 'Mot de passe incorrect.'});
    }

    // Créer le payload pour le token (ex: l'ID de l'utilisateur)
    const payload = {
      id_utilisateur: utilisateur.id_utilisateur,
      mail_utilisateur: utilisateur.mail_utilisateur,
    };
    const isAdmin = utilisateur.isAdmin
    if(!isAdmin)    {
      // Générer le token JWT avec une expiration de 1 heure
      const token = jwt.sign(payload, process.env.JWT_SECRET_USER, { expiresIn: '1h' });
      return res.status(200).json({ message: 'Connexion réussie', token,isAdmin, first_connexion });
    }
    else
    {
      const token = jwt.sign(payload, process.env.JWT_SECRET_ADMIN, { expiresIn: '1h' });

      return res.status(200).json({ message: 'Connexion réussie', token,isAdmin,first_connexion });
    }
  } catch (err) {
    console.error("Erreur interne :", err.message);
    return res.status(500).json({ error: 'Erreur lors de la connexion de l\'utilisateur' });
  }
};


exports.creerCompteUser = async (req, res) => {
    try {
        const { mail_utilisateur, id_entité, role} = req.body;
        if (!mail_utilisateur || !id_entité|| !role) {
          return res.status(400).json({ error: 'Tous les champs obligatoires doivent être fournis.' });
        }
        const utilisateurExistant = await ModelUtilisateur.trouverParEmail(mail_utilisateur);
        if (utilisateurExistant) {
          return res.status(400).json({ error: "L'email fourni est déjà utilisé." });
        }
        const motDePasse = generateRandomPassword();
        const saltRounds = 10;
        const motDePasseHache = await bcrypt.hash(motDePasse, saltRounds);
        mdp_utilisateur=motDePasseHache
        
        const nouvelUtilisateur = await ModelUtilisateur.creerUtilisateur({
            mail_utilisateur,
            mdp_utilisateur,
            id_entité,
            role,
          });
          if (!nouvelUtilisateur) {
            return res.status(500).json({ error: "Erreur lors de la création de l'utilisateur." });
          }
        // Envoyer l'e-mail
        const mailOptions = {
        from: process.env.MAIL, // Votre adresse e-mail
        to: mail_utilisateur, // Adresse de l'utilisateur
        subject: 'Bienvenue sur notre plateforme',
        text: `Bonjour,\n\nVotre compte a été créé avec succès. Voici votre mot de passe temporaire : ${motDePasse}\n\nVeuillez le modifier après votre première connexion.\n\nCordialement,\nL'équipe.`,
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Erreur lors de l'envoi de l'e-mail :", error.message);
        } else {
          console.log("E-mail envoyé :", info.response);
        }
      });
          return res.status(201).json({ message: "Utilisateur  créés avec succès", utilisateur: nouvelUtilisateur });
        } catch (err) {
          console.error("Erreur interne :", err.message);
          return res.status(500).json({ error: "Erreur lors de la création de l'utilisateur" });
        }
      };
function generateRandomPassword() {
    const length = 8; // Longueur minimale
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // Lettres et chiffres
    const specials = "!@#$%^&*()-_+=<>?"; // Caractères spéciaux
    let password = "";
      
    // Ajouter un chiffre
    password += "0123456789".charAt(Math.floor(Math.random() * 10));
      
    // Ajouter un caractère spécial
    password += specials.charAt(Math.floor(Math.random() * specials.length));
      
    // Compléter avec des caractères aléatoires
    for (let i = 2; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
      
    // Mélanger les caractères
    return password.split('').sort(() => 0.5 - Math.random()).join('');
}

exports.finaliserInscription = async (req, res) => {
  try {
    // Vérifier que Multer a bien placé le fichier dans req.file
    const photo_mur = req.file;  
    const id_utilisateur = req.user.id_utilisateur;
    if (!photo_mur) {
        return res.status(400).json({ error: "Le fichier photo_mur est requis." });
    }
    const { pseudo, nouveauMotDePasse, confirmerNouveauMotDePasse } = req.body;

    if (!pseudo || !nouveauMotDePasse || !confirmerNouveauMotDePasse) {
      return res.status(400).json({ error: 'Pseudo, nouveau mot de passe et confirmation requis.' });
    }
    // Vérification que les mots de passe correspondent
    if (nouveauMotDePasse !== confirmerNouveauMotDePasse) {
      return res.status(400).json({ error: 'Les mots de passe ne correspondent pas.' });
    }
        // Vérification de la taille de l'image
    if (photo_mur.size > 1 * 1024 * 1024) {  // Limite de 1 Mo
      return res.status(400).json({ error: "La taille de l'image ne doit pas dépasser 1 Mo." });
    }
    // Appel à la fonction uploadPhoto pour télécharger la photo dans Supabase
    const photoURL = await uploadPhoto(photo_mur);  // Utilisez photo_mur comme fichier binaire        
    if (!photoURL) {
        return res.status(500).json({ error: "Erreur lors du téléchargement de la photo." });
    }
    // Appel au modèle pour ajouter un mur avec l'URL de la photo téléchargée
    const nouveauMur = await ModelMur.ajouterMur(photoURL);
    if (photo_mur && photo_mur.path) {
      fs.unlink(photo_mur.path, (err) => {
          if (err) {
              console.error("Erreur lors de la suppression du fichier temporaire:", err.message);
          } else {
              console.log("Fichier temporaire supprimé avec succès.");
          }
      });
  }
  //Hash le mot de passe
  //const saltRounds = 10;
        
  const motDePasseHache = await bcrypt.hash(nouveauMotDePasse, saltRounds);
  await ModelUtilisateur.updateUtilisateurInscription(id_utilisateur, pseudo, motDePasseHache,nouveauMur.id_mur);   
  return res.status(201).json({ message: "Inscription reussie"});
} catch (err) {
    console.error("Erreur interne :", err.message);
    return res.status(500).json({ error: 'Erreur lors de l\'inscription' });
}
};
exports.updateCompte = async (req, res) => {
  try {
    const { id_utilisateur, mail_utilisateur, pseudo_utilisateur, role, id_entite } = req.body;
    if (!id_utilisateur) {
      throw new Error("L'ID utilisateur est requis.");
    }
    const updateFields = {};    
    // Vérifier quels champs doivent être mis à jour
    if (mail_utilisateur) updateFields.mail_utilisateur = mail_utilisateur;
    if (pseudo_utilisateur) updateFields.pseudo_utilisateur = pseudo_utilisateur;
    if (role !== undefined) updateFields.isAdmin = role;
    if(role=='Utilisateur') updateFields.isAdmin = false;
    else updateFields.isAdmin = true;     
    if (id_entite) updateFields.id_entité = id_entite;


    const updatedUser = await ModelUtilisateur.updateCompte({
      updateFields,
      id_utilisateur
    });

    return res.status(200).json({ message: "Mise à jour réussie", data: updatedUser });
  } catch (err) {
    console.error("Erreur lors de la mise à jour du compte:", err.message);
    return res.status(500).json({ error: err.message });
  }
};


exports.getCompteUtilisateurById = async (req, res) => {
  const { id_utilisateur } = req.params;

  try {
      const user = await ModelUtilisateur.getCompteUtilisateurById(id_utilisateur);

      if (!user) {
          return res.status(404).json({ error: "Utilisateur non trouvé" });
      }

      // Transformer la réponse avant de l'envoyer
      const formattedUser = {
          pseudo_utilisateur: user.pseudo_utilisateur,
          mail_utilisateur: user.mail_utilisateur,
          role: user.isAdmin ? "Administrateur" : "Utilisateur", // Conversion du rôle
          libellé_entité: user.id_entité?.libellé_entité || null // Extraire directement le libellé
      };

      return res.status(200).json(formattedUser);
  } catch (err) {
      return res.status(500).json({ error: err.message, message: "Utilisateur non trouvé" });
  }
};

exports.getMonCompteUtilisateurById = async (req, res) => {
  const id_utilisateur = req.user.id_utilisateur;

  try {
      const user = await ModelUtilisateur.getMonCompteUtilisateurById(id_utilisateur);

      if (!user) {
          return res.status(404).json({ error: "Utilisateur non trouvé" });
      }

      return res.status(200).json(user);
  } catch (err) {
      return res.status(500).json({ error: err.message, message: "Utilisateur non trouvé" });
  }
};

exports.getAllUtilisateurs = async (req, res) => {
  try {
    const utilisateurs = await ModelUtilisateur.getAllUtilisateurs();

    if (!utilisateurs || utilisateurs.length === 0) {
      return res.status(404).json({ error: "Aucun utilisateur trouvé" });
    }

    return res.status(200).json(utilisateurs); // Retourne la liste des utilisateurs
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.SupprimerUtilisateur = async (req, res) => {
  const { id_utilisateur } = req.params;  // L'ID du mur à supprimer vient des paramètres de l'URL

  const id_mur = await ModelUtilisateur.getIdMurByUserId(id_utilisateur);
  try {
    // Appel du modèle pour supprimer le mur
    const result = await ModelMur.SupprimerMurById(id_mur);

    return res.status(200).json(result); // Réponse avec message de succès
  } catch (err) {
    return res.status(500).json({ error: err.message }); // En cas d'erreur
  }
};
exports.SupprimerMesDonnees = async (req, res) => {
  const id_utilisateur= req.user.id_utilisateur; 
  console.log(id_utilisateur);
   
  try {
    // Appel du modèle pour supprimer le mur
    const count = await ModelPodometre.supprimerDonnees(id_utilisateur); // Je change pour ne pas avoir de retour vide et ne pas provoquer d'erreurs en Front, fonctionnement reste le même, retour changé
    return res.status(200).json({ message: `${count} enregistrements supprimés` });
  } catch (err) {
    return res.status(500).json({ error: err.message }); // En cas d'erreur
  }
};


exports.updatePseudo = async (req, res) => {
  id_utilisateur= req.user.id_utilisateur
  const {pseudo_utilisateur } = req.body; // Récupère les paramètres dans le corps de la requête
  //console.log(id_utilisateur, pseudo_utilisateur)
  try {
    // Vérification des données reçues
    if (!id_utilisateur || !pseudo_utilisateur) {
      return res.status(400).json({ error: "L'ID utilisateur et le nouveau pseudo sont nécessaires" });
    }

    
    // Appel du modèle pour mettre à jour le pseudo
    const utilisateurMisAJour = await ModelUtilisateur.updatePseudoUtilisateur(id_utilisateur, pseudo_utilisateur);

    // Retourner la réponse avec l'utilisateur mis à jour
    return res.status(200).json({
      message: "Le pseudo a été mis à jour avec succès",
      utilisateur: utilisateurMisAJour
    });
  } catch (err) {
    // Retourner l'erreur si quelque chose échoue
    return res.status(500).json({ error: err.message });
  }
};

exports.updateMdp = async (req, res) => {
  id_utilisateur= req.user.id_utilisateur  
  const { mdp_utilisateur } = req.body; // Récupère les paramètres dans le corps de la requête

  try {
    // Vérification des données reçues
    if (!id_utilisateur || !mdp_utilisateur) {
      return res.status(400).json({ error: "L'ID utilisateur ou le nouveau mot de passe manquant" });
    }

    // // Vérifier que le mot de passe a une longueur minimale
    // if (mdp_utilisateur.length < 6) {
    //   return res.status(400).json({ error: "Le mot de passe doit contenir au moins 6 caractères" });
    // }

    const oldmdp = await ModelUtilisateur.getMdpUser(id_utilisateur)
    // Comparer le mot de passe avec le mot de passe haché
    const match = await bcrypt.compare(mdp_utilisateur, oldmdp);
    if (match) {
      return res.status(400).json({ error: 'Mot de passe incorrect.' ,message: 'Le mot de passe doit être différent de celui existant'});
    }

    // Hachage du mot de passe
    const hashedMdp = await bcrypt.hash(mdp_utilisateur, saltRounds);


    // Appel du modèle pour mettre à jour le mot de passe
    const utilisateurMisAJour = await ModelUtilisateur.updateMdpUtilisateur(id_utilisateur, hashedMdp);

    // Retourner la réponse avec l'utilisateur mis à jour
    return res.status(200).json({
      message: "Le mot de passe a été mis à jour avec succès",
      utilisateur: utilisateurMisAJour
    });
  } catch (err) {
    // Retourner l'erreur si quelque chose échoue
    return res.status(500).json({ error: err.message });
  }
};
exports.changerPhotoProfil = async (req,res) => {
  try {
    console.log('Début du changement de photo de profil');
    const id_utilisateur = req.user.id_utilisateur;
    const photo_mur = req.file;
    const id_mur = await ModelUtilisateur.getIdMurByUserId(id_utilisateur)    
  if (!id_mur) throw new Error("Utilisateur sans mur associé");
  

    const mur=await ModelMur.recupererMur(id_mur)
    
   const anciennePhotoURL = mur?.photo_mur;
   await ModelMur.SupprimerImageBucket(anciennePhotoURL)

    //Recup la nouvelle photo
      const photoURL = await uploadPhoto(photo_mur);  // Utilisez photo_ profil comme fichier binaire        
      if (!photoURL) {
          return res.status(500).json({ error: "Erreur lors du téléchargement de la photo." });
      }
      // Vérification de la taille de l'image
      if (photo_mur.size > 1 * 1024 * 1024) {  // Limite de 1 Mo
        return res.status(400).json({ error: "La taille de l'image ne doit pas dépasser 1 Mo." });
      }
  
      await ModelMur.updatePhotoMur(photoURL,id_mur)
console.log('Photo du mur mise à jour avec succès');
return res.status(200).json({
  message: "La photo a bien été modifiée"
});
  } catch (err) {
      console.error('Erreur lors du changement de photo de profil:', err.message);
      throw new Error(err.message);
  }
};
const { Parser } = require('json2csv');

exports.importerUtilisateurs = async (req, res) => {
  try {
    const donneesCSV = await uploadCsv(req.file);
    const lignesRetour = [];

    for (const utilisateur of donneesCSV) {
      const { mail_utilisateur, entité, admin } = utilisateur;
      let statut = 'Succès';

      if (!mail_utilisateur || !entité || admin == null) {
        statut = "Champs manquants";
      } else {
        const entiteTrouvee = await ModelEntite.trouverParNom(entité);
        if (!entiteTrouvee) {
          statut = `Entité "${entité}" introuvable`;
        } else {
          const id_entité = entiteTrouvee.id_entité;
          const existe = await ModelUtilisateur.trouverParEmail(mail_utilisateur);
          if (existe) {
            statut = "Email déjà utilisé";
          } else {
            const motDePasse = generateRandomPassword();
            const motDePasseHache = await bcrypt.hash(motDePasse, 10);
            const nouvelUtilisateur = await ModelUtilisateur.creerUtilisateur({
              mail_utilisateur,
              mdp_utilisateur: motDePasseHache,
              id_entité,
              role: admin === 'true',
            });

            if (!nouvelUtilisateur) {
              statut = "Erreur lors de la création";
            } else {
              // Envoi de l'e-mail
              const mailOptions = {
                from: process.env.MAIL,
                to: mail_utilisateur,
                subject: 'Bienvenue sur notre plateforme',
                text: `Bonjour,\n\nVotre compte a été créé. Mot de passe temporaire : ${motDePasse}\n\nCordialement,\nL'équipe.`,
              };

              transporter.sendMail(mailOptions, (error) => {
                if (error) {
                  console.error(`Erreur email pour ${mail_utilisateur}:`, error.message);
                }
              });
            }
          }
        }
      }

      // Ajout du statut à la ligne
      lignesRetour.push({
        mail_utilisateur,
        entité,
        admin,
        résultat: statut
      });
    }

    // Génération du CSV de retour
    const parser = new Parser({ fields: ['mail_utilisateur', 'entité', 'admin', 'résultat'] });
    const csvRetour = parser.parse(lignesRetour);

    res.header('Content-Type', 'text/csv');
    res.attachment('import-resultat.csv');
    return res.send(csvRetour);
    
  } catch (err) {
    console.error('Erreur CSV :', err.message);
    return res.status(500).json({ error: "Erreur lors de l'import" });
  }
};

exports.motdepasseoublie = async (req,res) => {
  try {
    const { mail_utilisateur } = req.body;
    if (!mail_utilisateur) {
      return res.status(400).json({ error: "Email requis." });
    }
  
    const utilisateur = await ModelUtilisateur.trouverParEmail(mail_utilisateur);
    if (!utilisateur) {
      return res.status(404).json({ error: "Aucun utilisateur avec cet email." });
    }    
    const code = generateResetCode();
    await ModelUtilisateur.enregistrerCodeReset(utilisateur.id_utilisateur, code);
    const mailOptions = {
      from: process.env.MAIL,
      to: mail_utilisateur,
      subject: "Code de réinitialisation de mot de passe",
      text: `Bonjour,\n\nVoici votre code de réinitialisation : ${code}\nIl est valable pendant 15 minutes.\n\nCordialement,\nL'équipe.`
    };
  
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error("Erreur lors de l'envoi du mail :", error.message);
        return res.status(500).json({ error: "Erreur lors de l'envoi de l'e-mail" });
      }
      return res.status(200).json({ message: "Code envoyé." });
    })
  } catch (err) {
      console.error('Erreur lors du mot de passe oublié:', err.message);
      throw new Error(err.message);
  }
};

exports.verifierCodeReinitialisation = async (req, res) => {
  try {
    const { code } = req.body;
    const { DateTime } = require('luxon');

    const codeEnregistre = await ModelUtilisateur.trouverCode(code);
    if (!codeEnregistre) {
      return res.status(404).json({ error: "Code inexistant." });
    }

    const dateCreation = DateTime.fromISO(codeEnregistre.created_at, { zone: 'utc' }).setZone('Europe/Paris');
    const expiration = dateCreation.plus({ minutes: 15 });
    const maintenant = DateTime.now().setZone('Europe/Paris');

    if (maintenant > expiration) {
      return res.status(400).json({ error: "Code expiré." });
    }

    return res.status(200).json({ message: "Code valide."});

  } catch (err) {
    console.error("Erreur lors de la vérification du code :", err.message);
    return res.status(500).json({ error: "Erreur serveur." });
  }
};

exports.updateMdpOublie = async (req, res) => {

  const { code,mdp_utilisateur } = req.body; // Récupère les paramètres dans le corps de la requête
  
  try {
    // Vérification des données reçues
    if (!code || !mdp_utilisateur) {
      return res.status(400).json({ error: "Le Code ou le nouveau mot de passe manquant" });
    }

    const codeEnregistre = await ModelUtilisateur.trouverCode(code);
    if (!codeEnregistre) {
      return res.status(404).json({ error: "Code inexistant." });
    }

    let id_utilisateur = codeEnregistre.id_utilisateur
    const oldmdp = await ModelUtilisateur.getMdpUser(id_utilisateur)

    // Comparer le mot de passe avec le mot de passe haché
    const match = await bcrypt.compare(mdp_utilisateur, oldmdp);
    if (match) {
      return res.status(400).json({ error: 'Mot de passe incorrect.' ,message: 'Le mot de passe doit être différent de celui existant'});
    }

    // Hachage du mot de passe
    const hashedMdp = await bcrypt.hash(mdp_utilisateur, saltRounds);


    // Appel du modèle pour mettre à jour le mot de passe
    const utilisateurMisAJour = await ModelUtilisateur.updateMdpUtilisateur(id_utilisateur, hashedMdp);

    // Retourner la réponse avec l'utilisateur mis à jour
    return res.status(200).json({
      message: "Le mot de passe a été mis à jour avec succès",
      utilisateur: utilisateurMisAJour
    });
  } catch (err) {
    // Retourner l'erreur si quelque chose échoue
    return res.status(500).json({ error: err.message });
  }
};

const generateResetCode = () => Math.floor(100000 + Math.random() * 900000).toString();
