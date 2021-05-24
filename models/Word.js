const mongoose = require("mongoose");
const WordSchema = mongoose.Schema({
  audioDictionaryUK: [
    {
      audio: { type: String },
    }
  ],
  audioDictionaryUS: [
    {
      audio: { type: String },
    }
  ],
  audioExampleSentencesUK: [
    {
      audio: { type: String },
    }
  ],
  audioExampleSentencesUS: [
    {
      audio: { type: String },
    }
  ],
  dictionaryEntry: { type: String },
  dictionaryEntryTranslate: { type: String },
  exampleSentences: { type: String },
  exampleSentencesTranslate: { type: String },
  translate: { type: String },
  vocabulary: { type: String },
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TopicEnglish",
  },
}, { timestamps: true });

const Word = mongoose.model("Word", WordSchema, "Word");
module.exports = {
  WordSchema,
  Word,
};
