// const { JsonWebTokenError } = require("jsonwebtoken");
const config = require("../../config/index")
const jwt = require("jsonwebtoken");
const util = require("util");
const jwtVerify = util.promisify(jwt.verify);
// decode lai
// con sign la tao ra
module.exports.authenticate = (req, res, next) => {
  const token = req.headers.token;
  jwtVerify(token, config.JWT_SECRET_KEY)
    .then((decoded) => {
      if (!decoded)
        return res.status(401).json({
          message: "Token is invalid",
        });
      req.user = decoded;
      return next();
    })
    .catch((err) => res.json(err));
};

module.exports.authorization = (userTypeArray) => {
  return (req, res, next) => {
    const user = req.user;
    if (userTypeArray.indexOf(user.userType) > -1) return next();
    res.status(403).json({ message: "you do not have permission" });
  };
};

// cach gon hon

// module.exports.authorization = userTypeArray => (req,res,next)=>{
//     const user = req.user;
//     if(userTypeArray.indexOf(user.userType) > -1) return next();
//     res.status(403).json({message : "you do not have permission"});
//   }
