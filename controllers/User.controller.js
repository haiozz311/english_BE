const express = require("express");
const { createUser, login, updatePassword, getMe, uploadAvater, ResetPassWord } = require("../services/User.service.js");
const router = express.Router();
const { authenticate, authorization } = require("../middleware/auth/index");
const { uploadImages } = require("../middleware/img/index.js");
const { validateCreateUser } = require("../middleware/validation/User/create-user.validation")
const { validateLoginUser } = require("../middleware/validation/User/Login-user.validation");
const { validateUpdatePassword } = require("../middleware/validation/User/update-password.validation");
const { validateResetPassword } = require("../middleware/validation/User/reset-passpord");
router.post("/user", validateCreateUser, createUser);
router.post("/login", validateLoginUser, login);
router.patch("/update_password", validateUpdatePassword, updatePassword);
router.get("/me", authenticate, authorization(["Admin", "Member"]), getMe);
router.post("/upload_avatar", authenticate, authorization(["Member"]), uploadImages("avatar"), uploadAvater)
router.post("/resetPassword", validateResetPassword, ResetPassWord)
module.exports = router;
