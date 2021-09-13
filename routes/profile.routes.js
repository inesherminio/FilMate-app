const router = require("express").Router();
const { isLoggedIn } = require("../middlewares/auth.config");
const Movie = require("../models/Movie.model");
const User = require("../models/User.model");
const Interest = require("../models/Interest.model");

// our routes here
router.get("/", isLoggedIn, (req, res, next) => {
  let movies;
  let user;
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
    .then((userFromDB) => {
      user = userFromDB;
      return Interest.find();
    })
    .then((interest) => {
      res.render("private/profile", {
        movies,
        user,
        interest,
      });
    })
    .catch((err) => next(err));
});

router.post("/", isLoggedIn, (req, res, next) => {
  const { activity } = req.body;
  Interest.create({
    activity,
    user: req.session.loggedInUser._id,
  })
    .then((yourActivity) => {
      console.log("here is your interest:", { yourActivity });
      res.redirect("/profile");
    })
    .catch((err) => next(err));
});

router.post("/", isLoggedIn, (req, res, nect) => {
  const { activity } = req.body;
  Interest.findOneAndDelete({
    activity,
  }).then(() => {
    res.redirect("/profile");
  });
});

module.exports = router;
