const mongoose = require("mongoose");

//user schema
const userSchema = new mongoose.Schema({
  name: { type: String, maxlength: 50 },
  email: { type: String, trim: true, unique: 1 },
  password: { type: String, minlength: 5 },
  lastname: { type: String, maxlength: 50 },
  role: { type: Number, default: 0 },
  token: { type: String },
  tokenExp: { type: Number },
});

//user model
const User = mongoose.model("User", userSchema);

//export user model
module.exports = User;


