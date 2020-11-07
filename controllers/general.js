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
// welcome dashboard ---------------------------------------------------
router.get("/welcome", (req, res) => {
  res.status(200).render("signUp/welcome");
});
//signUp -----------------------------------------------------------------------------
router.get("/signUp", (req, res) => {
  res.status(200).render("general/signUp");
});
//signUp validation-------------------------------------------------------------------
router.post("/signUp", (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  let result = {};
  let validFN,
    validLN,
    validE,
    validP = false;
  result.firstName = firstName;
  result.lastName = lastName;
  result.email = email;
  result.password = password;
  //check first name
  if (!firstName) {
    result.msgFN = "Enter your first name";
    validFN = false;
  } else validFN = true;
  //check last name
  if (!lastName) {
    result.msgLN = "Enter your last name";
    validLN = false;
  } else validLN = true;
  //check email
  if (!email) {
    result.msgId = "Enter an email address";
    validE = false;
  } else if (!email.match(/..*@..*\..*/)) {
    //must have @ and . and at least one character between them.
    result.msgId = "Please enter a valid email";
    validE = false;
  } else if (email.match(/(?=.*["%$+])/)) {
    result.msgId = 'Email must not contain "%$+';
    validE = false;
  } else validE = true;
  //check password
  if (!password) {
    result.msgPwd = "Enter your password";
    validP = false;
  } else if (!password.match(/.{6,12}/)) {
    result.msgPwd = "Password must be 6-12 characters";
    validP = false;
  } else if (
    !password.match(
      /^(?=.*[0-9])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[\]:;<>,.?/~_+-=|]).{6,12}$/
    )
  ) {
    result.msgPwd =
      "Password must contain 1 digit, upper case, special character";
    validP = false;
  } else validP = true;
  //if valid information, send message
  if (validFN && validLN && validE && validP) {
    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

    const msg = {
      to: "yuriyoonkim@gmail.com",
      from: "yryoon@myseneca.ca",
      subject: `Welcome to Friendly Veggies! ${firstName} ${lastName}`,
      html: `Welcome ${firstName} ${lastName}!<br>
              Please enjoy our tasty and healthy meals`,
    };
    // Asyncronously sends the email
    sgMail
      .send(msg)
      .then(() => {
        res.redirect("/signUp/welcome");
      })
      .catch((err) => {
        console.log(`Error : ${err}`);
        res.render("general/signUp");
      });
  } else {
    res.render("general/signUp", result);
  }
});
// on the menu page -----------------------------------------------------
router.get("/onTheMenu", (req, res) => {
  res.status(200).render("general/onTheMenu", data.recipe);
});

module.exports = router;
