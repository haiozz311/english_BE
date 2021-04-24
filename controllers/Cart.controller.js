const express = require("express");
const { addItemToCart } = require("../services/Cart.service");
const router = express.Router();
const { authenticate, authorization } = require("../middleware/auth/index");

router.post("/cart", authenticate, authorization(["Member"]), addItemToCart);
module.exports = router;
