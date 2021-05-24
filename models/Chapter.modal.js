const mongoose = require("mongoose");
const ChapterSchema = mongoose.Schema({
  chapterTitle: { type: String, required: true },
  categoryEnglish: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CategoryEnglishType",
  },
}, { timestamps: true });

const Chapter = mongoose.model("Chapter", ChapterSchema, "Chapter");
module.exports = {
  ChapterSchema,
  Chapter,
};
