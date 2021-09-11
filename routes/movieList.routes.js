const router = require("express").Router();
const { isLoggedIn } = require("../middlewares/auth.config");
const Movie = require("../models/Movie.model");

router.get("/", isLoggedIn, (req, res, next) => {
  Movie.find(
    { user: req.session.loggedInUser._id },
    {},
    { sort: { createdAt: -1 } }
  )
    .then((movies) => {
      res.render("movies/movie-list.hbs", { movies });
    })
    .catch((err) => next(err));
});

router.post("/", isLoggedIn, (req, res, next) => {
  const { movieId, rank } = req.body;
  Movie.findByIdAndUpdate(movieId, { rank }, { new: true })
    .then((movie) => {
      console.log(movie);
      res.redirect("/movie-list");
    })
    .catch((err) => next(err));
});

module.exports = router;
