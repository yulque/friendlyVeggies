const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const data = require("./static/data.js");
const HTTP_PORT = process.env.PORT || 8080;
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dotenv = require("dotenv");
dotenv.config({ path: "./config/keys.env" });

// Call this function after the http server starts listening for requests.
function onHttpStart() {
  console.log("Express http server listening on port: " + HTTP_PORT);
}

app.set("views", __dirname + "/views");
app.engine("handlebars", exphbs());
app.engine(".hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", "handlebars");

//  static resources
app.use(express.static("static"));

//controller -----------------------------------------------------------
app.get("/", (req, res) => {
  res.status(200).render("home", data.recipe);
});
//login-----------------------------------------------------------------------------
app.get("/logIn", (req, res) => {
  if (req.method == "GET") res.status(200).render("login");
});
//login validation-------------------------------------------------------------------
app.post("/login", (req, res) => {
  const { userId, userPassword } = req.body;
  let result = {};
  let validation = false;
  //check id
  if (userId == "") {
    result.msgId = "Enter your id";
    result.userName = userId;
  } else result.userName = userId;
  //check password
  if (userPassword == "") {
    result.msgPwd = "Enter your password";
    result.userPassword = userPassword;
  } else {
    result.userPassword = userPassword;
    validation = true;
  }
  //validation check
  if (validation) {
    res.render("home");
  } else res.status(200).render("login", result);
});
//signUp -----------------------------------------------------------------------------
app.get("/signUp", (req, res) => {
  res.status(200).render("signUp");
});
//signUp validation-------------------------------------------------------------------
app.post("/signUp", (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  let result = {};
  let validation = false;
  result.firstName = firstName;
  result.lastName = lastName;
  result.email = email;
  result.password = password;
  //check first name
  if (!firstName) {
    result.msgFN = "Enter your first name";
  }
  //check last name
  if (!lastName) {
    result.msgLN = "Enter your last name";
  }
  //check email
  if (!email) {
    result.msgId = "Enter an email address";
  } else if (!email.match(/..*@..*\..*/)) {
    //must have @ and . and at least one character between them.
    result.msgId = "Please enter a valid email";
  } else if (email.match(/(?=.*["%$+])/)) {
    result.msgId = 'Email must not contain "%$+';
  }

  //check password
  if (!password) {
    result.msgPwd = "Enter your password";
  } else if (!password.match(/.{6,12}/)) {
    result.msgPwd = "Password must be 6-12 characters";
  } else if (
    !password.match(
      /^(?=.*[0-9])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[\]:;<>,.?/~_+-=|]).{6,12}$/
    )
  ) {
    result.msgPwd =
      "Password must contain 1 digit, upper case, special character";
  } else validation = true;

  //if valid information, send message
  if (validation) {
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
        res.redirect("/welcome");
      })
      .catch((err) => {
        console.log(`Error : ${err}`);
        res.render("signUp");
      });
  } else {
    res.render("signUp", result);
  }
});
// on the menu page -----------------------------------------------------
app.get("/onTheMenu", (req, res) => {
  res.status(200).render("onTheMenu", data.recipe);
});
// welcome dashboard ---------------------------------------------------
app.get("/welcome", (req, res) => {
  res.status(200).render("welcome");
});
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

app.listen(HTTP_PORT, onHttpStart);
