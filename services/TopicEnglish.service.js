const { TopicEnglish } = require("../models/TopicEnglsih");
const { Chapter } = require("../models/Chapter.modal");

module.exports.createTopicEnglishType = (req, res, next) => {
  const { title, translate, chapterId } = req.body;
  Chapter.findById(chapterId)
    .then((category) => {
      if (!category) {
        return Promise.reject({
          status: 404,
          message: "Category English not found",
        });
      }
      const topicEnglish = new TopicEnglish(
        {
          title, translate, chapterId
        }
      )
      topicEnglish.save()
        .then((topic) => {
          res.status(200).json(topic)
        })
        .catch((err) => {
          res.status(200).json({ err })
        })
    })
    .catch((err) => {
      console.log("err", err)
    })
};

module.exports.getTopicEnglish = (req, res, next) => {
  TopicEnglish.find()
    .then((TopicEnglish) => {
      res.status(200).json({ TopicEnglish });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

module.exports.getTopicById = (req, res, next) => {
  const { chapterId } = req.params;
  TopicEnglish.find({ chapterId })
    .then((TopicEnglish) => {
      res.status(200).json({ TopicEnglish });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
