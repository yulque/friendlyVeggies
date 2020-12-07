// connect to the mongoDB
const db = require("./dbModel");
const bcrypt = require("bcrypt");

module.exports = {
  validate_user: function (body, callbackf) {
    const { userId, userPassword } = body;
    let validation = false;
    let result = {};
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
      validation = false;
    } else {
      if (validation) validation = true;
    }
    //validation check
    if (validation) {
      db.userModel
        .findOne({ email: body.userId })
        .then((found) => {
          if (!found) {
            result.msgId = "This id is not registered";
            callbackf(result);
          } else {
            bcrypt
              .compare(userPassword, found.password)
              .then((isMatched) => {
                if (isMatched) {
                  console.log("password is matched");
                  result.found = found;
                } else {
                  console.log("password is not matched");
                  result.msgPwd = "The password is incorrect";
                }
                callbackf(result);
              })
              .catch((err) => {
                console.log(`error comparing password ${err}`);
              });
          }
        })
        .catch((err) => {
          console.log(`error finding this user`, err);
        });
    } else callbackf(result);
  },
};
