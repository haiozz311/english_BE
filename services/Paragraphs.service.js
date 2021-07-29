const { Paragraphs } = require("../models/Paragraphs");
const { Reading } = require("../models/Reading");

module.exports.createParagraph = (req, res, next) => {
  const { fullHtmlTag, translate, readingId } = req.body;
  const newParagraphs = new Paragraphs({
    fullHtmlTag,
    translate
  });
  Reading.findById(readingId)

    .then((read) => {
      if (!read)
        return Promise.reject({
          status: 404,
          message: "Reading not found",
        });
      read.listParagraphs.push(newParagraphs);

      return Promise.all([newParagraphs.save(), read.save()]);
    })
    .then((result) => res.status(200).json(result[0]))
    .catch((err) => res.status(500).json(err));
};


