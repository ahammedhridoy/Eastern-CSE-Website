const jwt = require("jsonwebtoken");

const editorAuthMiddleware = (req, res, next) => {
  // Extract token from cookies or headers
  const token =
    req.cookies?.accessToken ||
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    // Verify and decode the JWT
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Log the decoded token for debugging
    console.log("Decoded Token:", decodedToken);

    // Attach the user to the request object
    req.user = decodedToken;

    // Check for admin role
    if (req.user.role !== "EDITOR") {
      return res
        .status(403)
        .json({ error: "Forbidden: Admin access required" });
    }

    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res
      .status(401)
      .json({ error: "Unauthorized: Invalid or expired token" });
  }
};

module.exports = editorAuthMiddleware;
