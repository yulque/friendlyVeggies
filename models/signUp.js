const dotenv = require("dotenv");
dotenv.config({ path: "./config/keys.env" });
const User = require("./dbModel.js");

module.exports = {
  validateSignUp: function (req, res) {
    const { firstName, lastName, email } = req.body;
    let password = req.body.password;
    let result = {};
    let validFN,
      validLN,
      validE,
      validP = false;
    result.firstName = firstName;
    result.lastName = lastName;
    result.email = email;
    result.password = password;
    //check first name
    if (!firstName) {
      result.msgFN = "Enter your first name";
      validFN = false;
    } else validFN = true;
    //check last name
    if (!lastName) {
      result.msgLN = "Enter your last name";
      validLN = false;
    } else validLN = true;
    //check email
    if (!email) {
      result.msgId = "Enter an email address";
      validE = false;
    } else if (!email.match(/..*@..*\..*/)) {
      //must have @ and . and at least one character between them.
      result.msgId = "Please enter a valid email";
      validE = false;
    } else if (email.match(/(?=.*["%$+])/)) {
      result.msgId = 'Email must not contain "%$+';
      validE = false;
    } else validE = true;

    //check password
    if (!password) {
      result.msgPwd = "Enter your password";
      validP = false;
    } else if (!password.match(/.{6,12}/)) {
      result.msgPwd = "Password must be 6-12 characters";
      validP = false;
    } else if (
      !password.match(
        /^(?=.*[0-9])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[\]:;<>,.?/~_+-=|]).{6,12}$/
      )
    ) {
      result.msgPwd =
        "Password must contain 1 digit, upper case, special character";
      validP = false;
    } else validP = true;

    //if valid information, save and send message
    if (validFN && validLN && validE && validP) {
      //let hash = bcrypt.hashSync(password, 10);
      //password = hash;
      console.log(email, firstName, lastName, password);
      //make new name model
      var newUser = new User({
        email: email,
        fName: firstName,
        lName: lastName,
        password: password,
      });
      // save the user
      newUser.save((err) => {
        if (err) {
          console.log(`error happens saving user. ${err}`);
          if (err.code == 11000) {
            result.msgId = "This email already exists";
            res.render("general/signUp", result);
          }
        } else {
          console.log("successfully saved to web322db!");
          console.log("hashed pw is : ", password);
          //send mail to welcome user
          const sgMail = require("@sendgrid/mail");
          sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

          const msg = {
            to: "yuriyoonkim@gmail.com",
            from: "yryoon@myseneca.ca",
            subject: `Welcome to Friendly Veggies! ${firstName} ${lastName}`,
            html: `Welcome ${firstName} ${lastName}!<br>
                              Please enjoy our tasty and healthy meals`,
          };
          // Asyncronously sends the email
          sgMail
            .send(msg)
            .then(() => {
              res.redirect("/welcome");
            })
            .catch((err) => {
              console.log(`Error : ${err}`);
              res.render("general/signUp");
            });
        }
      });
    } else res.render("general/signUp", result);
  },
};
