const router = require("express").Router();
const { isLoggedIn } = require("../middlewares/auth.config");
const Movie = require("../models/Movie.model");
const axios = require("axios");

//https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1` (Top rated route)
//https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1&include_adult=false (search movies route)

router.get("/random-movie", isLoggedIn, (req, res, next) => {
  let index = Math.floor(Math.random() * 20);
  let page = Math.floor(Math.random() * 500);
  axios
    .get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`
    )
    .then((movieFromApi) => {
      console.log(movieFromApi.data.results[index]);
      res.render("movies/random-movie.hbs", {
        movie: movieFromApi.data.results[index],
      });
    });
});

//! review route bellow
router.post("/", isLoggedIn, (req, res, next) => {
  const { title, image, decision, movieId } = req.body;
  const { loggedInUser } = req.session;
  Movie.create({ title, image, user: loggedInUser, decision, movieId })
    .then((movie) => {
      console.log("You made a decision on this movie:", movie.populate("user"));
      res.redirect("/movie/random-movie");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
