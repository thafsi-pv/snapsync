const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    emailPhone: { type: String, required: true, trim: true },
    fullName: { type: String, required: true, trim: true },
    userName: { type: String, required: true, trim: true },
    password: { type: String },
    imageUrl: {
      type: String,
      default:
        "https://res.cloudinary.com/dm4djc1b1/image/upload/v1696873271/ymkpg1ig0htdxdi96aey.png",
    },
    isVerified: { type: Boolean, default: false },
    bio: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
