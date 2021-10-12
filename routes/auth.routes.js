const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const fileUploader = require("../middlewares/cloudinary.config");

// Our routes go here
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", fileUploader.single("imageUrl"), (req, res, next) => {
  const { username, email, password, passwordCheck } = req.body;
  const profilePic = req.file?.path;

  //* Check if user filled all required info
  if (!username || !email || !password || !passwordCheck) {
    res.render("auth/signup", {
      signUpErr: "Please fill in all of the information",
    });
    return;
  }

  //* Check email format
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(email)) {
    res.render("auth/signup", { signUpErr: "Please present a valid email" });
    return;
  }

  //* Check if password and passwordCheck are the same
  if (password !== passwordCheck) {
    res.render("auth/signup", { signUpErr: "Passwords do not match" });
    return;
  }

  //* Check if password meets strength requirements
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  if (!passwordRegex.test(password)) {
    res.render("auth/signup", {
      signUpErr:
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 8 digits",
    });
    return;
  }

  //* Check if username and email are unique
  User.findOne({ $or: [{ username }, { email }] })
    .then((user) => {
      if (user) {
        res.render("auth/signup", {
          signUpErr: "That user already exists",
        });
      } else {
        //* Encrypt password
        const salt = bcrypt.genSaltSync(12);
        const hashedPassword = bcrypt.hashSync(password, salt);

        //* Create user in DB
        User.create({ username, email, password: hashedPassword, profilePic })
          .then((user) => {
            res.redirect("/");
          })
          .catch((err) => {
            next(err);
          });
      }
    })
    .catch((err) => next(err));
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  //* Check if user filled all required info
  if (!email || !password) {
    res.render("index", {
      logInErr: "Please fill in all of the information",
    });
    return;
  }

  //* Check if the user exists in the DB
  User.findOne({ email })
    .then((user) => {
      if (user) {
        //* Check if password matches
        const passwordCheck = bcrypt.compareSync(password, user.password);
        if (passwordCheck) {
          //* Authenticate the user
          req.session.loggedInUser = user;
          res.redirect("/profile");
        } else {
          res.render("index", {
            logInErr: "Wrong password",
          });
        }
      } else {
        res.render("index", {
          logInErr: "The user does not yet exist",
        });
      }
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/logout", (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
