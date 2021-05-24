const express = require("express");
const { createChapter, getChapter, getChapterById } = require("../services/Chapter.service");
const router = express.Router();
const { authenticate, authorization } = require("../middleware/auth/index");
// const { validateCreateCategory } = require("../middleware/validation/Category/create-category.validate");
// const multer = require('multer');
// const path = require('path');
// const shortid = require('shortid');
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(path.dirname(__dirname), 'uploads'))
//   },
//   filename: function (req, file, cb) {
//     cb(null, shortid.generate() + '-' + file.originalname)
//   }
// })
// const upload = multer({
//   storage
// });
router.post('/createChapter', createChapter);
router.get('/getChapter', getChapter);
router.get('/getChapter/:categoryId', getChapterById);
// router.post("/PostCategory", upload.single('categoryImage'), authenticate, authorization(["Admin"]), validateCreateCategory, createCategory); //authenticate, authorization(["Admin"]),
// router.post("/update", upload.array('categoryImage'), updateCategory);
// router.post("/delete", deleteCategory);
module.exports = router;
