const express = require("express");
const router = express.Router(); //to add additional urls like app
const data = require("../static/data.js");
const model_login = require("../models/login.js");
const model_signUp = require("../models/signUp.js");
router.use(express.static("static"));
router.use("/dashboard", express.static("static"));
function requireLogin(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/login");
  }
}
router.all("/dashboard/*", requireLogin, (req, res, next) => {
  next();
});
// index
router.get("/", (req, res) => {
  res.status(200).render("general/home", data.recipe);
});
// login
router.get("/logIn", (req, res) => {
  if (req.method == "GET") res.status(200).render("general/login");
});
// login validation
router.post("/login", model_login.validate_user);
// loggedin dashboard for user

router.get("/dashboard/user", (req, res) => {
  res.status(200).render("general/dashboard/dashboardUser");
});
// loggedin dashboard for data clerk
router.get("/dashboard/dataClerk", (req, res) => {
  res.status(200).render("general/dashboard/dashboardDataClerk");
});

//logout
router.get("/logOut", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});
// on the menu page
router.get("/onTheMenu", (req, res) => {
  res.status(200).render("general/onTheMenu", data.recipe);
});
// signUp
router.get("/signUp", (req, res) => {
  res.status(200).render("general/signUp");
});
// signUp validation
router.post("/signUp", model_signUp.validateSignUp);

// signUp -> Welcome dashboard
router.get("/welcome", (req, res) => {
  res.render("general/dashboard/welcome");
});
module.exports = router;
