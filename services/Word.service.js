const { Word } = require("../models/Word");
const { TopicEnglish } = require("../models/TopicEnglsih")

module.exports.createWord = (req, res, next) => {
  const { dictionaryEntry, dictionaryEntryTranslate, exampleSentences, exampleSentencesTranslate, translate, vocabulary, topicId, spelling } = req.body;
  console.log("req.body", req.body)
  TopicEnglish.findById(topicId)
    .then((topic) => {
      if (!topic) {
        return Promise.reject({
          status: 404,
          message: "Topic English not found",
        });
      }
      const WordEnglish = new Word({
        dictionaryEntry,
        dictionaryEntryTranslate,
        exampleSentences,
        exampleSentencesTranslate,
        translate,
        vocabulary,
        spelling
      })
      const { audioDictionaryUK, audioDictionaryUS, audioExampleSentencesUK, audioExampleSentencesUS } = req.files;
      if (audioDictionaryUK && audioDictionaryUK.length > 0) {
        console.log("audioDictionaryUK", audioDictionaryUK);
        req.body.audioDictionaryUK = audioDictionaryUK.map((item) => ({
          audio: `/public/${item.filename}`,
        }))
      }
      if (audioDictionaryUS && audioDictionaryUS.length > 0) {
        console.log("audioDictionaryUS", audioDictionaryUS);
        req.body.audioDictionaryUS = audioDictionaryUS.map((item) => ({
          audio: `/public/${item.filename}`,
        }))
      }
      if (audioExampleSentencesUK && audioExampleSentencesUK.length > 0) {
        console.log("audioExampleSentencesUK", audioExampleSentencesUK);
        req.body.audioExampleSentencesUK = audioExampleSentencesUK.map((item) => ({
          audio: `/public/${item.filename}`,
        }))
      }
      if (audioExampleSentencesUS && audioExampleSentencesUS.length > 0) {
        console.log("audioExampleSentencesUS", audioExampleSentencesUS);
        req.body.audioExampleSentencesUS = audioExampleSentencesUS.map((item) => ({
          audio: `/public/${item.filename}`,
        }))
      }
      const word = new Word(req.body)
      word.save()
        .then((wordENG) => {
          return res.status(200).json({ wordENG })
        })
        .catch((err) => {
          console.log("err", err)
        })
    })
    .catch((err) => {
      console.log("err", err)
    })
};

module.exports.getWord = (req, res, next) => {
  Word.find()
    .populate("topicId")
    .then((word) => {
      res.status(200).json({ word });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

module.exports.getWordById = (req, res, next) => {
  const { topicId } = req.params;
  Word.find({ topicId })
    .populate("topicId")
    .populate({
      path:"answerList",
      populate: {
        path: "answerOptions"
      }
    })
    .then((word) => {
      res.status(200).json({ word });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

module.exports.DeleteWordById = (req, res, next) => {
  const { wordId } = req.params;
  let _word;
  Word.findById(wordId)
    .then((word) => {
      if (!word)
        return Promise.reject({
          status: 404,
          Message: "Word Not Found",
        });
      _word = word;
      return word.deleteOne();
    })
    .then(() => res.status(200).json(_word))
    .catch((err) => res.status(500).json(err));
};

module.exports.updateWordById = (req, res, next) => {
  const { wordId } = req.params;
  const { dictionaryEntry, dictionaryEntryTranslate, exampleSentences, exampleSentencesTranslate, translate, vocabulary, topicId, spelling } = req.body;
  console.log("req.body", req.body)
  Word.findById(wordId)
    .then((word) => {
      if (!word) {
        return Promise.reject({
          status: 404,
          message: "Word English not found",
        });
      }
      word.dictionaryEntry = dictionaryEntry,
        word.dictionaryEntryTranslate = dictionaryEntryTranslate,
        word.exampleSentences = exampleSentences,
        word.exampleSentencesTranslate = exampleSentencesTranslate,
        word.translate = translate,
        word.vocabulary = vocabulary,
        word.topicId = topicId,
        word.spelling = spelling
      const { audioDictionaryUK, audioDictionaryUS, audioExampleSentencesUK, audioExampleSentencesUS } = req.files;
      if (audioDictionaryUK && audioDictionaryUK.length > 0) {
        console.log("audioDictionaryUK", audioDictionaryUK);
        word.audioDictionaryUK = audioDictionaryUK.map((item) => ({
          audio: `/public/${item.filename}`,
        }))
      }
      if (audioDictionaryUS && audioDictionaryUS.length > 0) {
        console.log("audioDictionaryUS", audioDictionaryUS);
        word.audioDictionaryUS = audioDictionaryUS.map((item) => ({
          audio: `/public/${item.filename}`,
        }))
      }
      if (audioExampleSentencesUK && audioExampleSentencesUK.length > 0) {
        console.log("audioExampleSentencesUK", audioExampleSentencesUK);
        word.audioExampleSentencesUK = audioExampleSentencesUK.map((item) => ({
          audio: `/public/${item.filename}`,
        }))
      }
      if (audioExampleSentencesUS && audioExampleSentencesUS.length > 0) {
        console.log("audioExampleSentencesUS", audioExampleSentencesUS);
        req.body.audioExampleSentencesUS = audioExampleSentencesUS.map((item) => ({
          audio: `/public/${item.filename}`,
        }))
      }
      word.save()
        .then((wordENG) => {
          return res.status(200).json({ wordENG })
        })
        .catch((err) => {
          console.log("err", err)
        })
    })
    .catch((err) => {
      console.log("err", err)
    })
};

