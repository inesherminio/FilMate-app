const router = require("express").Router();
const { isLoggedIn } = require("../middlewares/auth.config");
const Movie = require("../models/Movie.model");
const axios = require("axios");

router.get("/random-movie", isLoggedIn, (req, res, next) => {
  let movieData;
  let index;
  axios
    .get(
      `
https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1`
    )
    .then((movieFromApi) => {
      console.log("Here is your movie", movieFromApi.data.results.length);
      movieData = movieFromApi.data;
      res.render("movies/random-movie.hbs", {
        movie: movieData,
      });
    });
});

router.post("/", isLoggedIn, (req, res, next) => {
  const { title, image, user, decision } = req.body;
  Movie.create({ title, image, user, decision })
    .then((movie) => {
      console.log("You made a decision on this movie:", movie);
      res.redirect("/movie");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
