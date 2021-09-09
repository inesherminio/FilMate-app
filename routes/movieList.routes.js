const router = require("express").Router();
const { isLoggedIn } = require("../middlewares/auth.config");

router.get("/", isLoggedIn, (req, res, next) => {
  res.render("movies/movie-list.hbs");
});

module.exports = router;
