const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// connect to the mongoDB
mongoose
  .connect(process.env.MONGODB_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
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
  isClerk: Boolean,
});
userSchema.pre("save", function (next) {
  var user = this; // User model itself

  if (user.isModified("password")) {
    const SALT_NUM = 10;
    bcrypt.genSalt(SALT_NUM, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        bcrypt.compare(user.password, hash).then((result) => {});
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
}); //*
module.exports = mongoose.model("users", userSchema);
