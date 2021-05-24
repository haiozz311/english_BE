const mongoose = require("mongoose");
const TopicEnglishSchema = mongoose.Schema({
  title: { type: String, required: true },
  translate: { type: String, required: true },
  chapterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chapter",
  },
}, { timestamps: true });

const TopicEnglish = mongoose.model("TopicEnglish", TopicEnglishSchema, "TopicEnglish");
module.exports = {
  TopicEnglishSchema,
  TopicEnglish,
};
