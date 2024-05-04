const jwt = require("jsonwebtoken");

const adminAuthMiddleware = (req, res, next) => {
  // Get the JWT token from the request cookies or headers
  const token =
    req.cookies.token ||
    req.headers.authorization ||
    req.headers.Authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    // Verify and decode the JWT token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user object to the request object
    req.user = decodedToken;

    // Check if the user has the admin role
    if (req.user.role !== "ADMIN") {
      return res
        .status(403)
        .json({ error: "Forbidden: Admin access required" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

module.exports = adminAuthMiddleware;
