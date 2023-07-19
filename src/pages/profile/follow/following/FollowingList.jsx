import React, { useState } from "react";
import {
  FollowingListLink,
  FollowingListLi,
  UserWrapper,
  UserName,
  UserIntro,
  FollowButton,
} from "./followingList.style";
import { followAPI } from "../../../../API/profileAPI";
import { unFollowAPI } from "../../../../API/profileAPI";
import DefaultImg from "../../../../img/basic-profile.svg";
import UserInfo from "../../../../components/commons/userInfo/UserInfo";

const defaultImage = DefaultImg;

export default function FollowingList({ following, account }) {
  const [isFollow, setIsFollow] = useState(following.isfollow);

  // 팔로잉 추가 API호출
  const handleSubmitFollow = async () => {
    await followAPI(following.accountname);
    setIsFollow(true);
  };

  // 팔로잉 삭제 API호출
  const handleSubmitUnFollow = async () => {
    await unFollowAPI(following.accountname);
    setIsFollow(false);
  };

  // 버튼 클릭시 실행되는 함수
  const handleFollowBtn = (e) => {
    e.preventDefault();
    if (isFollow) {
      handleSubmitUnFollow();
    } else {
      handleSubmitFollow();
    }
  };

  return (
    <FollowingListLi>
      <FollowingListLink to={`/profile/${following.accountname}`}>
        <UserInfo bottom="intro" userData={following} />
        {following.accountname !== account && (
          <FollowButton
            className="small"
            active={!isFollow}
            onClick={handleFollowBtn}
          >
            {isFollow ? "취소" : "팔로우"}
          </FollowButton>
        )}
      </FollowingListLink>
    </FollowingListLi>
  );
}
