const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const HTTP_PORT = process.env.PORT || 8080;
const bodyParser = require("body-parser");
const session = require("express-session");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", express.static(__dirname + "/static"));
const dotenv = require("dotenv");
dotenv.config({ path: "./config/keys.env" });

app.set("views", __dirname + "/views");
app.engine("hbs", exphbs({ extname: "hbs", partialsDir: ["views/partial/"] }));
app.set("view engine", "hbs");

// set up express-session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  //res.locals.user is a global handlebars variable.
  res.locals.user = req.session.user;
  next();
});

// load controllers
const generalController = require("./controllers/general");
app.use("/", generalController);

app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

function onHttpStart() {
  console.log("Express http server listening on port : " + HTTP_PORT);
}
app.listen(HTTP_PORT, onHttpStart);
