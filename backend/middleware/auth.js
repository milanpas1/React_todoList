const jwt = require("jsonwebtoken");
const { User } = require("../model/userModel");

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access token required",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "fallback_secret_key"
    );
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(403).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = { authenticateToken };
