const express = require("express");
const { addAddress,getAddress} = require("../services/Address.service");
const router = express.Router();
const { authenticate, authorization } = require("../middleware/auth/index");

router.post("/address", authenticate, authorization(["Member"]), addAddress); 
router.post("/getAddress", authenticate, authorization(["Member"]), getAddress); 
module.exports = router;
