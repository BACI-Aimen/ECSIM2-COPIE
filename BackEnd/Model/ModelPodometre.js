const supabase = require('../server').supabase;
exports.ajouterPodometre = async ({ nombrepas_podometre, id_utilisateur }) => {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    // Vérifier si une entrée existe pour aujourd'hui
    const { data: existingData, error: fetchError } = await supabase
      .from('podomètre_journalier')
      .select('*')
      .eq('id_utilisateur', id_utilisateur)
      .gte('created_at_podometre', todayStart.toISOString())
      .lte('created_at_podometre', todayEnd.toISOString())
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw new Error("Erreur lors de la vérification des données existantes : " + fetchError.message);
    }

    if (existingData) {
      // Mettre à jour l'enregistrement existant
      const { data: updatedData, error: updateError } = await supabase
        .from('podomètre_journalier')
        .update({ nombrepas_podometre })
        .eq('id_podometre', existingData.id_podometre)
        .select();

      if (updateError) {
        throw new Error("Erreur lors de la mise à jour des données du podomètre : " + updateError.message);
      }

      return updatedData[0]; // Retourner les données mises à jour
    } else {
      // Créer une nouvelle entrée
      const { data: newData, error: insertError } = await supabase
        .from('podomètre_journalier')
        .insert([{ nombrepas_podometre, id_utilisateur }])
        .select();

      if (insertError) {
        throw new Error("Erreur lors de l'ajout des données du podomètre : " + insertError.message);
      }

      return newData[0]; // Retourner les données insérées
    }
  } catch (err) {
    console.error("Erreur interne dans le modèle Podomètre :", err.message);
    throw new Error("Erreur interne dans le modèle Podomètre.");
  }
};