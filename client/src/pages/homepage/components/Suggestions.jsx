import React, { memo, useEffect, useState } from "react";
import User from "./User";
import { GET_SUGGESTION_LIST } from "../../../services/api/const";
import { axiosInstance } from "../../../services/api/axiosInterceptor";
import SuggestionUser from "../../../components/user/SuggestionUser";
import useSocialAction from "../../../hooks/useSocialAction";

function Suggestions() {
  // const [suggestionList, setSuggestionList] = useState();
  const { suggestionList, suggestionUsers } = useSocialAction();
  // useEffect(async () => {
  //   const list = await suggestionUsers();
  //   setSuggestionList(list);
  // }, []);
  useEffect(() => {
    suggestionUsers();
  }, []);
  return (
    <div className="relative flex flex-col w-full gap-12 items-start mt-10 mx-8 bg-white p-4">
      <div className="flex flex-row justify-between ml-px w-full  items-center">
        <div className="self-start flex flex-col gap-8 w-full items-start">
          <User />
          <div className="self-stretch flex flex-col ml-1 gap-5 items-start">
            <div className="text-base  tracking-[0.24] text-[#737373]">
              Suggesed for you
            </div>
            <div className="self-stretch flex flex-col justify-between ml-1 gap-5">
              {suggestionList?.map((user) => (
                <SuggestionUser user={user} key={user._id} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8 w-[279px] h-20 shrink-0">
        <div className="flex flex-col gap-2 items-start">
          <div className="text-xs font-['Microsoft_Sans_Serif'] tracking-[0.39] text-gray-400">
            About . Help .Press .API .Jobs . Privacy . Terms .
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

export default memo(Suggestions);
