const mongoose = require("mongoose");
const ReadingSchema = mongoose.Schema({
  audioUrl: { type: String },
  comprehensionQuestions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question"
  }],
  listParagraphs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Paragraphs"
  }],
  TopicEnglishId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TopicEnglish"
  },
}, { timestamps: true });

const Reading = mongoose.model("Reading", ReadingSchema, "Reading");
module.exports = {
  ReadingSchema,
  Reading,
};
