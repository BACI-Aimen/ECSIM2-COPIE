const { check, validationResult } = require('express-validator');

exports.verifyEmail = [
  check('mail_utilisateur')
    .notEmpty().withMessage('L\'email ne peut pas être vide')
    .bail()
    .isEmail().withMessage('L\'email doit être au format valide'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Ne renvoyer qu'une seule erreur
      const firstError = errors.array({ onlyFirstError: true })[0];
      let response = {
        "code": 4221,
        "error": {
          "field": firstError.param,
        },
        "message": firstError.msg
      };
      return res.status(422).json(response);
    }
    next();
  }
]

exports.login = [
  check('mail_utilisateur')
    .notEmpty().withMessage('L\'email ne peut pas être vide')
    .bail()
    .isEmail().withMessage('L\'email doit être au format valide'),
  check('mot_de_passe')
    .notEmpty().withMessage('Le mot de passe ne peut pas être vide')
    .bail()
    .isLength({ min: 8 }).withMessage('Le mot de passe doit comporter au minimum 8 caractères')
    .matches(/\d/).withMessage('Le mot de passe doit contenir au moins un chiffre')
    .matches(/[!@#$%^&*(),.?":{}|<>+-=_]/).withMessage('Le mot de passe doit contenir au moins un caractère spécial'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Ne renvoyer qu'une seule erreur
      const firstError = errors.array({ onlyFirstError: true })[0];
      let response = {
        "code": 4221,
        "error": {
          "field": firstError.param,
        },
        "message": firstError.msg
      };
      return res.status(422).json(response);
    }
    next();
  }
];

exports.verifyMdp = [
  // upload,
  check('nouveauMotDePasse')
    .notEmpty().withMessage('Le mot de passe ne peut pas être vide')
    .bail()
    .isLength({ min: 8 }).withMessage('Le mot de passe doit comporter au minimum 8 caractères')
    .matches(/\d/).withMessage('Le mot de passe doit contenir au moins un chiffre')
    .matches(/[!@#$%^&*(),.?":{}|<>+\-=_]/).withMessage('Le mot de passe doit contenir au moins un caractère spécial'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const firstError = errors.array({ onlyFirstError: true })[0];

      let response = {
        "code": 4221,
        "error": {
          "field": firstError?.param || "inconnu" // Ajout d'un fallback
        },
        "message": firstError?.msg || "Erreur de validation inconnue"
      };

      return res.status(422).json(response);
    }
    next();
  }
];
exports.updateMdp = [
  check('mdp_utilisateur')
    .notEmpty().withMessage('Le mot de passe ne peut pas être vide')
    .bail()
    .isLength({ min: 8 }).withMessage('Le mot de passe doit comporter au minimum 8 caractères')
    .matches(/\d/).withMessage('Le mot de passe doit contenir au moins un chiffre')
    .matches(/[!@#$%^&*(),.?":{}|<>+\-=_]/).withMessage('Le mot de passe doit contenir au moins un caractère spécial'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Ne renvoyer qu'une seule erreur
      const firstError = errors.array({ onlyFirstError: true })[0];
      let response = {
        "code": 4221,
        "error": {
          "field": firstError.param,
        },
        "message": firstError.msg
      };
      return res.status(422).json(response);
    }
    next();
  }
];