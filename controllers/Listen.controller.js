const express = require("express");
const { createListen, getListen } = require("../services/Listen.service");
const router = express.Router();
// const { authenticate, authorization } = require("../middleware/auth/index");
router.get('/getListen', getListen);
router.post('/createListen/:wordID', createListen);
// router.post("/PostCategory", upload.single('categoryImage'), authenticate, authorization(["Admin"]), validateCreateCategory, createCategory); //authenticate, authorization(["Admin"]),
// router.post("/update", upload.array('categoryImage'), updateCategory);
// router.post("/delete", deleteCategory);
module.exports = router;
