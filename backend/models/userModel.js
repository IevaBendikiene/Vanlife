import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const Schema = mongoose.Schema;
const userSchema = new Schema({
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

// static signup method
userSchema.statics.signup = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error("Please complete all the fields.");
  }
  if (!validator.isEmail(email)) {
    throw Error("Invalid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("The password is too weak");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hash });
  return user;
};

// static login method
userSchema.statics.login = async function(email, password) {
  if(!email || !password) {
    throw Error("Please complete all the fields.")
  }
  const user = await this.findOne({email})
  if(!user) {
    throw Error("Incorrect email or password")
  }
  const match = await bcrypt.compare(password, user.password)
  if(!match) {
    throw Error("Incorrect email or password")
  }
  return user
}
export default mongoose.model("User", userSchema);
