import jwt from "jsonwebtoken";
import User from "../Models/User.js";

export default async function protect(req, res, next) {
  if (
req.headers?.authorization?.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-Password");
      return next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          name: error.name,
          message: "User token has expired",
        });
      }
      return res
        .status(401)
        .json({ name: "AuthNotValidError", message: "Error verifying the auth token" });
    }
  } else {
    return res.status(401).json({ name: "NoAuthProvidedError", message: "No valid auth provided" });
  }
}
