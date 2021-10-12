module.exports = {
  isLoggedIn: (req, res, next) => {
    if (req.session.loggedInUser) {
      req.app.locals.loggedInUser = req.session.loggedInUser;
      req.app.locals.isLoggedIn = true;
      req.app.locals.cookie = cookie;
      next();
    } else {
      res.redirect("/");
    }
  },
};
