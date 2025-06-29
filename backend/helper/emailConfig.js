const nodemailer = require('nodemailer');
require('dotenv').config();

// Configuration pour un compte Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL,
    pass: process.env.MDP_MAIL,
  },
  tls: {
    rejectUnauthorized: false
  }
});


console.log(process.env.MAIL);

// Vérifiez la connexion à Gmail
transporter.verify((error, success) => {
  if (error) {
    console.error("Erreur de configuration Nodemailer :", error.message);
  } else {
    console.log("Serveur d'email prêt !");
  }
});

module.exports = transporter;
