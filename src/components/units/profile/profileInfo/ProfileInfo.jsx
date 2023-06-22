import React, { useContext, useEffect, useState } from "react";
import {
  ProfileInfoFollowering,
  ProfileInfoFolloweringCount,
  ProfileInfoFolloweringText,
  ProfileInfoFollowers,
  ProfileInfoFollowersCount,
  ProfileInfoFollowersText,
  ProfileInfoIntro,
  ProfileInfoTitle,
  ProfileInfoUserAccountName,
  ProfileInfoUserId,
  ProfileInfoUserNameWrapper,
  ProfileInfoWrapper,
  ProfileInfoeImg,
  ProfileInfoButtonWrapper,
  UserInfo,
  ProfileInfoButtonIcon,
} from "./ProfileInfo.styles";
import messageIcon from "../../../../img/icon-message-circle.svg";
import shareIcon from "../../../../img/icon-share.svg";

import profileImg from "../../../../img/ProfileImg.svg";
import Button from "../../../commons/button/Button";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../../../context/UserContext";
import { customAxios } from "../../../../library/customAxios";
export default function ProfileInfo({ userData }) {
  const [isfollow, setIsfollow] = useState(userData.isfollow);
  const navigate = useNavigate();
  const { account } = useContext(UserContext);
  const params = useParams();
  const userAccountname = params.userId;
  function onClickButton(url) {
    navigate(url);
  }

  async function onClickFollow() {
    try {
      await customAxios.post(`profile/${userAccountname}/follow`);
      setIsfollow(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function onClickUnfollow() {
    try {
      await customAxios.delete(`profile/${userAccountname}/unfollow`);
      setIsfollow(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ProfileInfoWrapper>
      <ProfileInfoTitle className="a11y-hidden">프로필 정보</ProfileInfoTitle>
      <UserInfo>
        <ProfileInfoFollowers to={`/profile/${userData.accountname}/followers`}>
          <ProfileInfoFollowersCount>
            {userData.followerCount || 0}
          </ProfileInfoFollowersCount>
          <ProfileInfoFollowersText>followers</ProfileInfoFollowersText>
        </ProfileInfoFollowers>
        <ProfileInfoeImg
          src={
            userData.image === "https://api.mandarin.weniv.co.kr/Ellipse.png"
              ? profileImg
              : userData.image || profileImg
          }
          alt="유저 프로필 이미지"
        />
        <ProfileInfoFollowering
          to={`/profile/${userData.accountname}/following`}
        >
          <ProfileInfoFolloweringCount>
            {userData.followingCount || 0}
          </ProfileInfoFolloweringCount>
          <ProfileInfoFolloweringText>following</ProfileInfoFolloweringText>
        </ProfileInfoFollowering>
      </UserInfo>
      <ProfileInfoUserNameWrapper>
        <ProfileInfoUserId>{userData.username}</ProfileInfoUserId>
        <ProfileInfoUserAccountName>
          {userData.accountname}
        </ProfileInfoUserAccountName>
      </ProfileInfoUserNameWrapper>
      <ProfileInfoIntro>{userData.intro}</ProfileInfoIntro>
      <ProfileInfoButtonWrapper>
        {userData.accountname === account ? (
          <>
            <Button className="medium" onClick={() => onClickButton(`edit`)}>
              프로필 수정
            </Button>
            <Button
              className="medium"
              onClick={() => onClickButton(`/product/upload`)}
            >
              상품등록
            </Button>
          </>
        ) : (
          <>
            <Button
              type="button"
              className="small"
              style={{ width: "34px", height: "34px", padding: "9.5px" }}
            >
              <ProfileInfoButtonIcon src={messageIcon} alt="채팅" />
            </Button>

            {isfollow ? (
              <Button 
                type="button"
                className="medium"
                onClick={onClickUnfollow}
              >
                언팔로우
              </Button>
            ) : (
              <Button style={{width:"136px"}}
                type="button"
                className="medium"
                active={true}
                onClick={onClickFollow}
              >
                팔로우
              </Button>
            )}

            <Button
              type="button"
              className="small"
              style={{ width: "34px", height: "34px", padding: "9.5px" }}
            >
              <ProfileInfoButtonIcon src={shareIcon} alt="공유" />
            </Button>
          </>
        )}
      </ProfileInfoButtonWrapper>
    </ProfileInfoWrapper>
  );
}
