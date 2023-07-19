import React, { useState } from "react";
import {
  FollowerListLi,
  FollowerListLink,
  UserWrapper,
  UserName,
  UserIntro,
  FollowButton,
} from "./followerList.style";
import DefaultImg from "../../../../img/basic-profile.svg";
import { followAPI } from "../../../../API/profileAPI";
import { unFollowAPI } from "../../../../API/profileAPI";
import UserInfo from "../../../../components/commons/userInfo/UserInfo";

const defaultImage = DefaultImg;
export default function FollowerList({ follower, account }) {
  const [isFollow, setIsFollow] = useState(follower.isfollow);

  // 팔로워 추가 API호출
  const handleSubmitFollow = async () => {
    await followAPI(follower.accountname);
    setIsFollow(true);
  };

  // 팔로워 삭제 API호출
  const handleSubmitUnFollow = async () => {
    await unFollowAPI(follower.accountname);
    setIsFollow(false);
  };

  // 버튼 클릭시 발생하는 함수
  const handleFollowBtn = (e) => {
    e.preventDefault();
    if (isFollow) {
      handleSubmitUnFollow();
    } else {
      handleSubmitFollow();
    }
  };

  return (
    <FollowerListLi>
      <FollowerListLink to={`/profile/${follower.accountname}`}>
        <UserInfo bottom="intro" userData={follower} />
        {follower.accountname !== account && (
          <FollowButton
            className="small"
            active={!isFollow}
            onClick={handleFollowBtn}
          >
            {isFollow ? "취소" : "팔로우"}
          </FollowButton>
        )}
      </FollowerListLink>
    </FollowerListLi>
  );
}
