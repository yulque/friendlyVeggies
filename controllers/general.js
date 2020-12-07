const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const router = express.Router();
const model_login = require("../models/login.js");
const model_signUp = require("../models/signUp.js");
const model_createData = require("../models/createData");
const model_loadingData = require("../models/loadingData.js");
const model_updateData = require("../models/updateData.js");
const model_findData = require("../models/findData.js");
const model_cart = require("../models/cart.js");
const multer = require("multer");
const { model } = require("mongoose");
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

function requireLogin(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/login");
  }
}
// block private URLs
router.all("/dashboard*", requireLogin, (req, res, next) => {
  next();
});
router.all("/cart*", requireLogin, (req, res, next) => {
  next();
});

// index
router.get("/", (req, res) => {
  model_loadingData.loadAllData((data) => {
    data.food = data.food.slice(0, 4);
    res.render("general/home", data);
  });
});

// signUp
router.get("/signUp", (req, res) => {
  res.render("general/signUp");
});

router.post("/signup", (req, res) => {
  model_signUp.validateSignUp(req.body, (result) => {
    if (result.validation) res.render("general/dashboard/welcome");
    else res.render("general/signUp", result);
  });
});

// login
router.get("/login", (req, res) => {
  res.render("general/login");
});

router.post("/login", (req, res) => {
  model_login.validate_user(req.body, (result) => {
    req.session.user = result.found;
    if (result.found) res.redirect("/dashboard");
    else res.render("general/login", result);
  });
});

// dashboard
router.get("/dashboard", (req, res) => {
  if (req.session.user.isClerk)
    res.render("general/dashboard/dashboardDataClerk");
  else res.render("general/dashboard/dashboardUser");
});

// create meal kit on data clerk dashboard
router.get("/dashboard/dataclerk/createmealkit", (req, res) => {
  res.render("general/dashboard/createMealKit");
});
router.post(
  "/dashboard/dataclerk/createmealkit",
  upload.single("imageUpload"),
  (req, res) => {
    model_createData.createMealKit(req.body, req.file, (data) => {
      res.render("general/dashboard/createMealKit", data);
    });
  }
);

//view meal kit and editthem on data clerk dashboard
router.get("/dashboard/dataclerk/viewallmeals", (req, res) => {
  model_loadingData.loadAllData((data) =>
    res.render("general/dashboard/viewAllMeals", data)
  );
});
router.post("/dashboard/dataclerk/viewallmeals", (req, res) => {
  model_updateData.updateData(req.body, (data) => {
    res.render("general/dashboard/viewAllMeals", data);
  });
});

//logout
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

// on the menu page
router.get("/onthemenu", (req, res) => {
  model_loadingData.loadAllData((data) => {
    // when the request ask description
    if (Object.keys(req.query).length !== 0) {
      if (req.query.addtocart) {
        if (req.session.user) {
          // when user is logged in
          model_cart.addToCart(req.query.id, req.session.user);
          res.redirect("back");
        } else {
          // when user is NOT logged in
          res.redirect("/login");
        }
      } else if (req.query.id) {
        model_findData.findData(req.query.id, (data) => {
          let result = data.toJSON();
          let user;
          if (req.session.user) {
            user = req.session.user;
          }
          res.render("general/description", {
            data: result,
            user: user,
          });
        });
      }
    } else {
      res.render("general/onTheMenu", data);
    }
  });
});

// cart
router.get("/cart", (req, res) => {
  if (req.query.placeorder) {
    // when deleting request is coming in
    model_cart.deleteCart(req.session.user, (result) => {
      if (result.deletedCount === 1) {
        // when successfully deleted it
        res.render("general/orderPlaced");

        // send mail to user
        const sgMail = require("@sendgrid/mail");
        sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

        const orderMsg = {
          to: req.session.user.email,
          from: "yryoon@myseneca.ca",
          subject: `order is placed`,
          html: `Your order is placed. <br>
            It's on the way!`,
        };
        // Asyncronously sends the email
        sgMail.send(orderMsg).catch((err) => {
          console.log(`Error while sending order mail : ${err}`);
        });
      } else {
        res.status(404).end();
      }
    });
  } else {
    // normal get request
    model_cart.loadCart(req.session.user, (cart) => {
      if (!cart) {
        res.render("general/cart", { user: req.session.user });
      } else res.render("general/cart", cart);
    });
  }
});
module.exports = router;
