const db = require("./dbModel.js");

module.exports = {
  loadAllData: function (callbackf) {
    db.mealKitModel
      .find({}, null, { sort: { _id: -1 } })
      .then((items) => {
        const result = { food: items.map((item) => item.toJSON()) };
        callbackf(result);
      })
      .catch((err) => console.log(err));
  },
};
