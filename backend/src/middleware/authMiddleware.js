import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../models/UserModel.js";

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res.status(401).json({ messsage: "unauthorized request" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded)
      return res.status(401).json({ messsage: "unauthorized request" });
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) return res.status(404).json({ messsage: "user not found" });
    req.user = user;
    next();
  } catch (error) {
    console.error('Error in protectedRoute', error);
    res.status(500).json({message: 'internal server error'});
  }
};
