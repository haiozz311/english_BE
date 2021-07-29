const express = require("express");
const { createQuestion,createQuestionMultiple } = require("../services/Question.service");
const router = express.Router();
const { authenticate, authorization } = require("../middleware/auth/index");
router.post('/createQuestion', createQuestion);
router.post('/createQuestionMultiple', createQuestionMultiple);
// router.post("/PostCategory", upload.single('categoryImage'), authenticate, authorization(["Admin"]), validateCreateCategory, createCategory); //authenticate, authorization(["Admin"]),
// router.post("/update", upload.array('categoryImage'), updateCategory);
// router.post("/delete", deleteCategory);
module.exports = router;
