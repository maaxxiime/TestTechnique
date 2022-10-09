const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");


const userSchema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    identifiant: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);