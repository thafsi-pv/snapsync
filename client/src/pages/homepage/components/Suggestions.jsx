import React, { useEffect, useState } from "react";
import User from "./User";
import { axiosInstance } from "../../../axios/axiosInterceptor";
import { GET_SUGGESTION_LIST } from "../../../axios/const";

function Suggestions() {
  const [suggestionList, setSuggestionList] = useState();
  useEffect(() => {
    suggestionUsers();
  }, []);

  const suggestionUsers = async () => {
    const response = await axiosInstance.get(GET_SUGGESTION_LIST);
    console.log(
      "🚀 ~ file: Suggestions.jsx:13 ~ suggestionUsers ~ response:",
      response
    );
    setSuggestionList(response.data);
  };

  return (
    <div className="relative flex flex-col w-full gap-12 items-start mt-10 mx-8">
      <div className="flex flex-row justify-between ml-px w-full  items-center">
        <div className="self-start flex flex-col gap-8 w-full items-start">
          <User />
          <div className="self-stretch flex flex-col ml-1 gap-5 items-start">
            <div className="text-base  tracking-[0.24] text-[#737373]">
              Suggesed for you
            </div>
            <div className="self-stretch flex flex-col justify-between ml-1 gap-5">
              {suggestionList?.map((user) => (
                <div className="flex flex-row gap-4 items-center ml-px">
                  <img
                    src={user?.imageUrl}
                    className="w-11 h-11 shrink-0 rounded-full"
                  />
                  <div className="flex flex-col gap-1 w-24 shrink-0 flex-grow items-start">
                    <p className="text-sm  tracking-[0.42]">{user?.fullName}</p>
                    <p className="text-xs  tracking-[0.39] text-[#737373]">
                      Followed by zia
                    </p>
                  </div>
                  <div className="items-end flex-grow-0 p-2">
                    <button className="text-xs font-semibold text-blue-500">
                      Follow
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8 w-[279px] h-20 shrink-0">
        <div className="flex flex-col gap-2 items-start">
          <div className="text-xs font-['Microsoft_Sans_Serif'] tracking-[0.39] text-gray-400">
            About . Help .Press .API .Jobs . Prtivacy . Terms .
          </div>
          <div className="text-xs font-['Microsoft_Sans_Serif'] tracking-[0.39] text-gray-400">
            Locations . Languages .Meta Verified
          </div>
        </div>
        <div className="text-xs font-['Microsoft_Sans_Serif'] tracking-[0.39] text-gray-400">
          © 2023 FROM SNAPSYNC WITH ♥️
        </div>
      </div>
    </div>
  );
}

export default Suggestions;
