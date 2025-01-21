const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.verifyTokenUser = (req, res, next) => {
  const token = req.header('t_USER_STEPBYMIAGE');
  if (!token) {
    return res.status(401).json({ error: 'Accès interdit, token manquant.' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_USER);
    req.user = decoded; //id de l'utilisateur
    console.log(req.user);
    
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalide.' });
  }
};
exports.verifyTokenAdmin = (req, res, next) => {
  const token = req.header('t_ADMIN_STEPBYMIAGE');
  if (!token) {
    return res.status(401).json({ error: 'Accès interdit, token manquant.' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_ADMIN);
    req.user = decoded; //id de l'utilisateur
    console.log(req.user);
    
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalide.' });
  }
};
