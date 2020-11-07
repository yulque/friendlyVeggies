const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const HTTP_PORT = process.env.PORT || 8080;
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dotenv = require("dotenv");
dotenv.config({ path: "./config/keys.env" });

app.set("views", __dirname + "/views");
app.engine("handlebars", exphbs());
app.engine(".hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", "handlebars");

//  static resources
//app.use(express.static("static"));

// load controllers
const generalController = require("./controllers/general");
const productController = require("./controllers/signUp");

app.use("/", generalController);
app.use("/signUp", productController);

app.use((req, res) => {
  res.status(404).send("Page Not Found");
});
//----------------------------------
function onHttpStart() {
  console.log("Express http server listening on port: " + HTTP_PORT);
}
app.listen(HTTP_PORT, onHttpStart);
