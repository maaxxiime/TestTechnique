const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema(
  {
    pseudo: {
      type: String,
      minLength: 4,
      maxLength: 30,
      trim: true,
      required: true,
    },
    nom: {
      type: String,
      minLength: 2,
      maxLength: 30,
      trim: true,
      required: true,
    },
    prenom: {
      type: String,
      minLength: 2,
      maxLength: 30,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      minlength: 4,
      maxLength: 40,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minLength: 6,
      maxLength: 200,
      trim: true,
      required: true,
    },
    telephone: {
      type: String,
      minLength: 10,
      maxLength: 10,
      trim: true,
      required: true,
      unique: true,
    },
    adresse: {
      type: String,
      minLength: 4,
      maxLength: 60,
      required: true,
    },
    complement: {
      type: String,
      minLength: 4,
      maxLength: 60,
      required: false,
    },
    codepostal: {
      type: String,
      minLength: 5,
      maxLength: 5,
      trim: true,
      required: true,
    },
    ville: {
      type: String,
      minLength: 2,
      maxLength: 50,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
