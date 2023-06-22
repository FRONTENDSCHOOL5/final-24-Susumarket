import React, { useState } from "react";
import {
  FollowerListLi,
  FollowerListLink,
  UserWrapper,
  UserName,
  UserIntro,
  FollowButton,
} from "./followerList.style";

import { addFollowAPI } from "./addFollowAPI";
import { deleteFollowAPI } from "./deleteFollowAPI";
import Button from "../../../../components/commons/button/Button";

export default function FollowerList({ follower, account }) {
  const [isFollow, setIsFollow] = useState(follower.isfollow);

  // addFollowAPI, deleteFollowAPI 호출함수 구현 필요
  console.log(follower);
  const handleSubmitFollow = async () => {
    const response = await addFollowAPI(follower.accountname);
    setIsFollow(true);
    console.log("response", response);
  };

  const handleSubmitUnFollow = async () => {
    const response = await deleteFollowAPI(follower.accountname);
    setIsFollow(false);
    console.log("response", response);
  };

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
        <img
          src={follower.image}
          alt="프로필 이미지"
          style={{
            objectFit: "cover",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
          }}
        />
        <UserWrapper>
          <UserName>{follower.username}</UserName>
          <UserIntro>{follower.intro}</UserIntro>
        </UserWrapper>
        {follower.accountname === account ? null : (
          <FollowButton
            className="small"
            active={!isFollow} // isFollow 상태 값을 반전시켜서 active prop으로 전달
            onClick={handleFollowBtn}
          >
            {isFollow ? "취소" : "팔로우"}
          </FollowButton>
        )}
      </FollowerListLink>
    </FollowerListLi>
  );
}
