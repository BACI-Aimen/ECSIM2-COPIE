const cron = require('node-cron');
const { updateMedaille } = require('../Controller/ControllerClassement'); // Vérifie bien le chemin

// 🛠 Test toutes les 10 secondes
cron.schedule('*/10 * * * * *', async () => {
   // await updateMedaille();
});

// 📅 Tâche planifiée pour le 1er du mois à 00h00
cron.schedule('0 0 1 * *', async () => {
 //   console.log("📆 Exécution de la tâche mensuelle...");
 //   await updateMedaille();
});

console.log("🕒 Tâches planifiées configurées !");
