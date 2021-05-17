const mongoose = require("mongoose")
const PageSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  banners: [
    {
      img: { type: String },
      navigateTo: { type: String }
    }
  ],
  products: [
    {
      img: { type: String },
      navigateTo: { type: String }
    }
  ],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
    unique: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true })


const Page = mongoose.model("Page", PageSchema, "Page")
module.exports = {
  PageSchema, Page
}