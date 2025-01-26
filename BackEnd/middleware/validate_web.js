const {check, validationResult } = require("express-validator");

exports.login = [
  check('mail_utilisateur', 'L\'email doit être au format valide').isEmail(),
  check('mot_de_passe', 'Le mot de passe doit comporter au minimum 8 caractères, 1 chiffre et 1 caractère spécial')
    .isLength({ min: 8 })
    .matches(/\d/)
    .matches(/[!@#$%^&*(),.?":{}|<>]/),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Regrouper les erreurs
      let response = {
        "code": 4221,
        "meta": {
          "errors": errors.array().map(error => ({
            field: error.param,
            message: error.msg
          }))
        },
      };
      return res.status(422).json(response);
    }
    next();
  }
];
