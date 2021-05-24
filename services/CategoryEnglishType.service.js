const { CategoryEnglishType } = require("../models/CategoryEnglishType");

module.exports.createCategoryEnglishType = (req, res, next) => {
  const { englishTitle, englishDesc } = req.body;

  CategoryEnglishType.create({ englishTitle, englishDesc })
    .then((category) => {
      res.status(200).json({ message: 'Create successfully', category });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

module.exports.getCategoryEnglishtype = (req, res, next) => {
  CategoryEnglishType.find()
    .then((categoryEnglish) => {
      res.status(200).json({ categoryEnglish });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

