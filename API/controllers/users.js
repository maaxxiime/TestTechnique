const User = require("../models/users.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  bcrypt

    // hash le mot de passe qui passe dans la requête axios
    .hash(req.body.password, 10)
    .then((hash) => {
      // créer la variable newUser et stock les données dedans
      const newUser = new User({
        pseudo: req.body.pseudo,
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        password: hash,
        telephone: req.body.telephone,
        adresse: req.body.adresse,
        complement: req.body.complement,
        codepostal: req.body.codepostal,
        ville: req.body.ville,
      });

      // sauvegarde newUser
      newUser
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé" }))
        .catch((err) =>
          res
            .status(401)
            .json({ message: "impossible de créer le compte", error: err })
        );
    })
    .catch((err) => res.status(500).json({ err }));
};

// utilisé sur Postman pour des tests
exports.read_all = (req, res, next) => {
  User.find()
    .then((u) => res.status(200).json({ message: "voici vos users", users: u }))
    .catch((err) => res.status(404).json({ err }));
};

exports.login = (req, res, next) => {
  // cherche un user dont l'email de la requête correspond à un email dans la base de donnée
  User.findOne({ email: req.body.email })
    .then((user) => {
      bcrypt
        // si user trouvé => compare les mot de passe
        .compare(req.body.password, user.password)
        .then((correspond) => {
          // si il ne corresponde pas
          if (!correspond) {
            res.status(401).json({ message: "mot de passe incorrect" });
          } else {
            // si il corresponde assign un token a l'user
            const token = jwt.sign(
              { userID: user._id, email: user.email },
              process.env.TOKEN_KEY,
              { expiresIn: "7d" }
            );
            res.status(200).json({
              message: "connexion réussi",
              pseudo: user.pseudo,
              nom: user.nom,
              prenom: user.prenom,
              email: user.email,
              telephone: user.telephone,
              adresse: user.adresse,
              complement: user.complement,
              codepostal: user.codepostal,
              ville: user.ville,
              userId: user.id,
              token: token,
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
    // si les deux correspondent, supprime l'user
    User.findByIdAndDelete(TargetId)
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

    User.findById(userID)

      .then((user) => {
      // créer la variable updateUser et stock les données dedans
        const updateUser = {
          email: req.body.email,
          adresse: req.body.adresse,
          complement: req.body.complement,
          codepostal: req.body.codepostal,
          ville: req.body.ville,
        };

          // fait la modification
          user.updateOne(updateUser)
          .then(() =>
          res.status(200).json({
            message: "Votre compte est modifié",
            pseudo: user.pseudo,
            nom: user.nom,
            prenom: user.prenom,
            email: updateUser.email,
            telephone: user.telephone,
            adresse: updateUser.adresse,
            complement: updateUser.complement,
            codepostal: updateUser.codepostal,
            ville: updateUser.ville,
            userId: user.id,
            token: token,
          })
          )
          .catch((err) =>
            res
              .status(404)
              .json({ message: "utilisateur introuvable", error: err })
          );
      })
      .catch((err) =>
        res.status(500).json({ error: err })
      );
  } else {
    res.status(403).json({
      error: "Vous n'avez pas les droit pour modifier cet utilisateur",
    });
  }
};
