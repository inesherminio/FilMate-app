const router = require("express").Router();
const { default: axios } = require("axios");
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

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  let movieFromDb;
  Movie.find({
    movieId: id,
  })
    .populate("user", "username profilePic")
    .then((movies) => {
      movieFromDb = movies;
      console.log("here are movies from db:", movies);
      return axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=609f1b0969bd3b2e770487ab8987193b&language=en-US`
      );
    })
    .then((movieFromApi) => {
      console.log("here are movies from api:", movieFromApi);
      res.render("movies/movie-detail", {
        movieFromDb,
        movieFromApi: movieFromApi.data,
      });
    })
    .catch((err) => next(err));
});

router.post("/:id", (req, res, next) => {});

module.exports = router;
