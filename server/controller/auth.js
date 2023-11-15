const userModal = require("../model/userModel");
const { generatePasswordHash, comparePassword } = require("../utils/bcrypt");
const {
  generateAccessToken,
  generateEmailVerifyToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/jwt");
const { v4: uuidv4 } = require("uuid");
const userCodeModel = require("../model/userCodeModel");
const {
  sendAccountActivationEmail,
  passwordResetEmail,
} = require("../utils/nodemailer");

const signUp = async (req, res) => {
  try {
    const data = req.body;
    const isExist = await userModal.findOne({ emailPhone: data.emailPhone });
    if (isExist) {
      return res.status(400).json({
        message: "This email/phone is already registered, use another one!",
      });
    }
    const hash = await generatePasswordHash(data.password);
    delete data.cpassword;
    const newUser = await userModal.create({ ...data, password: hash });

    const activationCode = uuidv4();
    const responseCode = userCodeModel.create({
      user_id: newUser._id,
      code: activationCode,
    });

    const activationToken = generateEmailVerifyToken(
      newUser._id,
      activationCode
    );

    const mailStatus = await sendAccountActivationEmail(
      newUser.emailPhone,
      activationToken,
      newUser.fullName
    );

    res.json(newUser);
  } catch (error) {
    console.log(error);
  }
};

const signIn = async (req, res) => {
  try {
    const { emailPhone, password } = req.body;
    const isUserExist = await userModal.findOne({ emailPhone });
    if (!isUserExist) {
      return res.status(400).json({ message: "Incorrect email/password" });
    }

    const validPassword = await comparePassword(password, isUserExist.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Incorrect email/password" });
    }
    generateAccessAndRefreshToken(isUserExist._id, res);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const isUserNameExist = async (req, res) => {
  try {
    const userName = req.query.username;
    console.log(
      "🚀 ~ file: auth.js:56 ~ isUserNameExist ~ userName:",
      userName
    );

    const existingUser = await userModal.findOne({ userName });
    console.log(
      "🚀 ~ file: auth.js:59 ~ isUserNameExist ~ existingUser:",
      existingUser
    );
    if (existingUser) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    console.log(error);
  }
};

const emailVerification = async (req, res) => {
  try {
    const { userId, activationCode } = req;

    const savedActivationCode = await userCodeModel.findOne({
      user_id: userId,
    });
    if (savedActivationCode.code == activationCode) {
      const result = await userModal.updateOne(
        { _id: userId },
        { $set: { isVerified: true } },
        { new: true }
      );
      console.log(
        "🚀 ~ file: auth.js:109 ~ emailVerification ~ result:",
        result
      );
      if (result.modifiedCount === 1) {
        console.log(`User with userId ${userId} has been verified.`);
        res
          .status(200)
          .json({ message: `User with userId ${userId} has been verified.` });
      } else {
        console.log(`User with userId ${userId} not found.`);
        res
          .status(400)
          .json({ message: `User with userId ${userId} not found.` });
      }
    }
  } catch (error) {
    res.status(400).json({
      message: `Error updating user verification status: ${error.message}`,
    });
  }
};

const rotateRefreshToken = async (req, res) => {
  const userId = verifyRefreshToken(req.cookies.ssacctoken);
  if (!userId) {
    return res.status(401).json({ message: "Refresh Token is expired" });
  }
  generateAccessAndRefreshToken(userId, res);
};

function generateAccessAndRefreshToken(userId, res) {
  //generate access token
  const accesstoken = generateAccessToken(userId);
  //generate refresh token
  const refreshToken = generateRefreshToken(userId);

  res
    .cookie("ssacctoken", refreshToken, {
      httpOnly: true,
      secure: true,
    })
    .json({
      accesstoken,
    });
}

const resetPasswordEmail = async (req, res) => {
  try {
    const emailUsername = req.query.query;
    console.log(
      "🚀 ~ file: auth.js:156 ~ resetPassword ~ emailUsername:",
      emailUsername
    );

    const user = await userModal.findOne({
      $or: [
        { emailPhone: { $regex: emailUsername, $options: "i" } },
        { userName: { $regex: emailUsername, $options: "i" } },
      ],
    });
    console.log("🚀 ~ file: auth.js:163 ~ resetPassword ~ user:", user);

    if (!user) {
      return res.status(401).json({ message: "No user found" });
    }

    const activationCode = uuidv4();
    const newData = {
      user_id: user._id,
      code: activationCode,
    };

    const codeid = await userCodeModel.findOneAndUpdate(
      { user_id: user._id },
      newData,
      { new: true, upsert: true, runValidators: true }
    );

    const activationToken = generateEmailVerifyToken(user._id, activationCode);

    const mailStatus = await passwordResetEmail(
      user.emailPhone,
      activationToken,
      user.fullName
    );
    console.log("🚀 ~ file: auth.js:192 ~ resetPasswordEmail ~ mailStatus:", mailStatus)

    res.status(200).json(mailStatus);
  } catch (error) {
    res.status(400).json({
      message: `Error while reset password: ${error.message}`,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { userId, activationCode } = req;
    console.log("🚀 ~ file: auth.js:205 ~ resetPassword ~ req:", req)
    const { newPassword } = req.body;
    console.log("🚀 ~ file: auth.js:207 ~ resetPassword ~ req.body:", req.body)

    const savedActivationCode = await userCodeModel.findOne({
      user_id: userId,
    });
    if (savedActivationCode.code == activationCode) {
      const hash = await generatePasswordHash(newPassword);
      delete data.cpassword;
      const newUser = await userModal.findOneAndUpdate(
        { _id: userId },
        { $set: { password: hash } },
        { new: true }
      );

      console.log(
        "🚀 ~ file: auth.js:109 ~ emailVerification ~ newUser:",
        newUser
      );
      if (newUser.modifiedCount === 1) {
        console.log(`User with userId ${userId} new password saved.`);
        res
          .status(200)
          .json({ message: `User with userId ${userId} new password saved.` });
      } else {
        console.log(`User with userId ${userId} not found.`);
        res
          .status(400)
          .json({ message: `User with userId ${userId} not found.` });
      }
    }
  } catch (error) {
    res.status(400).json({
      message: `Error reseting user password: ${error.message}`,
    });
  }
};

module.exports = {
  signUp,
  signIn,
  isUserNameExist,
  emailVerification,
  rotateRefreshToken,
  resetPasswordEmail,
  resetPassword
};
