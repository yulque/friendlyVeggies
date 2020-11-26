const db = require("./dbModel.js");
const mealKitModel = db.mealKitModel;

module.exports = {
  updateData: function (req, res) {
    //console.log("req here in update function ", req.body);
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
          isTopMeal: req.body.isTopMeal,
        }
      )
      .then((saved) => {
        //console.log(saved);
      })
      .catch((err) =>
        console.log("while updating meal kits error happened ", err)
      );

    db.mealKitModel
      .find({}, function (err, docs) {
        const items = {
          food: docs.map((item) => item.toJSON()),
          isSaved: true,
        };
        res.render("general/dashboard/viewAllMeals", items);
      })
      .catch((err) => console.log("while finding data, error happened ", err));
  },
};
