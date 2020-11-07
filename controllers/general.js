const express = require("express");
const router = express.Router(); //to add additional urls like app
const data = require("../static/data.js");
const model_login = require("../models/login.js");
const model_signUp = require("../models/signUp.js");
router.use(express.static("static"));

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
  res.render("general/welcome");
});
module.exports = router;
