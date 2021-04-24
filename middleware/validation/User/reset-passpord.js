const validator = require("validator");
const _ = require("lodash");
const { User } = require("../../../models/User.model");

module.exports.validateResetPassword = async (req, res, next) => {
  const email = req.body.email;
  const error = {};
  //email
  if (!email) {
    error.email = "Email is required";
  } else if (!validator.isEmail(email)) {
    error.email = "Email is invalid";
  }

  if (Object.keys(error).length > 0) {
    return res.status(400).json(error);
  }
  return next();
  // asyn middleware
};
