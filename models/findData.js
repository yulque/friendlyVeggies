const db = require("./dbModel.js");

module.exports = {
  findData: function (id, callbackf) {
    db.mealKitModel
      .findOne({ _id: id })
      .then((found) => {
        let result = found;
        callbackf(result);
      })
      .catch((err) => console.log(err));
  },
};
