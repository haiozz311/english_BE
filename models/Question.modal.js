const mongoose = require("mongoose");
const QuestionSchema = mongoose.Schema({
  question: { type: String },
  answerOptions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Answer"
  }],
}, { timestamps: true });

const Question = mongoose.model("Question", QuestionSchema, "Question");
module.exports = {
  QuestionSchema,
  Question,
};
