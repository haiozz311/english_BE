// const { Schema } = require("mongoose");
const { Listen } = require("../models/Listening.modal");
const { Word } = require("../models/Word");


module.exports.createListen = (req, res, next) => {
  const { answer } = req.body;
  const { wordID } = req.params;
  Word.findById(wordID)
    .then((word) => {
      if (!word)
        return Promise.reject({
          status: 404,
          message: "Word not found",
        });
      res.status(200).json({ word });
      if (answer.toLowerCase().trim() === word.vocabulary.toLowerCase().trim()) {
        isExact = true;
      } else {
        isExact = false;
      }
      const data = new Listen({
        wordID: word._id,
        answer,
        isExact
      })
      return Promise.all([data.save(), word.save()]);
    })
};

module.exports.getListen = (req, res, next) => {
  Listen.find()
    .populate("wordID")
    .then((listen) => {
      res.status(200).json({ listen });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

