const { default: mongoose } = require("mongoose");

const textMessageSchema = mongoose.Schema(
  {
    text: { type: String, required: true },
  },
  { timestamps: true }
);
const TextMessage = mongoose.model("TextMessage", textMessageSchema);

const postMessageSchema = mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  { timestamps: true }
);

const PostMessage = mongoose.model("PostMessage", postMessageSchema);

const profileMessageSchema = mongoose.Schema({
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
});

const ProfileMessage = mongoose.model("ProfileMessage", profileMessageSchema);

module.exports = { TextMessage, PostMessage, ProfileMessage };
