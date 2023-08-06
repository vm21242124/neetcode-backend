import jwt from 'jsonwebtoken'
import { userModel } from '../models/userModel.js';
export const IsLoggedIn = async (req, res, next) => {
  let token;
  if (
    req.cookies.token ||
    (req.headers.authorization && req.headers.startWith("Bearer"))
  ) {
    token = req.cookies.token || req.headers.authorization.split(" ")[1];
  }
  if(!token){
    return res.status(403).json("log in first ")
  }
  try {
    const decode=jwt.verify(token,process.env.JWT_SECRET_KEY)

    req.user=await userModel.findById(decode._id,"name email role")
    next()
  } catch (error) {
    return res.status(400).json("verification error ")
  }
};
