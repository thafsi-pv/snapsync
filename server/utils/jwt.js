const jwt = require("jsonwebtoken");

const generateAccessToken = (userId) => {
  const options = { expiresIn: "10m" };
  return jwt.sign({ _id: userId }, process.env.JWT_SECRET_KEY, options);
};
const generateRefreshToken = (userId) => {
  const options = { expiresIn: "1y" };
  return jwt.sign({ _id: userId }, process.env.JWT_REFRESH_SECRET_KEY, options);
};

const generateEmailVerifyToken = (userId, code) => {
  const payload = { userId, activationCode: code };
  const options = { expiresIn: 600 };
  return jwt.sign(payload, process.env.JWT_ACC_VERIFY_SECRET_KEY, options);
};

const verifyRefreshToken = (refreshToken) => {
  if (!refreshToken) return false;
  const tokenValid = jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET_KEY
  );
  if (!tokenValid) return false;
  return tokenValid._id;
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};

module.exports = {
  generateAccessToken,
  generateEmailVerifyToken,
  generateRefreshToken,
  verifyRefreshToken,
  verifyToken,
};
