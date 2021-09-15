const router = require("express").Router();
const { default: axios } = require("axios");
const { connection } = require("mongoose");
const { isLoggedIn } = require("../middlewares/auth.config");
const Connection = require("../models/Connection.model");
const Movie = require("../models/Movie.model");
const User = require("../models/User.model");

router.get("/", isLoggedIn, (req, res, next) => {
  let movies;
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
      //console.log(user.interests);
      res.render("movies/movie-list", {
        movies,
        interests: user.interests,
      });
    })
    .catch((err) => next(err));
});

router.get("/search", (req, res, next) => {
  console.log("filter choices", req.query);
  const { genre, decision, rank } = req.query;
  let query = { user: req.session.loggedInUser._id };
  if (genre) {
    query.genre = { $in: genre };
  }
  if (decision) {
    query.decision = decision;
  }
  if (rank) {
    query.rank = rank;
  }
  let movies;
  Movie.find(query, {}, { sort: { createdAt: -1 } })
    .then((userMovies) => {
      movies = userMovies;
      console.log(movies);
      return User.findById(req.session.loggedInUser._id).populate("interests");
    })
    .then((user) => {
      //console.log(user.interests);
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
  let movieFromApi;
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
    .then((movie) => {
      //console.log("here are movies from api:", movieFromApi);
      movieFromApi = movie;
      return User.findById(
        req.session.loggedInUser._id,
        "_id username following"
      ).populate({
        path: "following",
        populate: {
          path: "friend",
          select: "username",
        },
      });
    })
    .then((user) => {
      //console.log(user.following[0].friend);
      res.render("movies/movie-detail", {
        movieFromDb,
        movieFromApi: movieFromApi.data,
        user: user.following,
      });
    })
    .catch((err) => next(err));
});

router.post("/:id", (req, res, next) => {
  const { id } = req.params;
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
      res.redirect(`/movie-list/${id}`);
    })
    .catch((err) => next(err));
});

module.exports = router;
