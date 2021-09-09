const router = require("express").Router();
const { isLoggedIn } = require("../middlewares/auth.config");
const Movie = require("../models/Movie.model");
const axios = require("axios");

//https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1` (Top rated route)
//https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1&include_adult=false (search movies route)

https: router.get("/random-movie", isLoggedIn, (req, res, next) => {
  let index = Math.floor(Math.random() * 20);
  axios
    .get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1`
    )
    .then((movieFromApi) => {
      console.log("Here is your movie", movieFromApi.data);

      res.render("movies/random-movie.hbs", {
        movie: movieFromApi.data.results[index],
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
