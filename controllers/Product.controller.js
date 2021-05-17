const express = require("express");
const { createProduct, getProduct, getProductbySlug, getProductDetailsById } = require("../services/Product.service");
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

router.get('/getProduct', getProduct);
router.get('/getProductById/:productId', getProductDetailsById);
router.get('/getProduct/:slug', getProductbySlug);
router.post("/product", upload.array('productPicture'), authenticate, authorization(["Admin"]), createProduct);
module.exports = router;
