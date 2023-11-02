import React, { useContext, useState } from "react";
import { UserActionContext } from "../../../context/UserActionContext";
import InputField from "../../../components/fields/InputField";
import TextField from "../../../components/fields/TextField";

function EditProfile() {
  const { userData } = useContext(UserActionContext);
  const [bio, setBio] = useState();
  const [profileImg, setProfileImg] = useState(null);

  const handleProfileImage = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setProfileImg(selectedImage);
    }
  };

  return (
    <div className="flex flex-1 h-screen w-full  justify-start items-center">
      <div className="w-1/2">
        <p className="font-semibold text-2xl">Edit Profile</p>
        <div className="gap-3 flex flex-col ml-10 mt-10">
          <div className="flex gap-10">
            <div className="w-16">
              <img
                src={
                  profileImg != null
                    ? URL.createObjectURL(profileImg)
                    : userData?.imageUrl
                }
                alt=""
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
            <div>
              <p>{userData?.userName}</p>
              <div className="relative group">
                <input
                  type="file"
                  className="hidden"
                  id="fileInput"
                  name="file"
                  accept="image/*"
                  onChange={handleProfileImage}
                />
                <label
                  for="fileInput"
                  className="font-semibold cursor-pointer block   text-blue-500 text-sm text-center ">
                  Change profile photo
                </label>
              </div>
            </div>
          </div>
          {/* <div className="flex gap-10 items-center">
            <p>Website</p>
            <div>
              <InputField placeholder='Website'  extra='rounded-md' />
              <p className="text-xs">
                Editing your links is only available on mobile. Visit the
                Instagram app and edit your profile to change the websites in
                your bio.
              </p>
            </div>
          </div> */}
          <div className="flex gap-10 items-baseline">
            <p className="w-20 font-semibold">Bio</p>
            <div className="">
              <TextField placeholder="Bio" extra="rounded-md" value={bio} />
              <p className="text-xs text-gray-400">
                Can include link to personal website or another webpage, as well
                as links to other Instagram profiles,
              </p>
            </div>
          </div>
          <div>
            <div className="ml-24">
              <button
                type="button"
                className=" p-2 px-3 bg-blue-500 rounded-md text-white text-sm">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
