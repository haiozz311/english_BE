const validator = require("validator");
const _ = require("lodash");
const { User } = require("../../../models/User.model");

module.exports.validateUpdatePassword = async (req, res, next) => {
  const email = req.body.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  // const userType = req.body.userType;
  const error = {};
  //email
  if (!email) {
    error.email = "Email is required";
  } else if (!validator.isEmail(email)) {
    error.email = "Email is invalid";
  }

  //password
  if (!oldPassword) {
    error.oldPassword = "oldPassword is required";
  }

  if (!newPassword) {
    error.newPassword = "newPassword is required";
  }
  else if (validator.equals(oldPassword, newPassword)) {
    error.password = "password must match";
  }

  if (Object.keys(error).length > 0) {
    return res.status(400).json(error);
  }
  return next();
  // asyn middleware
};
