const jwt = require("jsonwebtoken");

exports.verifyEmail = (req, res, next) => {
  try {
    const token = req.query.code;
    if (!token) {
      return res.status(401).json({ message: "Access Denied" });
    }
    const tokenValid = jwt.verify(token, process.env.JWT_ACC_VERIFY_SECRET_KEY);
    req.userId = tokenValid.userId;
    req.activationCode = tokenValid.activationCode;
    next();
  } catch (error) {
    console.log("🚀 ~ file: verifyEmail.js:15 ~ error:", error);
    res.status(401).json(error);
  }
};
