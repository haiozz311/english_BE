const express = require("express");
const { createProduct } = require("../services/Product.service");
const router = express.Router();
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
const { authenticate, authorization } = require("../middleware/auth/index");
// const { validateCreateCategory } = require("../middleware/validation/Category/create-category.validate");

// router.get('/category', getCategory);
router.post("/product", authenticate, authorization(["Admin"]), upload.array('productPicture'), createProduct);
module.exports = router;
