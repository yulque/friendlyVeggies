const express = require("express");
const app = express();
var exphbs = require("express-handlebars");
const data = require("./static/data.js");
const HTTP_PORT = process.env.PORT || 8080;
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Call this function after the http server starts listening for requests.
function onHttpStart() {
  console.log("Express http server listening on port: " + HTTP_PORT);
}

app.set("views", __dirname + "/views");
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

//  static resources
app.use(express.static("static"));

//controller -----------------------------------------------------------
app.get("/", (req, res) => {
  res.status(200).render("home", data.recipe);
});
app.get("/logIn", (req, res) => {
  if (req.method == "GET") res.status(200).render("login");
});

app.post("/login", (req, res) => {
  let id = req.body.userId;
  let pw = req.body.userPassword;
  let result = {};
  //check id
  if (id == "") {
    result.msgId = "Enter your id";
    result.userName = id;
  } else result.userName = id;

  //check password
  if (pw == "") {
    console.log("password phase");
    result.msgPwd = "Enter your password";
    result.userPassword = pw;
  } else result.userPassword = pw;
  console.log(result);
  res.status(200).render("login", result);
});
//signUp -----------------------------------------------------------------------------
app.get("/signUp", (req, res) => {
  res.status(200).render("signUp");
});
//signUp validation-------------------------------------------------------------------
app.post("/signUp", (req, res) => {
  let id = req.body.email;
  let pw = req.body.password;
  let result = {};
  //check email
  if (id == "") {
    result.msgId = "Enter an email address";
    result.userName = id;
  } else if (!id.match(/..*@..*\..*/)) {
    //must have @ and . and at least one character between them.
    result.msgId = "Please enter a valid email";
    result.userName = id;
  } else if (id.match(/(?=.*["%$+])/)) {
    result.msgId = 'Email must not contain "%$+';
    result.userName = id;
  } else result.userName = id;

  //check password
  if (pw == "") {
    console.log("password phase");
    result.msgPwd = "Enter your password";
    result.userPassword = pw;
  } else if (!pw.match(/.{6,12}/)) {
    result.msgPwd = "Password must be 6-12 characters";
    result.userPassword = pw;
  } else if (
    !pw.match(
      /^(?=.*[0-9])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[\]:;<>,.?/~_+-=|]).{6,12}$/
    )
  ) {
    result.msgPwd =
      "Password must contain 1 digit, upper case, special character";
    result.userPassword = pw;
  } else result.userPassword = pw;
  console.log(result);
  res.status(200).render("signUp", result);
});
// on the menu page -----------------------------------------------------
app.get("/onTheMenu", (req, res) => {
  res.status(200).render("onTheMenu", data.recipe);
});
//-----------------------------------------------------------------------

app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

app.listen(HTTP_PORT, onHttpStart);
