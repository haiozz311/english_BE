const mongoose = require("mongoose");
const AnswerSchema = mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question"
  },
  answerText: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
}, { timestamps: true });

const Answer = mongoose.model("Answer", AnswerSchema, "Answer");
module.exports = {
  AnswerSchema,
  Answer,
};
