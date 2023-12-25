export const transformedData = (posts) => {
  const transformed = posts.map((post) => ({
    _id: post._id,
    caption: post.caption,
    location: post.location,
    createdAt: post.createdAt,
    user: {
      _id: post.user._id,
      emailPhone: post.user.emailPhone,
      fullName: post.user.fullName,
      userName: post.user.userName,
      imageUrl: post.user.imageUrl,
      isVerified: post.user.isVerified,
      createdAt: post.user.createdAt,
      updatedAt: post.user.updatedAt,
      __v: post.user.__v,
      bio: post.user.bio,
    },
    media_url: post.files[0].fileUrl,
    media_Type: post.files[0].fileType,
    files: post.files.map((file) => ({
      fileUrl: file.fileUrl,
      fileType: file.fileType,
    })),
    likeCount: post.likeCount,
    commentCount: post.commentCount,
  }));
  return transformed;
};
