const express = require("express");
const { addItemToCart, getCartItems, removeCartItems } = require("../services/Cart.service");
const router = express.Router();
const { authenticate, authorization } = require("../middleware/auth/index");

router.post("/getCartItems", authenticate, authorization(["Member"]), getCartItems);
router.post("/cart", authenticate, authorization(["Member"]), addItemToCart);
router.post("/removeItem", authenticate, authorization(["Member"]), removeCartItems);
module.exports = router;
