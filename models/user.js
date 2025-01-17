const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    trim: true,
    maxlength: [50, "Name cannot be more than 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    trim: true,
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please add a valid email"],
  },
  mobile: {
    countryCode: String,

    phone: {
      type: String,
      maxlength: [10, "Phone number cannot be more than 10 characters"],
    },
  },
  companyName: {
    type: String,
    required: function () {
      return this.role === "Customer";
    },
  },
  userType: {
    type: String,
    enum: ["Customer", "Technician"],
    default: "Technician",
    requried: [true, "Please add a user type"],
  },

  forgotPasswordToken: String,
  forgotPasswordExpiry: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
    minlength: [8, "A user password must have more or equal then 8 characters"],
    select: false,
  },
});

//Encrypting password before saving
userSchema.pre("save", async function (next) {
  //Only run this function if password was actually modified
  if (!this.isModified("password")) return next();
  //Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//Compare user password with hashed password in database
userSchema.methods.isValidatedPassword = async function (userSendPassword) {
  console.log("userSendPassword", userSendPassword);
  console.log("this.password", this.password);
  return await bcrypt.compare(userSendPassword, this.password);
};

//Generate forgot password token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

//Generate forgot password token
userSchema.methods.getForgotPasswordToken = function () {
  //Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");
  //Hash and set to forgotPasswordToken
  this.forgotPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  //Set token expiry time
  this.forgotPasswordExpiry = Date.now() + 30 * 60 * 1000;
  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
