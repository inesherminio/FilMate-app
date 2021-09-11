const router = require("express").Router();
const { isLoggedIn } = require("../middlewares/auth.config");
const Movie = require("../models/Movie.model");
const User = require("../models/User.model");

// our routes here
router.get("/", isLoggedIn, (req, res, next) => {
  let movies;
  Movie.find({ user: req.session.loggedInUser._id }, {}, { limit: 5 })
    .then((moviesFromDB) => {
      movies = moviesFromDB;
      return User.find().populate("following");
    })
    .then((user) => {
      //console.log(user.interests[0]);
      const { interests, following } = user;
      res.render("private/profile", {
        movies,
        interests,
        following,
      });
    })
    .catch((err) => next(err));
});

module.exports = router;
