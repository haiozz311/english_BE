const mongoose = require("mongoose")
const CategorySchema = mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  categoryImage:{ type: String },
  parentId: { type: String }
}, { timestamps: true })


const Category = mongoose.model("Category", CategorySchema, "Category")
module.exports = {
  CategorySchema, Category
}