import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { axiosInstance } from "../api/axiosInterceptor";
import { GET_USER_DATA } from "../api/const";

export const UserActionContext = createContext(null);

function UserActionContextProvider({ children }) {
  console.log("user action context---rendered");
  // const { getStorage } = useLocalStorage();
  const [posts, setPosts] = useState([]); //post List
  const [userData, setUserData] = useState();
  const [addPost, setAddPost] = useState(false);
  const [comments, setComments] = useState(false);
  const [postId, setPostId] = useState(null);
  const [navbar, setNavbar] = useState("block");
  const [addStory, setAddStory] = useState(false);
  const [loadStory, setLoadStory] = useState({ loading: false, id: "" });
  const [searchBar, setSearchBar] = useState(false);
  const [notificationBar, setNotificationBar] = useState(false);
  const [share, setShare] = useState(false);
  const [more, setMore] = useState(false);
  const [popover, setPopover] = useState(false);
  const [postDetails, setPostDetails] = useState();
  const [isEditPost, setIsEditPost] = useState();
  const [followedUserId, setFollowedUserId] = useState(null);
  console.log(
    "🚀 ~ file: UserActionContext.jsx:32 ~ UserActionContextProvider ~ popover:",
    popover
  );

  const userDataRef = useRef();
  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = useCallback(async () => {
    const token = localStorage.getItem("ssaccesstoken");
    console.log("🚀 ~ #############token:", token);
    const response = await axiosInstance.get(GET_USER_DATA);
    setUserData(response?.data);
    userDataRef.current = response.data;
  }, []);

  return (
    <UserActionContext.Provider
      value={{
        posts,
        setPosts,
        userData,
        getUserData,
        userDataRef,
        setUserData,
        addPost,
        setAddPost,
        comments,
        setComments,
        postId,
        setPostId,
        navbar,
        setNavbar,
        addStory,
        setAddStory,
        loadStory,
        setLoadStory,
        searchBar,
        setSearchBar,
        notificationBar,
        setNotificationBar,
        share,
        setShare,
        more,
        setMore,
        popover,
        setPopover,
        postDetails,
        setPostDetails,
        isEditPost,
        setIsEditPost,
        followedUserId,
        setFollowedUserId,
      }}>
      {children}
    </UserActionContext.Provider>
  );
}

export default UserActionContextProvider;
