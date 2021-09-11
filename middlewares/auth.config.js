module.exports = {
  isLoggedIn: (req, res, next) => {
    if (req.session.loggedInUser) {
      req.app.locals.loggedInUser = req.session.loggedInUser;
      req.app.locals.isLoggedIn = true;
      next();
    } else {
      res.redirect("/");
    }
  },
};
