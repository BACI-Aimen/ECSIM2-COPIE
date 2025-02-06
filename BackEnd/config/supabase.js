require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// 🔑 Récupération des variables d'environnement
const supabaseUrl = process.env.SUPABASE_PROJET;
const supabaseKey = process.env.SUPABASE_KEY;

// 🚀 Initialisation du client Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
