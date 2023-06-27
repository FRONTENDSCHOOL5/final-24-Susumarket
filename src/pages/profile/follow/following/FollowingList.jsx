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
import DefaultImg from "../../../../img/basic-profile.svg";

const defaultImage = DefaultImg;

export default function FollowingList({ following, account }) {
  const [isFollow, setIsFollow] = useState(following.isfollow);

  // 팔로잉 추가 API호출
  const handleSubmitFollow = async () => {
    await addFollowAPI(following.accountname);
    setIsFollow(true);
  };

  // 팔로잉 삭제 API호출
  const handleSubmitUnFollow = async () => {
    await deleteFollowAPI(following.accountname);
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
        <img
          src={
            following.image.endsWith("Ellipse.png")
              ? defaultImage
              : following.image
          }
          onError={(e) => (e.target.src = DefaultImg)}
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
      </FollowingListLink>
      {following.accountname === account ? null : (
          <FollowButton
            className="small"
            active={!isFollow} // isFollow 상태 값을 반전시켜서 active prop으로 전달
            onClick={handleFollowBtn}
          >
            {isFollow ? "취소" : "팔로우"}
          </FollowButton>
        )}
    </FollowingListLi>
  );
}
