const express = require("express");
const { addOrder, getOrders, getOrder,updateOrder } = require("../services/Order.service");
const router = express.Router();
const { authenticate, authorization } = require("../middleware/auth/index");

router.post("/addOrder", authenticate, authorization(["Member"]), addOrder);
router.get("/getOrders", authenticate, authorization(["Member"]), getOrders);
router.post("/getOrder", authenticate, authorization(["Member"]), getOrder);
router.post("/updateOrder", authenticate, authorization(["Admin"]), updateOrder);
module.exports = router;
