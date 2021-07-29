const { Question } = require("../models/Question.modal");
const { Answer } = require("../models/Answer.modal");

module.exports.createAnswer = (req, res, next) => {
  const { questionId, answerText, isCorrect } = req.body;
  const newAnswer = new Answer({
    answerText, isCorrect
  });
  Question.findById(questionId)
    .then((question) => {
      if (!question)
        return Promise.reject({
          status: 404,
          message: "question not found",
        });
        question.answerOptions.push(newAnswer);

      return Promise.all([newAnswer.save(), question.save()]);
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(500).json(err));
};


