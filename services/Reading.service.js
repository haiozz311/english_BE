const { Reading } = require("../models/Reading");

module.exports.createReading = (req, res, next) => {
  const { TopicEnglishId } = req.body;
  const readingObj = {
    TopicEnglishId
  }
  if (req.file) {
    readingObj.audioUrl = 'http://localhost:5000/public/' + req.file.filename;
  }
  const read = new Reading(readingObj);
  read.save()
    .then((reading) => {
      return res.status(200).json({ reading })
    })
    .catch((error) => {
      console.log("errror", error)
      return res.status(400).json(error)
    })
};

module.exports.getReading = (req, res, next) => {

  Reading.find()
    .populate({
      path: "comprehensionQuestions",
      populate: {
        path: "answerOptions"
      }
    })
    .populate('listParagraphs')
    .populate('TopicEnglishId')
    .then((reading) => {
      return res.status(200).json({ reading })
    })
    .catch((error) => {
      console.log("errror", error)
      return res.status(400).json(error)
    })
};


module.exports.getReadingById = (req, res, next) => {
  const { TopicId } = req.params;
  console.log("TopicId", TopicId);

  Reading.find({ TopicEnglishId: TopicId })
    .populate({
      path: "comprehensionQuestions",
      populate: {
        path: "answerOptions"
      }
    })
    .populate('listParagraphs')
    .populate('TopicEnglishId')
    .then((read) => {
      return res.status(200).json({ read })
    })
    .catch((error) => {
      console.log("errror", error)
      return res.status(400).json(error)
    })
};
