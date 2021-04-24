const validator = require("validator");
const _ = require("lodash");
const { User } = require("../../../models/User.model");

module.exports.validateLoginUser = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  // const userType = req.body.userType;
  const error = {};
  //email
  if (!email) {
    error.email = "Email is required";
  } else if (!validator.isEmail(email)) {
    error.email = "Email is invalid";
  }

  if (!password) {
    error.password = "password is required";
  }

  if (Object.keys(error).length > 0) {
    return res.status(400).json(error);
  }
  return next();
  // asyn middleware
};
