const router = require("express").Router();
const { isLoggedIn } = require("../middlewares/auth.config");
const Movie = require("../models/Movie.model");
const User = require("../models/User.model");

// our routes here
router.get("/", isLoggedIn, (req, res, next) => {
  let movies;
  Movie.find(
    { user: req.session.loggedInUser._id },
    {},
    { limit: 5, sort: { createdAt: -1 } }
  )
    .then((moviesFromDB) => {
      movies = moviesFromDB;
      return User.findById(req.session.loggedInUser._id).populate(
        "following",
        "following"
      );
    })
    .then((user) => {
      console.log(user);
      const { interests, following } = user;
      res.render("private/profile", {
        movies,
        interests,
        following,
      });
    })
    .catch((err) => next(err));
});

router.post("/", isLoggedIn, (req, res, next) => {
  const { inInterest, outInterest } = req.body;

  User.findOneAndUpdate(
    { user: req.session.loggedInUser._id },
    { $push: { interests: inInterest }, $pull: { interests: outInterest } },
    { new: true }
  )
    .then(() => {
      res.redirect("/profile");
    })
    .catch((err) => next(err));
});

module.exports = router;
