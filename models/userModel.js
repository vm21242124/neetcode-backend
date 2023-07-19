import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {authRoles} from '../db/authRoles.js'

const userschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide name"],
      maxLength: [50, "Name must be less than 50"],
      trime: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minLength: [6, "password atleast 6 digit"],
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(authRoles),
      default: authRoles.USER,
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
  },
  { timestams: true }
);
//pre hook for saving the user hashing password middleware
userschema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
userschema.methods = {
  getJwtToken: function () {
    return jwt.sign(
      {
        _id: this._id,
        role: this.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: 60 * 15 * 1000,
      }
    );
  },
  comparepass: async function (enteredpass) {
    return await bcrypt.compare(enteredpass, this.password);
  }
};

export const userModel = mongoose.model("User", userschema);
