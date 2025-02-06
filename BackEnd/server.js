let http = require("http");
var express = require('express')
var app = express();
require('dotenv').config();
var bodyParser = require('body-parser')
//la bdd
require('./config/supabase');
//pour gerer les photos
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
//le cron
require('./config/cron');

module.exports = {upload};

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

    