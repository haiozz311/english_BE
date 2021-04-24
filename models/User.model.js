const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  userType: { type: String, enum: ['Member', 'Admin'], default: "Member" },
  avatarUrl: { type: String },
}, { timestamps: true });


// dinh nghia liftcircle hook tren schema
// viet function binh thuong ko viet arraw function vi arraw function ko co this
UserSchema.pre("save", function (next) {
  console.log("pre save", this);
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt
    .genSalt(10)
    .then((salt) => {
      console.log(salt)
      return bcrypt.hash(user.password, salt);
    })
    .then((hash) => {
      console.log(hash)
      user.password = hash;
      next();
    });
});

// console.log("UserSchema", UserSchema);

const User = mongoose.model("User", UserSchema, "User");
module.exports = {
  UserSchema,
  User,
};
