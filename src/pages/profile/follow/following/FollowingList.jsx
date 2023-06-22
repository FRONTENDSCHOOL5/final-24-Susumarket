import React, { useState } from "react";
import {
  FollowingListLink,
  FollowingListLi,
  UserWrapper,
  UserName,
  UserIntro,
  FollowButton,
} from "./followingList.style";

import { addFollowAPI } from "../followers/addFollowAPI";
import { deleteFollowAPI } from "../followers/deleteFollowAPI";

export default function FollowingList({ following, account }) {
  const [isFollow, setIsFollow] = useState(following.isfollow);

  // addFollowAPI, deleteFollowAPI 호출함수 구현 필요
  console.log(following);
  const handleSubmitFollow = async () => {
    const response = await addFollowAPI(following.accountname);
    setIsFollow(true);
    console.log("response", response);
  };

  const handleSubmitUnFollow = async () => {
    const response = await deleteFollowAPI(following.accountname);
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
    <FollowingListLi>
      <FollowingListLink to={`/profile/${following.accountname}`}>
        <img
          src={following.image}
          alt="프로필 이미지"
          style={{
            objectFit: "cover",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
          }}
        />
        <UserWrapper>
          <UserName>{following.username}</UserName>
          <UserIntro>{following.intro}</UserIntro>
        </UserWrapper>
        {following.accountname === account ? null : (
          <FollowButton
            className="small"
            active={!isFollow} // isFollow 상태 값을 반전시켜서 active prop으로 전달
            onClick={handleFollowBtn}
          >
            {isFollow ? "취소" : "팔로우"}
          </FollowButton>
        )}
      </FollowingListLink>
    </FollowingListLi>
  );
}
