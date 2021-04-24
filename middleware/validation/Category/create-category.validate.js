const validator = require("validator");
const _ = require("lodash");
const { User } = require("../../../models/User.model");

module.exports.validateCreateCategory = async (req, res, next) => {
  const name = req.body.name;
  // const userType = req.body.userType;
  const error = {};
  //email
  if (!name) {
    error.name = "Name is required";
  }

  if (Object.keys(error).length > 0) {
    return res.status(400).json(error);
  }
  return next();
  // asyn middleware
};
