import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const verifyJwt = async (req, res, next) => {
  try {
    
    const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1];
    console.log("token", token);
    // Debugging: Check token presence
    if (!token) {
      return res.status(401).json({
        message: "Authentication token not found",
      });
    }

    // Verify token using JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (!decoded || !decoded.id) {
      console.log("Invalid token payload:", decoded);
      return res.status(401).json({
        message: "Invalid authentication token",
      });
    }

    // Fetch user associated with the token
    const user = await User.findById(decoded.id);

    if (!user) {
      console.log("User not found for token:", decoded.id);
      return res.status(404).json({
        message: "User associated with this token does not exist",
      });
    }

    // Attach user to the request object for subsequent middlewares
    req.user = user;
    next();
  } catch (error) {
    console.error("Error in JWT verification:", error.message);
    return res.status(401).json({
      message: "Unauthorized access",
    });
  }
};

export default verifyJwt;
