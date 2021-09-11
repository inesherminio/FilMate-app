const router = require("express").Router();
const { isLoggedIn } = require("../middlewares/auth.config");
const Movie = require("../models/Movie.model");
const User = require("../models/User.model");

router.get("/", isLoggedIn, (req, res, next) => {
  Movie.find(
    { user: req.session.loggedInUser._id },
    {},
    { limit: 5, sort: { createdAt: -1 } }
  )
    .populate("alternativeOptions", "interests")
    .then((movies) => {
      res.render("movies/movie-list", {
        movies,
      });
    })
    .catch((err) => next(err));
});

router.post("/", isLoggedIn, (req, res, next) => {
  const { movieId, rank, alternative } = req.body;
  Movie.findByIdAndUpdate(movieId, { rank, alternative }, { new: true })
    .then((movie) => {
      console.log(movie);
      res.redirect("/movie-list");
    })
    .catch((err) => next(err));
});

module.exports = router;
