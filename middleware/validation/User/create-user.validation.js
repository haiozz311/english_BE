const validator = require("validator");
const _ = require("lodash");
const { User } = require("../../../models/User.model");

module.exports.validateCreateUser = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const password2 = req.body.password2;
  const fullName = req.body.fullName;
  const phoneNumber = req.body.phoneNumber;
  // const userType = req.body.userType;
  const error = {};
  //email
  if (!email) {
    error.email = "Email is required";
  } else if (!validator.isEmail(email)) {
    error.email = "Email is invalid";
  } else {
    const user = await User.findOne({ email });
    if (user) error.email = "Email exists";
  }

  //password
  if (!password) {
    error.password = "password is required";
  }
  //password 2 
  if (!password2) {
    error.password2 = "Confirmed passowordis required";
  }
  else if (!validator.equals(password, password2)) {
    error.password = "password must match";
  }
  //fullname
  if (!fullName) {
    error.fullName = "fullname is required";
  }
  if (!phoneNumber) {
    error.phoneNumber = "phoneNumber is required";
  }

  if (Object.keys(error).length > 0) {
    return res.status(400).json(error);
  }
  return next();
  // asyn middleware
};
