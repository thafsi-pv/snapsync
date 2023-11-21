const { default: mongoose } = require("mongoose");
const Notification = require("../model/notificationModel");

const saveNotification = async (req, res) => {
  const { recipient_Id, post_Id, type } = req.body;
  const sender_Id = req.userId;

  const existingNotification = await Notification.findOne({
    type,
    sender_Id,
    recipient_Id,
    post_Id,
  });
  if (existingNotification) {
    existingNotification.updatedAt = new Date();
    await existingNotification.save();
  } else {
    await Notification.create({
      type,
      sender_Id,
      recipient_Id,
      post_Id,
    });
  }
  res.json({ success: true });
};

const getNotification = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.userId);
    // const notifications = await Notification.find({
    //   recipient_Id: userId,
    // }).populate(["sender_Id", "post_Id"]);

    // const notifications = await Notification.aggregate([
    //   {
    //     $match: {
    //       recipient_Id: new mongoose.Types.ObjectId(userId),
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: "users",
    //       localField: "sender_Id",
    //       foreignField: "_id",
    //       as: "sender",
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: "posts",
    //       localField: "post_Id",
    //       foreignField: "_id",
    //       as: "post",
    //     },
    //   },
    //   {
    //     $unwind: "$post",
    //   },
    //   {
    //     $group: {
    //       _id: "$post._id",
    //       notifications: {
    //         $push: {
    //           type: "$type",
    //           sender: {
    //             _id: "$sender._id",
    //             username: "$sender.userName",
    //           },
    //           read: "$read",
    //           createdAt: "$createdAt",
    //         },
    //       },
    //     },
    //   },
    //   {
    //     $addFields: {
    //       totalNotifications: { $size: "$notifications" },
    //     },
    //   },
    //   {
    //     $sort: {
    //       totalNotifications: -1,
    //     },
    //   },
    //   {
    //     $facet: {
    //       today: [
    //         {
    //           $match: {
    //             "notifications.createdAt": {
    //               $gte: new Date(new Date().setHours(0, 0, 0, 0)),
    //             },
    //           },
    //         },
    //       ],
    //       yesterday: [
    //         {
    //           $match: {
    //             "notifications.createdAt": {
    //               $gte: new Date(new Date() - 2 * 24 * 60 * 60 * 1000), // from yesterday
    //               $lt: new Date(new Date() - 24 * 60 * 60 * 1000), // up to today
    //             },
    //           },
    //         },
    //       ],
    //       // last3Days: [
    //       //   {
    //       //     $match: {
    //       //       "notifications.createdAt": {
    //       //         $gte: new Date(new Date() - 3 * 24 * 60 * 60 * 1000),
    //       //         $lt: new Date(new Date() - 2 * 24 * 60 * 60 * 1000),
    //       //       },
    //       //     },
    //       //   },
    //       // ],

    //       thisWeek: [
    //         {
    //           $match: {
    //             "notifications.createdAt": {
    //               $gte: new Date(new Date() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    //               $lt: new Date(new Date() - 2 * 24 * 60 * 60 * 1000), // before yesterday
    //             },
    //           },
    //         },
    //       ],
    //       thisMonth: [
    //         {
    //           $match: {
    //             "notifications.createdAt": {
    //               $gte: new Date(new Date() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    //               $lt: new Date(new Date() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    //             },
    //           },
    //         },
    //       ],
    //       thisYear: [
    //         {
    //           $match: {
    //             "notifications.createdAt": {
    //               $lt: new Date(new Date() - 30 * 24 * 60 * 60 * 1000), //30 days
    //             },
    //           },
    //         },
    //       ],
    //     },
    //   },
    // ]);

    const notifications = await Notification.aggregate([
      {
        $match: {
          recipient_Id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "sender_Id",
          foreignField: "_id",
          as: "sender",
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "post_Id",
          foreignField: "_id",
          as: "post",
        },
      },
      {
        $unwind: "$post",
      },
      {
        $group: {
          _id: "$post._id",
          notifications: {
            $push: {
              type: "$type",
              sender: {
                _id: "$sender._id",
                username: "$sender.userName",
                imageUrl: "$sender.imageUrl",
              },
              read: "$read",
              createdAt: "$createdAt",
            },
          },
          totalNotifications: { $sum: 1 },
        },
      },
      {
        $sort: {
          totalNotifications: -1,
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "_id",
          as: "postDetails",
        },
      },
      {
        $facet: {
          today: [
            {
              $match: {
                "notifications.createdAt": {
                  $gte: new Date(new Date().setHours(0, 0, 0, 0)),
                },
              },
            },
            {
              $addFields: {
                facetName: "Today",
              },
            },
          ],
          yesterday: [
            {
              $match: {
                "notifications.createdAt": {
                  $gte: new Date(new Date() - 2 * 24 * 60 * 60 * 1000), // from yesterday
                  $lt: new Date(new Date() - 24 * 60 * 60 * 1000), // up to today
                },
              },
            },
            {
              $addFields: {
                facetName: "Yesterday",
              },
            },
          ],
          // last3Days: [
          //   {
          //     $match: {
          //       "notifications.createdAt": {
          //         $gte: new Date(new Date() - 3 * 24 * 60 * 60 * 1000),
          //         $lt: new Date(new Date() - 2 * 24 * 60 * 60 * 1000),
          //       },
          //     },
          //   },
          // ],
          thisWeek: [
            {
              $match: {
                "notifications.createdAt": {
                  $gte: new Date(new Date() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
                  $lt: new Date(new Date() - 2 * 24 * 60 * 60 * 1000), // before yesterday
                },
              },
            },
            {
              $addFields: {
                facetName: "This Week",
              },
            },
          ],
          thisMonth: [
            {
              $match: {
                "notifications.createdAt": {
                  $gte: new Date(new Date() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
                  $lt: new Date(new Date() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
                },
              },
            },
            {
              $addFields: {
                facetName: "This Month",
              },
            },
          ],
          thisYear: [
            {
              $match: {
                "notifications.createdAt": {
                  $lt: new Date(new Date() - 30 * 24 * 60 * 60 * 1000), //30 days
                },
              },
            },
            {
              $addFields: {
                facetName: "This Year",
              },
            },
          ],
        },
      },
    ]);

    console.log(notifications);

    console.log(notifications);

    res.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Internal Server Error" });
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
