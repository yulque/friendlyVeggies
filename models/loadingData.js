const db = require("./dbModel.js");
const mealKitModel = db.mealKitModel;

module.exports = {
  loadAllData: function (req, res) {
    //console.log("req here is", req);
    if (req.route.path == "/") console.log("say yay!");
    db.mealKitModel
      .find({}, null, { sort: { imageUpload: -1 } }, function (err, items) {
        //console.log("this is items p1 | ", items);

        //console.log(context);
        if (req.route.path == "/") {
          const context = {
            food: items.slice(0, 8).map((item) => item.toJSON()),
          };
          res.render("general/home", context);
        } else if (req.route.path == "/onTheMenu") {
          const context = {
            food: items.map((item) => item.toJSON()),
          };
          res.render("general/onTheMenu", context);
        } else if (req.route.path == "/dashboard/dataClerk/viewAllMeals") {
          const context = {
            food: items.map((item) => item.toJSON()),
          };
          res.render("general/dashboard/viewAllMeals", context);
        }
      })
      .catch((err) => console.log(err));
  },
};
