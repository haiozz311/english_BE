const mongoose = require("mongoose")

const ProductSchema = mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  description: { type: String, required: true, trim: true },
  offter: { ytpe: Number },
  productPictures: [
    { img: { type: String } }
  ],
  reviews: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      review: String
    }
  ],
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  createBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  updateAt: Date,

}, { timestamps: true })


const Product = mongoose.model("Product", ProductSchema, "Product")
module.exports = {
  ProductSchema, Product
}