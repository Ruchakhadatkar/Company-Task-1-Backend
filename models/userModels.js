const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//static signup mssg
userSchema.statics.signup = async function (name, contact, email, password) {
  //validation
  if (!name || !contact || !email || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
//   if (!validator.isStrongPassword(password)) {
//     throw Error("Password is not strong enough");
//   }

  const exists = await this.findOne({ email });

  if (exists) {
    throw new Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ name, contact, email, password: hash });

  return user;
};

//static login method
userSchema.statics.login = async function ( email, password) {
  if ( !email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });
  console.log(user)
  if (!user) {
    throw Error("Incorrect Email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
