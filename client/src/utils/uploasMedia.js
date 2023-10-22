import { CLOUDINARY_IMAGE_UPLOAD_URL, CLOUDINARY_VIDEO_UPLOAD_URL } from "../axios/const";

const handleUploadMedia = async (file) => {
  var data = new FormData();
  data.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
  data.append("file", file);
  data.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);

  const config = {
    method: "POST",
    body: data,
  };
  const response = await fetch(CLOUDINARY_VIDEO_UPLOAD_URL, config);
  const responseData = await response.json();
  return responseData.secure_url;
};

export default handleUploadMedia;
