// create meal kit
const db = require("./dbModel.js");

module.exports = {
  createMealKit: function (body, file, callbackf) {
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
      imageUpload,
    } = body;
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
      imageUpload: imageUpload,
    });
    let result = {};
    // save the meal kit
    newMealKit
      .save()
      .then((mealSaved) => {
        db.mealKitModel
          .updateOne(
            {
              _id: mealSaved._id,
            },
            { imageUpload: file.filename }
          )
          .then()
          .catch((err) => console.log(err));
        console.log(`meal kit is successfully saved `);
        result.saved = true;
        callbackf(result);
      })
      .catch((err) => {
        console.log(`error happened while saving meal kit ${err}`);
        if (err.code == 11000) {
          result.errTitle = `this title already exists`;
          callbackf(result);
        }
      });
  },
};
