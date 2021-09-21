const router = require("express").Router();
const { isLoggedIn } = require("../middlewares/auth.config");
const Movie = require("../models/Movie.model");
const User = require("../models/User.model");
const Interest = require("../models/Interest.model");
const Connection = require("../models/Connection.model");
const Event = require("../models/Event.model");

// our routes here
router.get("/", isLoggedIn, (req, res, next) => {
  let movies;
  let user;
  let interest;
  let connections;
  Movie.find(
    { user: req.session.loggedInUser._id },
    {},
    { limit: 5, sort: { createdAt: -1 } }
  )
    .then((moviesFromDB) => {
      movies = moviesFromDB;
      return User.findById(req.session.loggedInUser._id);
    })
    .then((userFromDB) => {
      //console.log("the user:", userFromDB.following);
      user = userFromDB;
      console.log(user);
      return Interest.find({ user: user._id });
    })
    .then((userInterests) => {
      interest = userInterests;
      return Connection.find({ user: user._id }).populate("friend");
    })
    .then((connectionsFromDb) => {
      connections = connectionsFromDb;
      return Event.find(
        {
          attendees: { $in: user._id },
        },
        {},
        { limit: 2, sort: "date" }
      )
        .populate("host", "username profilePic")
        .populate("movieRelatedTo");
    })
    .then((events) => {
      res.render("private/profile", {
        movies,
        user,
        interest,
        connections,
        events,
      });
    })
    .catch((err) => next(err));
});

router.post("/unfollow", (req, res, next) => {
  const { connection } = req.body;
  Connection.findByIdAndDelete(connection)
    .then((connection) => {
      res.redirect("/profile");
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
