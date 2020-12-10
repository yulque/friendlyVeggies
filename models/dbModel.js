const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("mongoose-currency").loadType(mongoose);
// connect to the mongoDB
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
  price: { type: Number },
  cookingTime: Number,
  servings: Number,
  calories: Number,
  isTopMeal: Boolean,
  imageUpload: String,
});

const cartItemSchema = new Schema({
  menuId: String,
  title: String,
  price: { type: Number },
  imageUpload: String,
  quantity: Number,
  itemTotalPrice: Number,
});
const cartSchema = new Schema({
  user: { type: userSchema, unique: true },
  items: [{ type: cartItemSchema, ref: "cartItem" }],
  totalPrice: { type: Number },
});

module.exports = {
  userModel: mongoose.model("users", userSchema),
  mealKitModel: mongoose.model("mealKit", mealKitSchema),
  cartModel: mongoose.model("cart", cartSchema),
  cartItemModel: mongoose.model("cartItem", cartItemSchema),
};
