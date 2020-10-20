const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const data = require("./static/data.js");
const HTTP_PORT = process.env.PORT || 8080;
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
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
  const { firstName, lastName, email, password } = req.body;
  let result = {};
  let validation = false;
  result.firstName = firstName;
  result.lastName = lastName;
  result.email = email;
  result.password = password;

  //check email
  if (!email) {
    result.msgId = "Enter an email address";
  } else if (!email.match(/..*@..*\..*/)) {
    //must have @ and . and at least one character between them.
    result.msgId = "Please enter a valid email";
  } else if (email.match(/(?=.*["%$+])/)) {
    result.msgId = 'Email must not contain "%$+';
  } else validation = true;

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

  if (validation) {
    res.status(200).render("welcome", result);
    // for mailing ----------------------------------------------------
    let myMail = "yuriyoonkim@gmail.com";
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: myMail,
        pass: "db0024fl",
      },
    });

    let mailOptions = {
      from: myMail,
      to: email,
      subject: "Welcome to Friendly Veggies!",
      text: "Please enjoy our eco-friendly and tasty meals",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } else {
    res.status(200).render("signUp", result);
  }
});
// on the menu page -----------------------------------------------------
app.get("/onTheMenu", (req, res) => {
  res.status(200).render("onTheMenu", data.recipe);
});

//-----------------------------------------------------------------------
// const productModel = require("./static/productList");

// app.get("/product/list", (req, res) => {
//   res.render("productList", {
//     title: "Product Listing Page",
//     products: productModel,
//   });
// });

app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

app.listen(HTTP_PORT, onHttpStart);
