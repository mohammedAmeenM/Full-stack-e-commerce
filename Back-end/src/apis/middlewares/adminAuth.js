const jwt = require("jsonwebtoken");

module.exports = function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(403).json({
      message: "No token provided",
    });
  }

  const token = authHeader;

  if (!token) {
    return res.status(403).json({
      message: "Invalid token format",
    });
  }

  jwt.verify(token, process.env.ADMIN_SECRET_STR, (err, decode) => {
    if (err) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    req.email = decode.email;
    next();
  });
};
