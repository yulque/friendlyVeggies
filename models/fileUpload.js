// create meal kit
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
      imageUpload,
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
            { imageUpload: req.file.filename }
          )
          .then()
          .catch((err) => console.log(err));
        console.log(`meal kit is successfully saved `);
        result.saved = true;
        res.status(201).render("general/dashboard/createMealKit", result);
      })
      .catch((err) => {
        console.log(`error happened while saving meal kit ${err}`);
        if (err.code == 11000) {
          result.errTitle = `this title already exists`;
          res.render("general/dashboard/createMealKit", result);
        }
      });
  },
};
