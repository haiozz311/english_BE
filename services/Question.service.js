const { Question } = require("../models/Question.modal");
const { Reading } = require("../models/Reading");
const { Word } = require("../models/Word");

module.exports.createQuestion = (req, res, next) => {
  const { question,readingId } = req.body;
  const newQuestion = new Question({
    question,
  });
  Reading.findById(readingId)

    .then((read) => {
      if (!read)
        return Promise.reject({
          status: 404,
          message: "Reading not found",
        });
      read.comprehensionQuestions.push(newQuestion);

      return Promise.all([newQuestion.save(), read.save()]);
    })
    .then((result) => res.status(200).json(result[0]))
    .catch((err) => res.status(500).json(err));
};

module.exports.createQuestionMultiple = (req, res, next) => {
  const { question,WordId } = req.body;
  const newQuestion = new Question({
    question,
    
  });
  Word.findById(WordId)

    .then((word) => {
      if (!word)
        return Promise.reject({
          status: 404,
          message: "word not found",
        });
        word.answerList.push(newQuestion);

      return Promise.all([newQuestion.save(), word.save()]);
    })
    .then((result) => res.status(200).json(result[0]))
    .catch((err) => res.status(500).json(err));
};

