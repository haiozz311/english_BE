const express = require("express");
const { createReading, getReading, getReadingById } = require("../services/Reading.service");
const router = express.Router();
const { authenticate, authorization } = require("../middleware/auth/index");
const { validateCreateCategory } = require("../middleware/validation/Category/create-category.validate");
const multer = require('multer');
const path = require('path');
const shortid = require('shortid');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), 'uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + '-' + file.originalname)
  }
})
const upload = multer({
  storage
});
router.post("/createReading", upload.single('audioUrl'), createReading);
router.get("/getReading", getReading);
router.get("/getReading/:TopicId",
  getReadingById);
module.exports = router;
