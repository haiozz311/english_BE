const express = require("express");
const { createWord, getWord, getWordById, DeleteWordById, updateWordById, createWord1 } = require("../services/Word.service");
const router = express.Router();
const { authenticate, authorization } = require("../middleware/auth/index");
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
router.post("/createWord", upload.fields([
  { name: 'audioDictionaryUK' }
  ,
  {
    name: 'audioDictionaryUS'
  },
  { name: 'audioExampleSentencesUK' }
  ,
  {
    name: 'audioExampleSentencesUS'
  }
]),
  // authenticate, authorization(["Admin"]),
  createWord); //authenticate, authorization(["Member"]),
router.get("/getWord",
  // authenticate, authorization(["Admin"]),
  getWord); //authenticate, authorization(["Member"]),
router.get("/getWord/:topicId",
  // authenticate, authorization(["Admin"]),
  getWordById);
router.delete("/deleteWord/:wordId",
  // authenticate, authorization(["Admin"]),
  DeleteWordById);

router.put("/updateWord/:wordId", upload.fields([
  { name: 'audioDictionaryUK' }
  ,
  {
    name: 'audioDictionaryUS'
  },
  { name: 'audioExampleSentencesUK' }
  ,
  {
    name: 'audioExampleSentencesUS'
  }
]),
  updateWordById);
module.exports = router;

