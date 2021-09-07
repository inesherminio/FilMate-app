const router = require("express").Router();

// our routes go here
router.post("/signup", (req, res, next) => {
  console.log("sign up form:", req.body);
});

module.exports = router;
