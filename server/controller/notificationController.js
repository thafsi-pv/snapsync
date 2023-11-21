const Notification = require("../model/notificationModel");

const saveNotification = async (req, res) => {
  const { recipient_Id, postId, type } = req.params;
  const sender_Id = req.userId;

  const existingNotification = await Notification.findOne({
    type,
    sender_Id,
    recipient_Id,
    post_Id: postId,
  });
  if (existingNotification) {
    existingNotification.updatedAt = new Date();
    await existingNotification.save();
  } else {
    await Notification.create({
      type,
      sender_Id,
      recipient_Id,
      post_Id: postId,
    });
  }
  res.json({ success: true });
};

const getNotification = async (req, res) => {
  try {
    const userId = req.userId; // Assuming user is authenticated
    const notifications = await Notification.find({
      recipient_Id: userId,
      // read: false,
    }).populate("sender_Id post_Id");
    res.json({ notifications });
  } catch (error) {
    console.log(
      "🚀 ~ file: notificationController.js:40 ~ getNotification ~ error:",
      error
    );
  }
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
