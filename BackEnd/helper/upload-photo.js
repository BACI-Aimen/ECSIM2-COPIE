const supabase = require('../server').supabase;
const { decode } = require("base64-arraybuffer"); 
async function uploadPhoto(photoFile) {
  try {
    console.log('Début de l\'upload de la photo');
    const fileName = `mur-${Date.now()}-${photoFile.originalname}`; // Assurez-vous de bien conserver le nom d'origine du fichier
    // Téléchargement du fichier dans Supabase
    const fileBase64 = decode(photoFile.buffer.toString("base64"));
    const { data, error } = await supabase.storage
        .from('photos')  // Bucket 'photos'
        .upload(fileName, photoFile.buffer, {
          contentType: photoFile.mimetype,  // Utilisation dynamique du type de contenu
        });

    if (error) {
        console.error('Erreur lors du téléchargement de la photo:', error.message);
        return null;
    }

    console.log('Fichier téléchargé avec succès.');
    console.log('data path', data.path);

    // Obtenez l'URL publique du fichier téléchargé
    const { data: image, error: urlError } = supabase.storage
        .from('photos')
        .getPublicUrl(data.path);

    if (urlError) {
        console.error('Erreur lors de l\'obtention de l\'URL publique:', urlError.message);
        return null;
    }
   // console.log(photoFile);

    console.log('URL publique obtenue avec succès:', image.publicUrl);
    return image.publicUrl;  // Retourne l'URL publique
  } catch (err) {
    console.error('Erreur lors de l\'upload:(dans upload-photo)', err.message);
    return null;
  }
}

module.exports = uploadPhoto;
