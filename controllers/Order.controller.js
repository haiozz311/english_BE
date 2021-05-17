const express = require("express");
const { addOrder, getOrders, updateOrder, getCustomerOrders } = require("../services/Order.service");
const router = express.Router();
const { authenticate, authorization } = require("../middleware/auth/index");

router.post("/addOrder", authenticate, authorization(["Member"]), addOrder);
router.get("/getOrders", authenticate, authorization(["Member", "Admin"]), getOrders);
// router.post("/getOrder", authenticate, authorization(["Member"]), getOrder);
router.post("/updateOrder", authenticate, authorization(["Admin"]), updateOrder);
router.get("/getCustomerOrders", authenticate, authorization(["Admin"]), getCustomerOrders);
module.exports = router;
