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
      return User.findById(req.session.loggedInUser._id).populate("following");
    })
    .then((userFromDB) => {
      user = userFromDB;
      return Interest.find({ user: user._id });
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

router.post("/create", isLoggedIn, (req, res, next) => {
  const { activity } = req.body;
  let interests;
  Interest.create({
    activity,
    user: req.session.loggedInUser._id,
  })
    .then((yourActivity) => {
      console.log("here is your interest:", { yourActivity });
      return Interest.find({ user: req.session.loggedInUser._id });
    })
    .then((userInterests) => {
      interests = userInterests;
      return User.findByIdAndUpdate(
        req.session.loggedInUser._id,
        { interests: interests },
        { new: true }
      );
    })
    .then((user) => {
      res.redirect("/profile");
    })
    .catch((err) => next(err));
});

router.post("/delete", isLoggedIn, (req, res, next) => {
  const { activity } = req.body;
  let interests;
  //console.log("here's activity:", activity);
  Interest.findByIdAndDelete(activity)
    .then((activity) => {
      return Interest.find({ user: req.session.loggedInUser._id });
    })
    .then((userInterests) => {
      interests = userInterests;
      return User.findByIdAndUpdate(
        req.session.loggedInUser._id,
        { interests: interests },
        { new: true }
      );
    })
    .then((user) => {
      res.redirect("/profile");
    })
    .catch((err) => next(err));
});

module.exports = router;
