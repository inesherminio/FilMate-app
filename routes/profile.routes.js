const router = require("express").Router();
const { isLoggedIn } = require("../middlewares/auth.config");

// our routes here
router.get("/", isLoggedIn, (req, res, next) => {
  res.render("private/profile");
});

module.exports = router;
