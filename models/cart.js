// create meal kit
const db = require("./dbModel.js");

module.exports = {
  addToCart: function (id, user) {
    db.mealKitModel
      .findOne({ _id: id })
      .then((data) => {
        const newCartItem = new db.cartItemModel({
          menuId: data.id,
          title: data.title,
          price: data.price,
          imageUpload: data.imageUpload,
          quantity: 1,
          itemTotalPrice: data.price,
        });
        return newCartItem;
      })
      .then((newCartItem) => {
        //check if there is already cart for the user.
        //when user doesn't exist, create new cart
        db.cartModel
          .findOne({
            "user.email": user.email,
          })
          .then((userfound) => {
            if (!userfound) {
              // if no found, create a new cart for the user
              const newCart = new db.cartModel({
                user: user,
                items: [newCartItem],
                totalPrice: newCartItem.itemTotalPrice,
              });
              newCart
                .save()
                .then((saved) => console.log("created a new cart : ", saved))
                .catch((err) =>
                  console.log("error while creating new cart - ", err)
                );
            } else {
              // if the user's cart exists, and the item is already there
              if (userfound.items.findIndex((item) => item.menuId == id) > -1) {
                db.cartModel
                  .updateOne(
                    { "user.email": user.email },
                    {
                      $inc: {
                        "items.$[element].quantity": 1,
                        "items.$[element].itemTotalPrice": newCartItem.price,
                        totalPrice: newCartItem.price.toFixed(2),
                      },
                    },
                    { arrayFilters: [{ "element.menuId": id }] }
                  )
                  .then(() =>
                    db.cartModel
                      .findOne({ "user.email": user.email })
                      .then((result) =>
                        console.log(
                          "item was there so quantity was increased",
                          result
                        )
                      )
                      .catch((err) => console.log(err))
                  )
                  .catch((err) => console.log(err));
              } else {
                // if the item is not in the cart yet
                db.cartModel
                  .updateOne(
                    { "user.email": user.email },
                    {
                      $addToSet: { items: newCartItem },
                      $inc: { totalPrice: newCartItem.price },
                    }
                  )
                  .then((result) =>
                    console.log(
                      "new item is added. modified ; ",
                      result.nModified
                    )
                  )
                  .catch((err) => console.log(err));
              }
            }
          })
          .catch((err) =>
            console.log("error while finding user in carts ", err)
          );
      })
      .catch((err) => console.log("error while finding product", err));
  },
  loadCart: function (user, callbackf) {
    db.cartModel.findOne({ "user.email": user.email }).then((cart) => {
      if (!cart) {
        //when the cart is empty
        callbackf(cart);
      } else {
        //cart is not empty
        const result = cart.toJSON();
        callbackf(result);
      }
    });
  },
  deleteCart: function (someone, callbackf) {
    db.cartModel
      .deleteOne({ "user.email": someone.email })
      .then((result) => {
        callbackf(result);
      })
      .catch((err) => console.log("while deleting cart : ", err));
  },
  sendOrderMail: function (user) {
    console.log("user - send order : ", user);
    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

    db.cartModel
      .findOne({ "user.email": user.email })
      .then((cart) => {
        console.log("cart : ", cart);
        let text = `<tr> <th>Item</th> <th>Quantity</th> <th>Price</th> </tr>`;
        for (let i = 0; i < cart.items.length; i++) {
          console.log("cart item", cart.items[0], cart.items[i]);
          text =
            text +
            `<tr> <td>${cart.items[i].title}</td>  <td>${cart.items[i].quantity}</td> <td> $${cart.items[i].itemTotalPrice}</td></tr>`;
        }
        text =
          text +
          `<tr class="sum">
        <td class="sum" colspan="3"> <strong>total Price : $${cart.totalPrice}  </strong></td> </tr>`;
        console.log("text is : ", text);
        const orderMsg = {
          to: user.email,
          from: "yryoon@myseneca.ca",
          subject: `Your Friendly Veggies order confirmation`,
          html: `<html><head><style>
          body {
            font-family: "Rubik", sans-serif;}
          table, th, td {
            border: 1px solid  #478559;
            border-collapse: collapse;
            text-align : center;
          }
          table {width:90%;}
          h3 {
          color: #478559}
          .sum {
          text-align: right;
          border-top: 3px solid #478559;}
          </style></head>
          <body>
          <br>
          Your order is placed. It's on the way! <br>
          <h3>Ordered Items </h3>
          <table>
            ${text}
          </table>
          <br><br>
          Thank you.
          </body>
          </html>
          `,
        };
        sgMail.send(orderMsg).catch((err) => {
          console.log(`Error while sending order mail : ${err}`);
        });
      })
      .catch((err) => {
        console.log(`Error while finding user for order mail : ${err}`);
      });
  },
};
