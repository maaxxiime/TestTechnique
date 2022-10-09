const User = require("../models/users.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  bcrypt
    // hash le mot de passe qui passe dans la requête axios
    .hash(req.body.password, 10)
    .then((hash) => {
      // enregistre newuser et passe admin à false
      const newuser = new User({
        email: req.body.email,
        password: hash,
        identifiant: req.body.identifiant,
        admin: false,
      });
      // sauvegarde newuser
      newuser
        .save()
        .then(() => res.status(201).json({ message: "User created ! 👌" }))
        .catch((err) => res.status(401).json({ message : "impossible de créer le compte", error : err }));
    })
    .catch((err) => res.status(500).json({ err }));
};

// utilisé sur postman pour des tests
exports.read_all = (req, res, next) => {
  User.find()
    .then((u) => res.status(200).json({ message: "voici vos users", users: u }))
    .catch((err) => res.status(404).json({ err }));
};

exports.login = (req, res, next) => {
  // cherche un user dont l'email de la requette correspond à un email dans la base de donnée
  User.findOne({ email: req.body.email })
    .then((user) => {
      bcrypt
        // si user trouvé => compare les mot de passe
        .compare(req.body.password, user.password)
        .then((correspond) => {
          // si il ne corresponde pas
          if (!correspond) {
            res.status(401).json({ message: "mdp incorrect" });
          } else {
            // si il corresponde assign un token a l'user
            const token = jwt.sign(
              { userID: user._id, email: user.email },
              process.env.TOKEN_KEY,
              { expiresIn: "7d" }
            );
            res.status(200).json({
              message: "connexion réussi",
              user: user.email,
              userId: user.id,
              token: token,
              admin: user.admin,
            });
          }
        })
        // log l'erreur si il y en a une
        .catch((err) => res.status(401).json({ err }));
    })
    // si user pas trouvé => log l'erreur
    .catch((err) =>
      res.status(404).json({
        message: "utilisateur non trouvé : " + req.body.email,
        error: err,
      })
    );
};

exports.delete = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  const userID = decodedToken.userID;
  const TargetId = req.params.TargetId;

  // compare l'id du token et l'id de la requête axios
  if (userID === TargetId) {
    User.findByIdAndDelete(TargetId)
      // si les deux correspondent, supprime l'user
      .then((user) => {
        res.status(200).json({ message: `utilisateur ${user.email} supprimé` });
      })
      // en cas d'erreur => log l'erreur
      .catch((err) =>
        res.status(404).json({ message: "utilisateur non trouvé", error: err })
      );
  } else {
    // si les id ne correspondent pas
    res.status(403).json({
      error: "Vous n'avez pas les droit pour supprimer cet utilisateur",
    });
  }
};

exports.update = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  const userID = decodedToken.userID;
  const targetID = req.params.TargetId;

  // compare l'id du token et l'id de la requette axios
  if (userID === targetID) {
    User.findById(userID).then((user) => {
      // compare le mot de passe actuel rentré dans la requette et le mot de passe de la base de donnée
      bcrypt.compare(req.body.oldpassword, user.password).then((valid) => {
        // si les mot de passe ne corresponde pas
        if (!valid) {
          res
            .status(401)
            .json({ message: "le mot de passe ne correspond pas" });
        }
        bcrypt
          // si c'est bon, hash le nouveau mot de passe
          .hash(req.body.password, 10)
          .then((hash) => {
            const newEmail = req.body.email;
            // enregistre le nouveau user
            const updateUser = {
              email: newEmail,
              password: hash,
            };

            user
              // fait la modification
              .updateOne(updateUser)
              .then(() =>
                res.status(200).json({
                  message: `votre email et/ou mot de passe ont était modififié par ${updateUser.email}`,
                })
              )
              .catch((err) =>
                res
                  .status(404)
                  .json({ message: "utilisateur introuvable", error: err })
              );
          })
          .catch((err) =>
            res.status(500).json({ message: "bcrypt error", error: err })
          );
      });
    });
  } else {
    res.status(403).json({
      error: "Vous n'avez pas les droit pour modifier cet utilisateur",
    });
  }
};
