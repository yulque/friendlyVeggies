// connect to the mongoDB
const db = require("./dbModel");
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
      // tell mongoose to register this schema as a model and connect it to
      // names collection (if not there, it will automatically create)
      db.userModel
        .findOne({ email: req.body.userId })
        .then((found) => {
          if (found.email == null) {
            result.msgId = "This id is not registered";
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
                  result.msgPwd = "The password is incorrect";
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
          result.msgId = "This Id is not registered";
          res.status(200).render("general/login", result);
        });
    } else res.status(200).render("general/login", result);
  },
};
