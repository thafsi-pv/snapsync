const jwt = require("jsonwebtoken");

const generateAccessToken = (userId) => {
  return jwt.sign({ _id: userId }, process.env.JWT_SECRET_KEY);
};

const generateAccoutActivationToken = (code) => {
  const payload = { activationCode: code };
  const options = { expiresIn: 600 };
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, options);
};

module.exports = { generateAccessToken, generateAccoutActivationToken };
