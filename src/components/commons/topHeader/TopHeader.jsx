import React from "react";
import SearchTopHeader from "./SearchTopHeader";
import FeedTopHeader from "./FeedTopHeader";
import FollowersTopHeader from "./FollowersTopHeader";
import ProfileTopHeader from "./ProfileTopHeader";
import ProfileEditTopHeader from "./ProfileEditTopHeader";
import UploadTopHeader from "./UploadTopHeader";
import ChatTopHeader from "./ChatTopHeader";

const TopHeader = ({ type, username = null }) => {
  switch (type) {
    case "search":
      return <SearchTopHeader />;

    case "feed":
      return <FeedTopHeader />;

    case "followers":
      return <FollowersTopHeader />;

    case "profile":
      return <ProfileTopHeader />;

    case "upload":
      return <UploadTopHeader />;

    case "profileEdit":
      return <ProfileEditTopHeader />;

    case "chat":
      return <ChatTopHeader usernameTitle={username}/>;

    default:
      return null;
  }
};

export default TopHeader;
