const userModal = require("../model/userModel");
const { generatePasswordHash, comparePassword } = require("../utils/bcrypt");
const {
  generateJWTToken,
  generateAccoutActivationToken,
} = require("../utils/jwt");
const { v4: uuidv4 } = require("uuid");
const userCodeModel = require("../model/userCodeModel");
const { sendAccountActivationEmail } = require("../utils/nodemailer");

const signUp = async (req, res) => {
  try {
    const data = req.body;
    const isExist = await userModal.findOne({ emailPhone: data.emailPhone });
    if (isExist) {
      return res.status(400).json({
        message: "This email/phone id already registered, use another one!",
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

    const activationToken = generateAccoutActivationToken(activationCode);

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

    //generate access token
    const accesstoken = generateJWTToken(isUserExist._id);
    return res.status(200).json({
      message: "Login success",
      accesstoken,
      email: isUserExist.email,
      firstName: isUserExist.firstName,
      lastName: isUserExist.lastName,
      imageUrl: isUserExist.imageUrl,
    });
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

module.exports = { signUp, signIn, isUserNameExist };
