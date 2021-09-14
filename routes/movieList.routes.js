const router = require("express").Router();
const { default: axios } = require("axios");
const { connection } = require("mongoose");
const { isLoggedIn } = require("../middlewares/auth.config");
const Connection = require("../models/Connection.model");
const Movie = require("../models/Movie.model");
const User = require("../models/User.model");

router.get("/", isLoggedIn, (req, res, next) => {
  let movies;
  console.log(req.body);
  Movie.find(
    { user: req.session.loggedInUser._id },
    {},
    { sort: { createdAt: -1 } }
  )
    .then((userMovies) => {
      movies = userMovies;
      return User.findById(req.session.loggedInUser._id).populate("interests");
    })
    .then((user) => {
      console.log(user.interests);
      res.render("movies/movie-list", {
        movies,
        interests: user.interests,
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
    user: { $ne: req.session.loggedInUser._id },
  })
    .populate("user", "username profilePic")
    .then((movies) => {
      movieFromDb = movies;
      //console.log("here are movies from db:", movies);
      return axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=609f1b0969bd3b2e770487ab8987193b&language=en-US`
      );
    })
    .then((movieFromApi) => {
      //console.log("here are movies from api:", movieFromApi);
      res.render("movies/movie-detail", {
        movieFromDb,
        movieFromApi: movieFromApi.data,
      });
    })
    .catch((err) => next(err));
});

router.post("/:id", (req, res, next) => {
  const { user } = req.body;
  let connections;
  Connection.create({ friend: user, user: req.session.loggedInUser._id })
    .then((followee) => {
      return Connection.find({ user: req.session.loggedInUser._id });
    })
    .then((userConnections) => {
      connections = userConnections;
      return User.findByIdAndUpdate(
        req.session.loggedInUser._id,
        { following: connections },
        { new: true }
      );
    })
    .then((user) => {
      res.redirect("/movie-list");
    })
    .catch((err) => next(err));
});

module.exports = router;
