const router = require("express").Router();
const { isLoggedIn } = require("../middlewares/auth.config");
const Movie = require("../models/Movie.model");

router.get("/", isLoggedIn, (req, res, next) => {
  res.render("movies/random-movie.hbs");
});

router.post("/", isLoggedIn, (req, res, next) => {
  const { decision, alternative } = req.body;
  Movie.create({ decision, alternative })
    .then((movie) => {
      console.log("You made a decision on this movie:", movie);
      res.redirect("movies/random-movies.hbs");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
