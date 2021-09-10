const router = require("express").Router();
const { isLoggedIn } = require("../middlewares/auth.config");
const Movie = require("../models/Movie.model");

router.get("/", isLoggedIn, (req, res, next) => {
  Movie.find({ user: req.session.loggedInUser._id })
    .then((movies) => {
      res.render("movies/movie-list.hbs", { movies });
    })
    .catch((err) => next(err));
});

router.post("/", isLoggedIn, (req, res, next) => {});

module.exports = router;
