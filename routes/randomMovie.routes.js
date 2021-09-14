const router = require("express").Router();
const { isLoggedIn } = require("../middlewares/auth.config");
const Movie = require("../models/Movie.model");
const axios = require("axios");

//https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1` (Top rated route)
//https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1&include_adult=false (search movies route)

router.get("/", isLoggedIn, (req, res, next) => {
  let index = Math.floor(Math.random() * 20);
  let page = Math.floor(Math.random() * 500);
  let movieData;
  axios
    .get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
    )
    .then((movieFromApi) => {
      //console.log(movieFromApi.data.results[index]);
      movieData = movieFromApi.data.results[index];
      return axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.MOVIE_API_KEY}&language=en-US`
      );
    })
    .then((genres) => {
      //console.log(genres.data.genres);
      const movie = {
        ...JSON.parse(JSON.stringify(movieData)),
        genre_names: [],
      };
      for (let i = 0; i < movie.genre_ids.length; i++) {
        for (let j = 0; j < genres.data.genres.length; j++) {
          if (movie.genre_ids[i] === genres.data.genres[j].id) {
            movie.genre_names.push(genres.data.genres[j].name);
          }
        }
      }
      res.render("movies/random-movie.hbs", {
        movie,
      });
    })
    .catch((err) => next(err));
});

router.post("/", isLoggedIn, (req, res, next) => {
  const { title, image, decision, movieId, genre } = req.body;
  const { loggedInUser } = req.session;
  Movie.create({
    title,
    image,
    user: loggedInUser,
    decision,
    movieId,
    genre,
    alternativeOptions: loggedInUser,
  })
    .then((movie) => {
      //console.log("You made a decision on this movie:", movie.populate("user"));
      res.redirect("/random-movie");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
