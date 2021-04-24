// const { Schema } = require("mongoose");
const { Cart } = require("../models/Cart.model");
const slugify = require("slugify");


function createCate(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    console.log("categories", categories);
    category = categories.filter(cate => cate.parentId == undefined)
  } else {
    category = categories.filter(cate => cate.parentId == parentId)
  }
  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      children: createCate(categories, cate._id)
    })
  }
  return categoryList;
}

module.exports.getCategory = (req, res, next) => {

  return Category.find()
    .then((categories) => {
      const CategoryList = createCate(categories);
      return res.status(200).json(CategoryList);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};


module.exports.addItemToCart = (req, res, next) => {
  Cart.findOne({ user: req.user._id })
    .exec((error, cart) => {
      if (error) return res.status(400).json({ error })
      if (cart) {

        const product = req.body.cartItems.product;
        const item = cart.cartItems.find(c => c.product == product)
        let condition, action;
        if (item) {
          condition = { "user": req.user._id, "cartItems.product": product }
          action = {
            "$set": {
              "cartItems.$": {
                ...req.body.cartItems,
                quantity: item.quantity + req.body.cartItems.quantity
              }
            }
          }
          Cart.findOneAndUpdate(condition, action)
            .exec((error, _cart) => {
              if (error) return res.status(400).json({ error })
              if (_cart) {
                return res.status(200).json({ cart: _cart })
              }
            })
        } else {
          condition = { user: req.user._id }
          action = {
            "$push": {
              "cartItems": req.body.cartItems
            }
          }
          Cart.findOneAndUpdate(condition, action)
            .exec((error, _cart) => {
              if (error) return res.status(400).json({ error })
              if (_cart) {
                return res.status(200).json({ cart: _cart })
              }
            })
        }

      } else {
        const cart = new Cart({
          user: req.user._id,
          cartItems: [req.body.cartItems]
        });
        cart.save((error, cart) => {
          if (error) return res.status(400).json({ error })
          if (cart) {
            return res.status(200).json({ cart })
          }
        })
      }
    })



};
