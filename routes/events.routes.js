const router = require("express").Router();
const User = require("../models/User.model");
const Movie = require("../models/Movie.model");
const Event = require("../models/Event.model");
const { isLoggedIn } = require("../middlewares/auth.config");

//our routes
router.get("/", isLoggedIn, (req, res, next) => {
  let movies;
  Movie.find({ user: req.session.loggedInUser._id })
    .then((userMovies) => {
      movies = userMovies;
      return User.findById(req.session.loggedInUser._id).populate({
        path: "following",
        select: "friend",
        populate: {
          path: "friend",
          select: "_id username",
        },
      });
    })
    .then((user) => {
      //console.log("testing user", user.following);
      let friendsArr = [];
      user.following.forEach((friend) => {
        friendsArr.push(friend.friend);
      });
      return Event.find(
        {
          $and: [
            { $or: [{ host: user._id }, { host: { $in: friendsArr } }] },
            { date: { $gt: Date.now() } },
          ],
        },
        {},
        { sort: "date" }
      )
        .populate("host", "username profilePic")
        .populate("movieRelatedTo");
    })
    .then((events) => {
      res.render("events/events-list", { movies, events });
    })
    .catch((err) => next(err));
});

router.post("/create", isLoggedIn, (req, res, next) => {
  console.log(req.body);
  const { name, movieRelatedTo, date, description, host, link, attendees } =
    req.body;

  //* Check if user filled all required info
  if (!name || !movieRelatedTo || !date || !description || !host) {
    res.redirect("/events");
    return;
  }

  Event.create({
    name,
    movieRelatedTo,
    date,
    description,
    host,
    link,
    attendees,
  })
    .then((event) => {
      res.redirect("/events");
    })
    .catch((err) => next(err));
});

router.post("/attend", isLoggedIn, (req, res, next) => {
  const { attendee, eventId } = req.body;
  let attendeesArr = [attendee];
  Event.findById(eventId)
    .then((event) => {
      event.attendees.forEach((attendee) => {
        attendeesArr.push(attendee);
      });
      return Event.findByIdAndUpdate(
        eventId,
        { attendees: attendeesArr },
        { new: true }
      );
    })
    .then((updatedEvent) => {
      res.redirect("/events");
    })
    .catch((err) => next(err));
});

router.post("/unattend", isLoggedIn, (req, res, next) => {
  const { attendee, eventId } = req.body;
  let attendeesArr = [];
  Event.findById(eventId)
    .then((event) => {
      event.attendees.forEach((attendee) => {
        if (attendee != req.session.loggedInUser._id) {
          attendeesArr.push(attendee);
        }
      });
      console.log("unattend", req.session.loggedInUser._id, attendeesArr);
      return Event.findByIdAndUpdate(
        eventId,
        { attendees: attendeesArr },
        { new: true }
      );
    })
    .then((updatedEvent) => {
      res.redirect("/events");
    })
    .catch((err) => next(err));
});

module.exports = router;
