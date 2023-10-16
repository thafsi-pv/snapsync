const userModal = require("../model/userModel");
const { generatePasswordHash, comparePassword } = require("../utils/bcrypt");
const { generateJWTToken } = require("../utils/jwt");

const signUp = async (req, res) => {
  try {
    const data = req.body;
    console.log("🚀 ~ file: auth.js:8 ~ signUp ~ data:", data);
    const isExist = await userModal.findOne({ emailPhone: data.emailPhone });
    if (isExist) {
      return res.status(400).json({
        message: "This email/phone id already registered, use another one!",
      });
    }
    const hash = await generatePasswordHash(data.password);
    delete data.cpassword;
    const newUser = await userModal.create({ ...data, password: hash });
    console.log("🚀 ~ file: auth.js:16 ~ signUp ~ newUser:", newUser);
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

const checkUserNameAvailablity = async (req, res) => {
  try {
    const { userName } = req.body;

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

module.exports = { signUp, signIn, checkUserNameAvailablity };
