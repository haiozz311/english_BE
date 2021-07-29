const mongoose = require("mongoose");
const ParagraphsSchema = mongoose.Schema({
  fullHtmlTag: { type: String, required: true },
  translate: { type: String, required: true },
}, { timestamps: true });

const Paragraphs = mongoose.model("Paragraphs", ParagraphsSchema, "Paragraphs");
module.exports = {
  ParagraphsSchema,
  Paragraphs,
};
