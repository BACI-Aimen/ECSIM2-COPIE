let http = require("http");
var express = require('express')
var app = express();
require('dotenv').config();
var bodyParser = require('body-parser')
const { createClient } = require('@supabase/supabase-js');
//pour gerer la bdd
const supabaseUrl = process.env.SUPABASE_PROJET
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
//pour gerer les photos
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = { supabase,upload}; // Assurez-vous d'exporter 'upload' ici

app.use(bodyParser.json({
  verify: (req, res, buf) => {
    req.rawBody = buf
  }
}))



require('./router/router.js')(app);



srv = http.createServer({
    },app).listen(4433, function () {
      var port = srv.address().port
      console.log("im listening on port "+port);
    })

    