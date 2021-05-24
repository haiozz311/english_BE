const mongoose = require("mongoose");
const CategoryEnglishTypeSchema = mongoose.Schema({
  englishTitle: { type: String, required: true },
  englishDesc: { type: String, required: true },
}, { timestamps: true });

const CategoryEnglishType = mongoose.model("CategoryEnglishType", CategoryEnglishTypeSchema, "CategoryEnglishType");
module.exports = {
  CategoryEnglishTypeSchema,
  CategoryEnglishType,
};
