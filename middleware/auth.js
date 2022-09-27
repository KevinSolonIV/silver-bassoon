module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      console.log("Auth: " + isAuthenticated())
      console.log("Failed to verify auth: redirecting to home")
      res.redirect("/");
    }
  },
};
