const { Chapter } = require("../models/Chapter.modal");
const { CategoryEnglishType } = require("../models/CategoryEnglishType");

module.exports.createChapter = (req, res, next) => {
  const { chapterTitle, categoryEnglish } = req.body;
  CategoryEnglishType.findById(categoryEnglish)
    .then((category) => {
      if (!category) {
        return Promise.reject({
          status: 404,
          message: "Category English not found",
        });
      }
      const chapterEnglish = new Chapter(
        {
          chapterTitle, categoryEnglish
        }
      )
      chapterEnglish.save()
        .then((chapter) => {
          res.status(200).json({ chapter })
        })
        .catch((err) => {
          res.status(200).json({ err })
        })
    })
    .catch((err) => {
      console.log("err", err)
    })
};

module.exports.getChapter = (req, res, next) => {
  Chapter.find()
    .then((chapter) => {
      res.status(200).json({ chapter });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

module.exports.getChapterById = (req, res, next) => {
  const { categoryId } = req.params;
  console.log("categoryId", categoryId)
  Chapter.find({ categoryEnglish: categoryId })
    .then((chapter) => {
      res.status(200).json({ chapter });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};