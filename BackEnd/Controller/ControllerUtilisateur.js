require('dotenv').config();
const ModelUtilisateur = require('../Model/ModelUtilisateur');
const ModelMur = require('../Model/ModelMur');
const bcrypt = require('bcrypt');
const transporter = require('../helper/emailConfig');
const jwt = require('jsonwebtoken');
const uploadPhoto = require('../helper/upload-photo'); // Importez la fonction pour télécharger la photo

exports.loginUser = async (req, res) => {
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

    // Générer le token JWT avec une expiration de 1 heure
    const token = jwt.sign(payload, process.env.JWT_SECRET_USER, { expiresIn: '1h' });

    return res.status(200).json({ message: 'Connexion réussie', token, first_connexion });
  } catch (err) {
    console.error("Erreur interne :", err.message);
    return res.status(500).json({ error: 'Erreur lors de la connexion de l\'utilisateur' });
  }
};



exports.loginAdmin = async (req, res) => {
  try {
    const { mail_utilisateur, mot_de_passe } = req.body;
    if (!mail_utilisateur || !mot_de_passe) {
      return res.status(400).json({ error: 'Email et mot de passe requis.' });
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
      return res.status(400).json({ error: 'Mot de passe incorrect.',message: 'Mot de passe incorrect.' });
    }

    // Vérifier si l'utilisateur est un administrateur
    if (!utilisateur.isAdmin) {
      return res.status(403).json({ error: 'Accès réservé aux administrateurs.',message: 'Accès réservé aux administrateurs.' });
    }

    // Créer le payload pour le token (ex: l'ID de l'utilisateur)
    const payload = {
      id_utilisateur: utilisateur.id_utilisateur,
      mail_utilisateur: utilisateur.mail_utilisateur,
    };

    // Générer le token JWT avec une expiration de 1 heure
    const token = jwt.sign(payload, process.env.JWT_SECRET_ADMIN, { expiresIn: '1h' });

    return res.status(200).json({ message: 'Connexion réussie', token,first_connexion });
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
  const saltRounds = 10;
        
  const motDePasseHache = await bcrypt.hash(nouveauMotDePasse, saltRounds);
  await ModelUtilisateur.updateUtilisateur(id_utilisateur, pseudo, motDePasseHache,nouveauMur.id_mur);   
  return res.status(201).json({ message: "Inscription reussie"});
} catch (err) {
    console.error("Erreur interne :", err.message);
    return res.status(500).json({ error: 'Erreur lors de l\'inscription' });
}
};