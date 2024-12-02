const jwt = require("jsonwebtoken");

const generateToken = async (user) => {
  try {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const accessTokenExp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 5;
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: accessTokenExp,
    });

    return { accessToken, accessTokenExp };
  } catch (error) {
    console.error("Error generating tokens:", error);
    throw new Error("Failed to generate tokens.");
  }
};

module.exports = generateToken;