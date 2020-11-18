// connect to the mongoDB
const User = require("./dbModel");
const bcrypt = require("bcrypt");
const session = require("express-session");
module.exports = {
  validate_user: function (req, res) {
    const { userId, userPassword } = req.body;
    let result = { isUnlogged: true };
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
      let errors = [];
      // tell mongoose to register this schema as a model and connect it to
      // names collection (if not there, it will automatically create)
      User.findOne({ email: req.body.userId })
        .then((found) => {
          if (found.email == null) {
            errors.push("Unregistered email");
          } else {
            bcrypt
              .compare(userPassword, found.password)
              .then((isMatched) => {
                if (isMatched) {
                  console.log("password is matched");
                  //create a new session
                  req.session.user = found;
                  if (found.isClerk) {
                    res.redirect("/dashboard/dataClerk");
                  } else {
                    res.redirect("/dashboard/user");
                  }
                } else {
                  console.log("password is not matched");
                  result.msgPwd = "Password is incorrect";
                  res.status(200).render("general/login", result);
                }
              })
              .catch((err) => {
                console.log(`error comparing password ${err}`);
              });
          }
        })
        .catch((err) => {
          console.log(`error finding this user`);
        });
    } else res.status(200).render("general/login", result);
  },
};
