// Assuming you're using Express and Mongoose

const Notification = require("../model/notification");

const saveNotification = async (req, res) => {
  const { userId, postId, type } = req.params;
  const followerId = req.userId;

  await Notification.create({
    type,
    sender_Id: followerId,
    recipient_Id: userId,
    post_Id: postId,
  });

  res.json({ success: true });
};

const getNotification = async (req, res) => {
  const userId = req.user._id; // Assuming user is authenticated

  const notifications = await Notification.find({
    recipientId: userId,
    read: false,
  }).populate("senderId postId");

  res.json({ notifications });
};

const markAsRead = async (req, res) => {
  const { notificationId } = req.params;

  // Assuming you have middleware to check if the user owns the notification
  // ...

  await Notification.findByIdAndUpdate(notificationId, { read: true });

  res.json({ success: true });
};

// Route to handle follow action
// router.post("/follow/:userId", async (req, res) => {
//   const { userId } = req.params;
//   const followerId = req.userId; // Assuming user is authenticated

//   await Notification.create({
//     type: "follow",
//     sender_Id: followerId,
//     recipient_Id: userId,
//   });

//   res.json({ success: true });
// });
// router.post("/like/:userId", async (req, res) => {
//   const { userId, postId } = req.params;
//   const followerId = req.userId; // Assuming user is authenticated

//   await Notification.create({
//     type: "like",
//     sender_Id: followerId,
//     recipient_Id: userId,
//     post_id: postId,
//   });

//   res.json({ success: true });
// });
// router.post("/comment/:userId", async (req, res) => {
//   const { userId } = req.params;
//   const followerId = req.userId; // Assuming user is authenticated

//   await Notification.create({
//     type: "follow",
//     sender_Id: followerId,
//     recipient_Id: userId,
//   });

//   res.json({ success: true });
// });

// Similar routes for liking and commenting...

module.exports = { saveNotification, getNotification, markAsRead };
