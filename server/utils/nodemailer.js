const nodemailer = require("nodemailer");
const { baseUrl, frondEndBaseUrl } = require("./const");
const {
  accountVerificatinMailTemplate,
} = require("../templates/emailVerification");

const sendPasswordResetEmail = async (toEmail, verificationCode) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // can be replaced with any email service provider
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: "reset@moviedb.com", // replace with your email
    to: toEmail,
    subject: "Movie DB Password reset",
    // text: ``, // replace with your message
    html: `
    <h1> Password Reset Code</h1>
    <p>You have requested to reset your password. Please use the following verification code to reset your password:</p>
    <h2 style="text-align: center; background-color: #f1f1f1; padding: 10px; border-radius: 5px;">${verificationCode}</h2>
    <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
  `,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("Email sent: " + info.response);
  return info;
};

const sendAccountActivationEmail = async (
  toEmail,
  activationToken,
  username
) => {
  const activationUrl = `${frondEndBaseUrl}/auth/verifyemail?code=${activationToken}`;
  const mailTemplate = accountVerificatinMailTemplate;
  const replacedTemplate = mailTemplate
    .replace(/\[LOGO\]/, `${baseUrl}/img/snapsync_logo.png"`)
    .replace(/\[ACTIVATION_URL\]/, activationUrl)
    .replace(/\[ACTIVATION_URL\]/, activationUrl)
    .replace(/\[USERNAME\]/, username);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "reset@moviedb.com",
    to: toEmail,
    subject: "Snapsync Account Activation",
    // text: ``, // replace with your message
    html: replacedTemplate,
  };

  const info = await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email failed to send:", error);
    } else {
      console.log("Email sent successfully:", info.response);
    }
  });
  console.log("Email sent: " + info.response);
  return info;
};

module.exports = { sendPasswordResetEmail, sendAccountActivationEmail };
