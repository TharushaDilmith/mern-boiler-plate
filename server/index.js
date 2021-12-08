const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/user");
const config = require("./config/key");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { auth } = require("./middleware/auth");

//connect to mongoose local database
mongoose
  .connect(config.mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error:", err.message);
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/api/user/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req._id,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
  });
});

//register routes
app.use("/api/users/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true, userData: user });
  });
});

//login routes
app.use("/api/users/login", (req, res) => {
  //find the email
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Auth failed, email not found",
      });

    //compare password
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "Wrong password" });

      //generate token
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res
          .cookie("w_auth", user.token)
          .status(200)
          .json({ loginSuccess: true });
      });
    });
  });
});

//logout routes
app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

//define port
const port = process.env.PORT || 5000;

//listen on port 5000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
