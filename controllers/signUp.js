//product controller file
const express = require("express");
const router = express.Router(); //to add additional urls like app
router.use(express.static("static"));

router.get("/welcome", (req, res) => {
  res.render("signUp/welcome");
});

module.exports = router;
