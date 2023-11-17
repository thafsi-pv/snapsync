const userModel = require("../model/userModel");

exports.getUserDetailsWithUserName = async (req, res, next) => {
  try {
    const userName = req.query.userName;
    const userDetails = await userModel.findOne({ userName });
    if (!userDetails) {
      return res.status(404).json({ message: "No user found" });
    }
    req.userDetails = userDetails;
    next();
  } catch (error) {
    res.status(500).json(error);
  }
};
