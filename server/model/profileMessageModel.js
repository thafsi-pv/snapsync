const mongoose = require("mongoose");

const profileMessageSchema = mongoose.Schema({
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
});

module.exports = mongoose.model("ProfileMessage", profileMessageSchema);
