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
    sendEmailActiationMail(newUser._id, newUser.emailPhone, newUser.fullName);
    res.json(newUser);
  } catch (error) {
    console.log(error);
  }
};

const sendEmailActiationMail = async (id, emailPhone, fullName) => {
  try {
    const activationCode = uuidv4();
    const filter = { user_id: id };
    const update = { code: activationCode };
    const existingDocument = await userCodeModel.findOne(filter);
    if (existingDocument) {
      const updatedDocument = await userCodeModel.findOneAndUpdate(
        filter,
        update,
        {
          new: true,
        }
      );
      console.log("Document updated:", updatedDocument);
    } else {
      const newDocument = await userCodeModel.create({
        user_id: id,
        code: activationCode,
      });
    }
    const activationToken = generateEmailVerifyToken(id, activationCode);
    const mailStatus = await sendAccountActivationEmail(
      emailPhone,
      activationToken,
      fullName
    );
    return mailStatus;
  } catch (error) {
    return error;
  }
};

const signIn = async (req, res) => {
  try {
    const { emailPhone, password } = req.body;
    const isUserExist = await userModal.findOne({ emailPhone });
    if (!isUserExist) {
      return res.status(400).json({ message: "Incorrect email/password" });
    }

    if (isUserExist?.isVerified == false) {
      return res.status(200).json({
        _id: isUserExist._id,
        isVerified: isUserExist.isVerified,
        emailPhone: isUserExist.emailPhone,
      });
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
    const existingUser = await userModal.findOne({ userName });
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
    console.log(
      "🚀 ~ file: auth.js:97 ~ emailVerification ~ activationCode:",
      activationCode
    );

    const savedActivationCode = await userCodeModel.findOne({
      user_id: userId,
    });
    console.log(
      "🚀 ~ file: auth.js:101 ~ emailVerification ~ savedActivationCode:",
      savedActivationCode
    );
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
      domain: "https://snapsync.onrender.com",
    })
    .json({
      accesstoken,
    });
}

const resetPasswordEmail = async (req, res) => {
  try {
    const emailUsername = req.query.query;
    const user = await userModal.findOne({
      $or: [
        { emailPhone: { $regex: emailUsername, $options: "i" } },
        { userName: { $regex: emailUsername, $options: "i" } },
      ],
    });

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
    const { password } = req.body;
    const savedActivationCode = await userCodeModel.findOne({
      user_id: userId,
    });
    if (savedActivationCode.code == activationCode) {
      const hash = await generatePasswordHash(password);
      const newUser = await userModal.updateOne(
        { _id: userId },
        { $set: { password: hash } },
        { new: true }
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

const resendEmailActivationMail = async (req, res) => {
  try {
    const { id } = req.query;
    console.log("🚀 ~ file: auth.js:233 ~ resendEmailActivationMail ~ id:", id);
    const isExist = await userModal.findOne({ _id: id });
    if (!isExist) {
      return res.status(400).json({
        message: "Something went wrong, please try again later",
      });
    }
    const mailStatus = await sendEmailActiationMail(
      isExist._id,
      isExist.emailPhone,
      isExist.fullName
    );
    console.log(
      "🚀 ~ file: auth.js:245 ~ resendEmailActivationMail ~ mailStatus:",
      mailStatus
    );
    res.status(200).json(mailStatus);
  } catch (error) {
    console.log(
      "🚀 ~ file: auth.js:247 ~ resendEmailActivationMail ~ error:",
      error
    );
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  signUp,
  signIn,
  isUserNameExist,
  emailVerification,
  rotateRefreshToken,
  resetPasswordEmail,
  resetPassword,
  resendEmailActivationMail,
};
