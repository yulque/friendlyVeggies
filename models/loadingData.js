const db = require("./dbModel.js");
const mealKitModel = db.mealKitModel;

module.exports = {
  loadAllData: function (req, res) {
    db.mealKitModel
      .find({}, function (err, items) {
        //console.log("this is items p1 | ", items);
        const context = {
          food: items.map((item) => item.toJSON()),
        };
        console.log(context);
        res.render("general/onTheMenu", context);
      })
      .catch((err) => console.log(err));

    // .then((items) => console.log(items));
    //   .toArray((err, items) => {
    //     console.log(items);
    //     db.close();
    //   })
    //   .then(res.json(items))
    //   .catch((err) => console.log(`error while loading data`, err));
  },
};
