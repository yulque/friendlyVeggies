const db = require("./dbModel.js");
const path = require("path");
const { userInfo } = require("os");

//const { mealKitModel } = require("./dbModel.js");
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
    //console.log(req);
    console.log(req.body, " | ", req.body.title);
    console.log(req.file);
    // save the meal kit
    newMealKit
      .save()
      .then((mealSaved) => {
        req.file.filename = `${mealSaved._id}${
          path.parse(req.file.originalname).ext
        }`;
        db.mealKitModel
          .updateOne(
            {
              _id: mealSaved._id,
            },
            { imageUpload: req.file.filename }
          )
          .then((saved) => console.log(saved))
          .catch((err) => console.log(err));
        console.log(req.body);

        // req.file
        //   .mv(`../static/uploads/${req.file.filename}`)
        //   .then(() => {
        //     console.log(req.file);
        //     //db.mealKitModel.updateOne({
        //     //  _id: mealSaved._id,
        //     //});
        //   })
        //   .catch((err) => console.log(err));

        console.log(`meal kit is successfully saved`);
        //res.write('<script language="javascript">alert("test")</script>');
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
