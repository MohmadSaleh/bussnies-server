import mongoose from "mongoose";
import Name from "./Name.js";
import Image from "./Image.js";
import Address from "./Address.js";
import phoneRegex from "../../../utils/phoneRegex.js";
import passwordRegex from "../../../utils/passwordRegex.js";
import emailRegex from "../../../utils/emailRegex.js";

const UserSchema = new mongoose.Schema({
  name: Name,
  phone: {
    type: String,
    required: true,
    match: RegExp(phoneRegex),
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: RegExp(emailRegex),
  },
  password: {
    type: String,
    required: true,
    trim: true,
    match: RegExp(passwordRegex),
  },
  image: Image,
  address: Address,
  isBusiness: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("user", UserSchema);


export default User;
