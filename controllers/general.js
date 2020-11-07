//general router
const express = require("express");
const router = express.Router(); //to add additional urls like app
const data = require("../static/data.js");
router.use(express.static("static"));

//index--------------------
router.get("/", (req, res) => {
  res.status(200).render("general/home", data.recipe);
});
//login-----------------------------------------------------------------------------
router.get("/logIn", (req, res) => {
  if (req.method == "GET") res.status(200).render("general/login");
});
//login validation-------------------------------------------------------------------
router.post("/login", (req, res) => {
  const { userId, userPassword } = req.body;
  let result = {};
  let validation = false;
  //check id
  if (userId == "") {
    result.msgId = "Enter your id";
    result.userName = userId;
    validation = false;
  } else {
    result.userName = userId;
    validation = true;
  }
  //check password
  if (userPassword == "") {
    result.msgPwd = "Enter your password";
    result.userPassword = userPassword;
    validation = false;
  } else {
    result.userPassword = userPassword;
    if (validation) validation = true;
  }
  //validation check
  if (validation) {
    res.redirect("/");
  } else res.status(200).render("general/login", result);
});
// on the menu page -----------------------------------------------------
router.get("/onTheMenu", (req, res) => {
  res.status(200).render("general/onTheMenu", data.recipe);
});

module.exports = router;
