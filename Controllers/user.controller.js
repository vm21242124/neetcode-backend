import { userModel } from "../models/userModel.js";


export const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  if (!(name || email || password)) {
    return res.status(401).json("all fields are required")
  }

  const UserExist = await userModel.findOne({ email });
  if (UserExist) {
   return  res.status(403).json("user already exits")
  }
  if (!UserExist) {
    const user = await userModel.create({
      name,
      email,
      password,
    });
    const token = user.getJwtToken();
    user.password = undefined;
    // res.cookie(token, token, cookieOptions);

    res.status(200).cookie("token", token).json({
      success: true,
      message: "user created successfully",
      user,
    });
  }
};
export const signin = async (req, res) => {
  const { email, password } = req.body;
  if (!(email, password)) {
    return res.status(401).json("all fields are required")
  }

  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(404).json("user not found in db")
  }

  const isMatched = await user.comparepass(password);

  if (isMatched) {
    const token = user.getJwtToken();
    delete user.password;
    res.status(200).cookie("token", token).json({
      success: true,
      message: "sigin successfully",
      user,
    });
  } else {
    return res.status(403).json("invalid credentials")
  }
};
export const signout = (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  return res.status(200).json({
    success: true,
    message: "logout successfully",
  });
};
