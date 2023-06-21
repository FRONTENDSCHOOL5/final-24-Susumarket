import React from "react";
import SearchTopHeader from "./SearchTopHeader";
import FeedTopHeader from "./FeedTopHeader";
import FollowersTopHeader from "./FollowersTopHeader";
import ProfileTopHeader from "./ProfileTopHeader";
import ProfileEditTopHeader from "./ProfileEditTopHeader";
import UploadTopHeader from "./UploadTopHeader";
import ChatTopHeader from "./ChatTopHeader";

// 각각의 TopHeader를 props로 받아오는 type를 통해 구분해주어 해당 type에 맞는 TopHeader를 return해줍니다.
const TopHeader = ({ type, username = null, onClickMore, headerText }) => {
  switch (type) {
    case "search":
      return <SearchTopHeader headerText={headerText}/>;

    case "feed":
      return <FeedTopHeader headerText={headerText}/>;

    case "followers":
      return <FollowersTopHeader headerText={headerText}/>;

    case "profile":
      return <ProfileTopHeader onClickMore={onClickMore} headerText={headerText}/>;

    case "upload":
      return <UploadTopHeader headerText={headerText}/>;

    case "profileEdit":
      return <ProfileEditTopHeader headerText={headerText}/>;

    case "chat":
      // usernameTitle은 채팅방 TopHeader에서
      // 유저네임에 따라 바뀌어야하기 때문에 props를 추가적으로 설정하였습니다.
      return <ChatTopHeader usernameTitle={username}/>;

    default:
      return null;
  }
};

export default TopHeader;
