const express = require("express");
const { createParagraph } = require("../services/Paragraphs.service");
const router = express.Router();
const { authenticate, authorization } = require("../middleware/auth/index");
router.post('/createParagraph', createParagraph);
// router.post("/PostCategory", upload.single('categoryImage'), authenticate, authorization(["Admin"]), validateCreateCategory, createCategory); //authenticate, authorization(["Admin"]),
// router.post("/update", upload.array('categoryImage'), updateCategory);
// router.post("/delete", deleteCategory);
module.exports = router;
