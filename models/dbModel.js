const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// connect to the mongoDB
mongoose.connect(process.env.MONGODB_KEY, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
//define our models - Name schema
const Schema = mongoose.Schema;
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  fName: String,
  lName: String,
  password: {
    type: String,
  },
});
userSchema.pre("save", function (next) {
  var user = this; // User모델자체를 가르킴

  // isModified: password가 변경될때
  if (user.isModified("password")) {
    // 비밀번호를 암호화 시킨다.
    bcrypt.genSalt(10, function (err, salt) {
      if (err) return next(err);
      console.log("salt is : ", salt);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        bcrypt.compare(user.password, hash).then((result) => {
          console.log(result);
        });
        user.password = hash;
        console.log(hash);
        next();
      });
    });
  } else {
    next();
  }
}); //*
module.exports = mongoose.model("users", userSchema);
