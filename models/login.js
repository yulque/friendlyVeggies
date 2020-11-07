module.exports = {
  validate_user: function (req, res) {
    const { userId, userPassword } = req.body;
    let result = {};
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
      res.redirect("/");
    } else res.status(200).render("general/login", result);
  },
};
