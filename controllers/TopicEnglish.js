const express = require("express");
const { createTopicEnglishType, getTopicEnglish, getTopicById } = require("../services/TopicEnglish.service");
const router = express.Router();
const { authenticate, authorization } = require("../middleware/auth/index");
router.post('/createTopicEnglishType', createTopicEnglishType);
router.get('/getTopicEnglish', getTopicEnglish);
router.get('/getTopicEnglish/:chapterId', getTopicById);
module.exports = router;
