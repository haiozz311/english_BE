const express = require("express");
const { createPage, getPage } = require("../services/Page.service");
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
router.post("/page/create", upload.fields([
  { name: 'banners' }
  ,
  {
    name: 'products'
  }
]),
  authenticate, authorization(["Admin"]),
  createPage); //authenticate, authorization(["Member"]),
router.get("/page/:category/:type", getPage);
module.exports = router;
