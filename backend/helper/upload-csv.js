const csvParser = require('csv-parser');
const { Readable } = require('stream');

async function uploadCsv(csvFile) {
  try {
    console.log("Début de la lecture du CSV");

    return await new Promise((resolve, reject) => {
      const lignes = [];

      const stream = Readable.from(csvFile.buffer);

      stream
        .pipe(csvParser())
        .on('data', (row) => {
          lignes.push(row);
        })
        .on('end', () => {
          console.log("CSV lu avec succès. Nombre de lignes:", lignes.length);
          resolve(lignes);
        })
        .on('error', (err) => {
          console.error("Erreur lors de la lecture du CSV:", err.message);
          reject(err);
        });
    });

  } catch (err) {
    console.error("Erreur dans lireCSVDepuisBuffer:", err.message);
    return null;
  }
}

module.exports = uploadCsv;
