
// const Cart = require("../models/Cart.model");

// exports.getCartItems = (req, res) => {
//   Cart.findOne({ user: req.user._id })
//     .populate("cartItems.product", "_id name price productPictures")
//     .exec((error, cart) => {
//       if (error) return res.status(400).json({ error });
//       if (cart) {
//         let cartItems = {};
//         cart.cartItems.forEach((item, index) => {
//           cartItems[item.product._id.toString()] = {
//             _id: item.product._id.toString(),
//             name: item.product.name,
//             img: item.product.productPictures[0].img,
//             price: item.product.price,
//             qty: item.quantity,
//           };
//         });
//         res.status(200).json({ cartItems });
//       }
//     });
// };


// module.exports.addItemToCart = (req, res, next) => {
//   Cart.findOne({ user: req.user._id })
//     .exec((error, cart) => {
//       if (error) return res.status(400).json({ error })
//       if (cart) {

//         const product = req.body.cartItems.product;
//         const item = cart.cartItems.find(c => c.product == product)
//         let condition, action;
//         if (item) {
//           condition = { "user": req.user._id, "cartItems.product": product }
//           action = {
//             "$set": {
//               "cartItems.$": {
//                 ...req.body.cartItems,
//                 quantity: item.quantity + req.body.cartItems.quantity
//               }
//             }
//           }
//           Cart.findOneAndUpdate(condition, action)
//             .exec((error, _cart) => {
//               if (error) return res.status(400).json({ error })
//               if (_cart) {
//                 return res.status(0).json({ cart: _cart })
//               }
//             })
//         } else {
//           condition = { user: req.user._id }
//           action = {
//             "$push": {
//               "cartItems": req.body.cartItems
//             }
//           }
//           Cart.findOneAndUpdate(condition, action)
//             .exec((error, _cart) => {
//               if (error) return res.status(400).json({ error })
//               if (_cart) {
//                 return res.status(200).json({ cart: _cart })
//               }
//             })
//         }

//       } else {
//         const cart = new Cart({
//           user: req.user._id,
//           cartItems: [req.body.cartItems]
//         });
//         cart.save((error, cart) => {
//           if (error) return res.status(400).json({ error })
//           if (cart) {
//             return res.status(200).json({ cart })
//           }
//         })
//       }
//     })
// };

// exports.removeCartItems = (req, res) => {
//   const { productId } = req.body.payload;
//   if (productId) {
//     Cart.update(
//       { user: req.user._id },
//       {
//         $pull: {
//           cartItems: {
//             product: productId,
//           },
//         },
//       }
//     ).exec((error, result) => {
//       if (error) return res.status(400).json({ error });
//       if (result) {
//         res.status(202).json({ result });
//       }
//     });
//   }
// };

const Cart = require("../models/Cart.model");

function runUpdate(condition, updateData) {
  return new Promise((resolve, reject) => {
    //you update code here

    Cart.findOneAndUpdate(condition, updateData, { upsert: true })
      .then((result) => resolve())
      .catch((err) => reject(err));
  });
}

exports.addItemToCart = (req, res) => {
  Cart.findOne({ user: req.user._id }).exec((error, cart) => {
    if (error) return res.status(400).json({ error });
    if (cart) {
      let promiseArray = [];

      req.body.cartItems.forEach((cartItem) => {
        const product = cartItem.product;
        const item = cart.cartItems.find((c) => c.product == product);
        let condition, update;
        if (item) {
          condition = { user: req.user._id, "cartItems.product": product };
          update = {
            $set: {
              "cartItems.$": cartItem,
            },
          };
        } else {
          condition = { user: req.user._id };
          update = {
            $push: {
              cartItems: cartItem,
            },
          };
        }
        promiseArray.push(runUpdate(condition, update));
      });
      Promise.all(promiseArray)
        .then((response) => res.status(201).json({ response }))
        .catch((error) => res.status(400).json({ error }));
    } else {
      //if cart not exist then create a new cart
      const cart = new Cart({
        user: req.user._id,
        cartItems: req.body.cartItems,
      });
      cart.save((error, cart) => {
        if (error) return res.status(400).json({ error });
        if (cart) {
          return res.status(201).json({ cart });
        }
      });
    }
  });
};

exports.getCartItems = (req, res) => {
  //const { user } = req.body.payload;
  //if(user){
  Cart.findOne({ user: req.user._id })
    .populate("cartItems.product", "_id name price productPictures")
    .exec((error, cart) => {
      if (error) return res.status(400).json({ error });
      if (cart) {
        let cartItems = {};
        cart.cartItems.forEach((item, index) => {
          cartItems[item.product._id.toString()] = {
            _id: item.product._id.toString(),
            name: item.product.name,
            img: item.product.productPictures[0].img,
            price: item.product.price,
            qty: item.quantity,
          };
        });
        res.status(200).json({ cartItems });
      }
    });
  //}
};

// new update remove cart items
exports.removeCartItems = (req, res) => {
  const { productId } = req.body.payload;
  if (productId) {
    Cart.update(
      { user: req.user._id },
      {
        $pull: {
          cartItems: {
            product: productId,
          },
        },
      }
    ).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(202).json({ result });
      }
    });
  }
};