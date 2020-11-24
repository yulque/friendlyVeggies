const db = require("./dbModel.js");
module.exports = {
  uploadMealKit: function (req, res) {
    const {
      title,
      ingredients,
      description,
      category,
      price,
      cookingTime,
      servings,
      calories,
      isTopMeal,
      image,
    } = req.body;
    const newMealKit = new db.mealKitModel({
      title: title,
      ingredients: ingredients,
      description: description,
      category: category,
      price: price,
      cookingTime: cookingTime,
      servings: servings,
      calories: calories,
      isTopMeal: isTopMeal ? true : false,
      image: image,
    });
    // save the meal kit
    newMealKit.save((err) => {
      if (err) console.log(`error happened while saving meal kit ${err}`);
      else {
        console.log(`meal kit is successfully saved`);
        res.redirect("/dashboard/dataClerk/createMealKit");
      }
    });
  },
};
