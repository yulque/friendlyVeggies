// data clerk edits meal kits
const db = require("./dbModel.js");

module.exports = {
  updateData: function (req, res) {
    db.mealKitModel
      .updateOne(
        { _id: req.body.id },
        {
          title: req.body.title,
          ingredients: req.body.ingredients,
          description: req.body.description,
          category: req.body.category,
          price: req.body.price,
          cookingTime: req.body.cookingTime,
          servings: req.body.servings,
          calories: req.body.calories,
          isTopMeal: req.body.isTopMeal ? true : false,
        }
      )
      .then(() => {
        db.mealKitModel
          .find({}, null, { sort: { _id: -1 } }, function (err, docs) {
            const items = {
              food: docs.map((item) => item.toJSON()),
              isSaved: true,
            };
            console.log(items);
            res.render("general/dashboard/viewAllMeals", items);
          })
          .catch((err) =>
            console.log("while finding data, error happened ", err)
          );
        //console.log(saved);
      })
      .catch((err) =>
        console.log("while updating meal kits error happened ", err)
      );
  },
};
