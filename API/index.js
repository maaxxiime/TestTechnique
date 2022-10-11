const express = require("express");
const helmet = require("helmet");
// const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const compression = require("compression");

// ROUTES
const usersRoutes = require("./routes/users.js");

// port de l'API
const port = 8000;

require("dotenv").config();

// connexion entre l'API et la base de donnée
mongoose
  .connect(process.env.DB_ACCESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connecté à MongoDB !"))
  .catch((err) => console.log(err));

const app = express();



app.use(helmet());


// CORS / type de requête autorisé
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH",
  );
  res.setHeader(
    "Cross-Origin-Resource-Policy",
    "cross-origin"
  );
  next();
});

// bodyParser donne l'accés à req.body c'est-à-dire le body des requêtes
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// compression réduit la taille et la vitesse de la requête donc augmente également la vitesse de l'application
app.use(compression());


// défini la route que doit prendre une requête selon l'URL
app.use("/api/users", usersRoutes);

app.listen(port, () => console.log("📡 LISTENING ON PORT " + port));
