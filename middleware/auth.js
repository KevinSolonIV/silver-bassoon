const passport = require("passport");

module.exports = {
  ensureAuth: function (req, res, next) {
    console.log("........req:\n", req)
    console.log("........session:\n", req.session)
    console.log("........passport:\n", req.session.passport)
    if (req.session.passport.user !== undefined) {
      return next();
    } else {
      console.log("Failed to verify auth: redirecting to home")
      res.redirect("/");
    }
  },
};
