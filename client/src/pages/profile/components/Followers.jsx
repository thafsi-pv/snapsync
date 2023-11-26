import React, { useEffect, useState } from "react";
import PortalModal from "../../../components/uiPrimitives/modal/PortalModal";
import Button from "../../../components/uiPrimitives/button";
import { AiOutlineClose } from "react-icons/ai";
import { axiosInstance } from "../../../services/api/axiosInterceptor";
import { FOLLOWERS_USER_API } from "../../../services/api/const";
import UserImage from "../../../components/user/UserImage";
import { useNavigate } from "react-router-dom";

function Followers({ userName, showModal, setShowModal, listType }) {
  const navigate = useNavigate();
  const [userList, setUserList] = useState();

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = async () => {
    const response = await axiosInstance.get(
      `${FOLLOWERS_USER_API}?type=${listType}&userName=${userName}`
    );
    setUserList(response.data);
  };

  const handleProfileClick = (userName) => {
    navigate(`/${userName}`, { replace: true });
    setShowModal(false);
  };

  return (
    <PortalModal show={showModal}>
      <div
        id=""
        className="fixed inset-0 flex items-center justify-center overflow-hidden ">
        <div
          className="fixed inset-0 bg-black opacity-50 "
          onClick={() => setShowModal(false)}></div>
        <div className="relative flex flex-col  h-[50%] lg:w-[30%] w-[90%] bg-white z-10 rounded-xl">
          <div className="relative flex flex-col h-full ">
            <div className="text-center border-b w-full p-2 flex items-center">
              <div className="text-center flex-1">
                <p className="text-base font-semibold">{listType}</p>
              </div>
              <div
                className="cursor-pointer"
                onClick={() => setShowModal(false)}>
                <AiOutlineClose className="h-4 w-4 text-black" />
              </div>
            </div>

            <div className="relative h-full w-full">
              <div className="absolute overflow-y-scroll w-full h-full top-0 left-0 p-5 flex flex-col gap-3 ">
                {userList?.map((user) => (
                  <div
                    key={user._id}
                    className="flex flex-row gap-4 items-center">
                    <div className="relative flex gap-3 items-center justify-between w-full">
                      <UserImage
                        id={user.followedUserInfo._id}
                        imgUrl={user.followedUserInfo.imageUrl}
                        extra="w-12 h-12"
                        imgStyle="!p-0.5"
                        username={user.followedUserInfo.userName}
                      />
                      <div
                        className="flex flex-col items-start  flex-1"
                        onClick={() =>
                          handleProfileClick(user.followedUserInfo.userName)
                        }>
                        <p className="text-sm font-semibold mb-[-4px]">
                          {user.followedUserInfo.userName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {user.followedUserInfo.fullName}
                        </p>
                      </div>
                      <div>
                        <Button
                          label="Remove"
                          extraClass="!bg-gray-200 !text-black !p-1 w-24"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PortalModal>
  );
}

export default Followers;
