const router = require("express").Router();
const axios = require("axios");
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

router.get("/search", isLoggedIn, (req, res, next) => {
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

router.get("/:id", isLoggedIn, (req, res, next) => {
  const { id } = req.params;
  let movieFromDb;
  let movieFromApi;
  let friendsArr = [];
  let user;
  Movie.find({
    movieId: id,
    user: { $ne: req.session.loggedInUser._id },
  })
    .populate("user", "username profilePic")
    .then((movies) => {
      movieFromDb = movies;
      console.log("here are movies from db:", movies);
      return axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=609f1b0969bd3b2e770487ab8987193b&language=en-US`
      );
    })
    .then((movie) => {
      //console.log("here are movies from api:", movieFromApi);
      movieFromApi = movie;
      return User.findById(req.session.loggedInUser._id).populate({
        path: "following",
        select: "friend",
        populate: {
          path: "friend",
          select: "_id username",
        },
      });
    })
    .then((userVar) => {
      //console.log(user.following[0].friend);
      user = userVar;
      user.following.forEach((friend) => {
        friendsArr.push(friend.friend.username);
      });
      return User.find({}, { username: 1, profilePic: 1 });
    })
    .then((allUsers) => {
      //console.log(friendsArr);
      const followedUsers = allUsers.map((user) => {
        return {
          ...JSON.parse(JSON.stringify(user)),
          isFollowed: friendsArr.includes(user.username),
          isFriend: user.username !== req.session.loggedInUser.username,
        };
      });
      res.render("movies/movie-detail", {
        movieFromDb,
        movieFromApi: movieFromApi.data,
        user: user,
        followedUsers,
      });
    })
    .catch((err) => next(err));
});

router.post("/:id", isLoggedIn, (req, res, next) => {
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
