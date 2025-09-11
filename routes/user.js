const express = require("express");
const router = express.Router({ mergeParams: true });
exports.router = router;
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userControllables = require("../controllers/user.js");
// router.get("/", (req, res) => {
//   res.render("/users/signUp.ejs");
// });

router
  .route("/signup")
  .get(userControllables.renderSignupForm)
  .post(wrapAsync(userControllables.signup));

router
  .route("/login")
  .get(userControllables.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userControllables.login
  );

router.get("/logout", userControllables.logout);
module.exports = router;
