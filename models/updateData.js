// data clerk edits meal kits
const db = require("./dbModel.js");

module.exports = {
  updateData: function (body, callbackf) {
    db.mealKitModel
      .updateOne(
        { _id: body.id },
        {
          title: body.title,
          ingredients: body.ingredients,
          description: body.description,
          category: body.category,
          price: body.price,
          cookingTime: body.cookingTime,
          servings: body.servings,
          calories: body.calories,
          isTopMeal: body.isTopMeal ? true : false,
        }
      )
      .then(() => {
        db.mealKitModel
          .find({}, null, { sort: { _id: -1 } }, function (err, docs) {
            const items = {
              food: docs.map((item) => item.toJSON()),
              isSaved: true,
            };
            callbackf(items);
            //res.render("general/dashboard/viewallmeals", items);
          })
          .catch((err) =>
            console.log("while finding data, error happened ", err)
          );
      })
      .catch((err) =>
        console.log("while updating meal kits error happened ", err)
      );
  },
};
