const { Schema, Promise } = require("mongoose");
const { User } = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const util = require("util");
const jwtSign = util.promisify(jwt.sign);
const config = require("../config/index");

module.exports.createUser = (req, res, next) => {
  const { email, password, fullName, phoneNumber } = req.body;

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
    })
    .then(() => {
      return res.status(200).json({ message: "password" });
    })
    .catch((err) => res.json(err));
}

module.exports.getUser = (req, res, next) => {
  return User.find({ userType: 'Member' })
    .then((users) => {
      return res.status(200).json(users);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};
// module.exports.AddUser = (req, res, next) => {
//   const { taiKhoan, matKhau, email, soDt, hoTen, maLoaiNguoiDung } = req.body;

//   return User.create({
//     taiKhoan,
//     matKhau,
//     email,
//     soDt,
//     hoTen,
//     maLoaiNguoiDung,
//   })
//     .then((user) => {
//       return res.status(200).json(user);
//     })
//     .catch((err) => {
//       return res.status(500).json(err);
//     });
// };

module.exports.updateUser = (req, res, next) => {
  const { id } = req.params;
  console.log("user", id);
  const { password, fullName, phoneNumber } = req.body;
  User.findById(id)
    .then((user) => {
      if (!user) {
        return Promise.reject({ status: 404, message: "User Not Found" });
      }
      user.password = password;
      user.fullName = fullName;
      user.phoneNumber = phoneNumber;

      return user.save();
    })
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      return res.status(500).json(err);
    });
};


module.exports.deleteUser = (req, res, next) => {
  const { id } = req.params;
  let _user;
  User.findById(id)
    .then((user) => {
      if (!user) {
        return Promise.reject({
          status: 404,
          message: "User Not Found",
        });
      }
      _user = user;
      return user.deleteOne();
    })
    .then(() => res.status(200).json({ message: "delete successfully" }))
    .catch((err) => res.status(500).json({ message: err.message }));
};