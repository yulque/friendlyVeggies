const db = require("./dbModel.js");

module.exports = {
  loadAllData: function (req, res) {
    db.mealKitModel
      .find({}, null, { sort: { _id: -1 } }, function (err, items) {
        // if req is from home top meal, only show 8 tops.
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
