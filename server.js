const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const HTTP_PORT = process.env.PORT || 8080;
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("static"));

const dotenv = require("dotenv");
dotenv.config({ path: "./config/keys.env" });

app.set("views", __dirname + "/views");
app.engine("handlebars", exphbs());
app.engine(".hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", "handlebars");

// load controllers
// app.get("/signUp", (req, res) => {
//   res.status(200).render("general/signUp");
// });
const generalController = require("./controllers/general");
app.use("/", generalController);

app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

//----------------------------------
function onHttpStart() {
  console.log("Express http server listening on port : " + HTTP_PORT);
}
app.listen(HTTP_PORT, onHttpStart);
