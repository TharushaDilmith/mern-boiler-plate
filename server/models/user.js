const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//salt rounds for password hashing
var saltRounds = 10;

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

//hashing a password before saving it to the database
userSchema.pre("save", function (next) {
  //user is the current document
  var user = this;

  //check if the password has been modified
  if (user.isModified("password")) {
    //generate a salt
    bcrypt.genSalt(saltRounds, function (err, salt) {
      //return an error if one occured
      if (err) return next(err);
      //hash the password using our new salt
      bcrypt.hash(user.password, salt, function (err, hash) {
        //return an error if one occured
        if (err) return next(err);
        //override the plain text password with the hashed one
        user.password = hash;
        //continue saving the user
        next();
      });
    });
  } else {
    //continue saving the user
    next();
  }
});

//method to compare password for login
userSchema.methods.comparePassword = function (plainPassword, cb) {
  //compare the password with the hash
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    //return an error if one occured
    if (err) return cb(err);
    //return the result
    cb(null, isMatch);
  });
};

//method to generate token
userSchema.methods.generateToken = function (cb) {
  //user is the current document
  var user = this;
  //create a token with the user id and a secret
  var token = jwt.sign(user._id.toHexString(), "secret");
  //set the token property
  var oneHour = 60 * 60;

  //create a new token
  user.token = token;
  //set the expiration to an hour
  user.tokenExp = Date.now() + oneHour;

  //save the user
  user.save(function (err, user) {
    //return an error if one occured
    if (err) return cb(err);
    //return the token if no error
    cb(null, user);
  });
};

//statics to find a user by token
userSchema.statics.findByToken = function (token, cb) {
  //find a user by its token property
  var user = this;

  //decode the token
  jwt.verify(token, "secret", function (err, decoded) {
    //return an error if one occured
    if (err) return cb(err);
    //find the user by its id
    user.findOne({ "_id": decoded, "token": token }, function (err, user) {
      //return an error if one occured
      if (err) return cb(err);
      //return the user
      cb(null, user);
    });
  });
};

//user model
const User = mongoose.model("User", userSchema);

//export user model
module.exports = User;
