const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || "";

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) throw new Error("invalid token ");
    req.user = decoded;
    next();
  } catch (error) {
    console.log("verification failed: " + error);
    next();
  }
};

module.exports = { authenticate };
