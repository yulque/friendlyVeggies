const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const router = express.Router(); //to add additional urls like app
const data = require("../static/data.js");
const model_login = require("../models/login.js");
const model_signUp = require("../models/signUp.js");
const model_fileUpload = require("../models/fileUpload");
const model_loadingData = require("../models/loadingData.js");
const model_updateData = require("../models/updateData.js");

const multer = require("multer");
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "static/uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    },
  }),
});

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(express.static("static"));
router.use("/dashboard", express.static("static"));
router.use("/dashboard/dataClerk", express.static("static"));
function requireLogin(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/login");
  }
}
// edit it later->
// router.all("/dashboard/*", requireLogin, (req, res, next) => {
//   next();
// });
// index
router.get("/", model_loadingData.loadAllData);
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
router.get("/dashboard/dataClerk/createMealKit", (req, res) => {
  res.render("general/dashboard/createMealKit");
});
router.post(
  "/dashboard/dataClerk/createMealKit",
  upload.single("imageUpload"),
  model_fileUpload.uploadMealKit
  //
);

router.get("/dashboard/dataClerk/viewAllMeals", model_loadingData.loadAllData);
router.post("/dashboard/dataClerk/viewAllMeals", model_updateData.updateData);
//logout

router.get("/logOut", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});
// on the menu page
router.get("/onTheMenu", model_loadingData.loadAllData);

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
