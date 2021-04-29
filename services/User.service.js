const { Schema, Promise } = require("mongoose");
const { User } = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const util = require("util");
const jwtSign = util.promisify(jwt.sign);
const config = require("../config/index");
// chuyen tu callback sang promise bang promisify
module.exports.createUser = (req, res, next) => {
  const { email, password, fullName, phoneNumber } = req.body;
  // genSalt : tao ra muoi
  // row : 10
  // row càng lớn thì độ phức tạp của hash càng lớn
  // validate email
  // bcrypt
  //   .genSalt(10)
  //   .then((salt) => {
  //       return bcrypt.hash(password, salt);
  //   })
  //   .then((hash) => {
  //       console.log(hash);
  //       return User.create({
  //       email,
  //       password: hash,
  //       fullName,
  //     });
  //   })
  User.create({ email, password, fullName, phoneNumber })
    .then((user) => {
      res.status(200).json({ message: 'Register successfully', user });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  let _user;
  User.findOne({ email })
    .then((user) => {
      if (!user)
        return Promise.reject({ status: 404, message: "User Not Found" });
      _user = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isMatched) => {

      console.log("isMatched", isMatched);
      if (!isMatched)
        return Promise.reject({
          status: 400,
          message: "Password incorrect",
        });
      const payload = {
        _id: _user._id,
        email: _user.email,
        fullName: _user.fullName,
        phoneNumber: _user.phoneNumber,
        userType: _user.userType,
      };
      return jwtSign(payload, config.JWT_SECRET_KEY, {
        expiresIn: "1d",
      }).then((token) => {
        return res.status(200).json({ message: "login successfully", token, payload });
      });
    })
    .catch((err) => res.status(err.status).json(err));
};

module.exports.updatePassword = (req, res, enxt) => {
  const { email, oldPassword, newPassword } = req.body;
  let _user;
  User.findOne({ email })
    .then((user) => {
      if (!user)
        return Promise.reject({ status: 404, message: "User Not Found" });
      _user = user;
      console.log("oldPassword", oldPassword);
      console.log("user.password", user.password);
      return bcrypt.compare(oldPassword, user.password);
    })
    .then((isMatched) => {
      if (!isMatched)
        return Promise.reject({
          status: 400,
          message: "Password incorrect",
        });
      _user.password = newPassword;
      return _user.save();
    })
    .then(() => {
      return res.status(200).json({ message: "Update successfully" });
    })
    .catch((err) => res.json(err));
};

module.exports.getMe = (req, res, next) => {
  res.status(200).json(req.user);
};

module.exports.uploadAvater = (req, res, next) => {
  console.log("req.user._id", req.user._id);
  User.findById(req.user._id)
    .then((user) => {
      if (!user)
        return Promise.reject({ status: 404, message: "User not found" });
      user.avatarUrl = `${req.file.fieldname}s/${req.file.filename}`;
      return user.save();
    })
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      if (!err.status) return res.status(500).json(err);
      return res.status(err.status).json({ message: err.message });
    });
};

module.exports.ResetPassWord = (req, res, next) => {
  const { email } = req.body;
  let _user;
  User.findOne({ email })
    .then((user) => {
      if (!user)
        return Promise.reject({ status: 404, message: "User Not Found" });
      _user = user;
      console.log("passs", user.password)
      // bcrypt.
    })
    .then(() => {
      return res.status(200).json({ message: "password" });
    })
    .catch((err) => res.json(err));
}
