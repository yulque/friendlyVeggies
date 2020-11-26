const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const HTTP_PORT = process.env.PORT || 8080;
//const bodyParser = require("body-parser");
const session = require("express-session");
//const fileUpload = require("express-fileupload");
//const multer = require("multer");
// const upload = multer({
//   storage: multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "static/uploads/");
//     },
//     filename: function (req, file, cb) {
//       cb(null, new Date().valueOf() + path.extname(file.originalname));
//     },
//   }),
// });
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("static"));
//app.use(fileUpload());
//app.use(multer({ dest: "static/uploads/" }).single("imageUpload"));
const dotenv = require("dotenv");
dotenv.config({ path: "./config/keys.env" });

app.set("views", __dirname + "/views");
app.engine("hbs", exphbs({ extname: "hbs" }));
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
