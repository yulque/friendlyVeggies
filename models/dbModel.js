const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// connect to the mongoDB
let db, users, mealKits;
mongoose
  .connect(process.env.MONGODB_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((err) => console.log("MongoDB failed to connect ", err));
// find collections

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
// when save, it hashes password
userSchema.pre("save", function (next) {
  var user = this; // User model itself
  if (user.isModified("password")) {
    const SALT_NUM = 10;
    bcrypt.genSalt(SALT_NUM, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        bcrypt.compare(user.password, hash).then(() => {});
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});
// meal schema
const mealKitSchema = new Schema({
  title: {
    type: String,
    unique: true,
  },
  ingredients: String,
  description: String,
  category: String,
  price: String,
  cookingTime: Number,
  servings: Number,
  calories: Number,
  isTopMeal: Boolean,
  imageUpload: String,
});

module.exports = {
  userModel: mongoose.model("users", userSchema),
  mealKitModel: mongoose.model("mealKit", mealKitSchema),
};
