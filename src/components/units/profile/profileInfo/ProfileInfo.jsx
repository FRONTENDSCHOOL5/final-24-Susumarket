import React from "react";
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
} from "./ProfileInfo.styles";
import profileImg from "../../../../img/ProfileImg.svg";
import Button from "../../../commons/button/Button";
import { useNavigate } from "react-router-dom";
export default function ProfileInfo() {
  const navigate = useNavigate();
  function onClickButton(url) {
    navigate(url);
  }
  return (
    <ProfileInfoWrapper>
      <ProfileInfoTitle className="a11y-hidden">프로필 정보</ProfileInfoTitle>
      <UserInfo>
        <ProfileInfoFollowers to={"#"}>
          <ProfileInfoFollowersCount>0</ProfileInfoFollowersCount>
          <ProfileInfoFollowersText>followers</ProfileInfoFollowersText>
        </ProfileInfoFollowers>
        <ProfileInfoeImg src={profileImg} alt="유저 프로필 이미지" />
        <ProfileInfoFollowering to={"#"}>
          <ProfileInfoFolloweringCount>9</ProfileInfoFolloweringCount>
          <ProfileInfoFolloweringText>followering</ProfileInfoFolloweringText>
        </ProfileInfoFollowering>
      </UserInfo>
      <ProfileInfoUserNameWrapper>
        <ProfileInfoUserId>asd1</ProfileInfoUserId>
        <ProfileInfoUserAccountName>asd1</ProfileInfoUserAccountName>
      </ProfileInfoUserNameWrapper>
      <ProfileInfoIntro>안녕하세요.</ProfileInfoIntro>
      <ProfileInfoButtonWrapper>
        <Button className="medium" onClick={() => onClickButton(`edit`)}>
          프로필 수정
        </Button>
        <Button
          className="medium"
          onClick={() => onClickButton(`/product/upload`)}
        >
          상품등록
        </Button>
      </ProfileInfoButtonWrapper>
    </ProfileInfoWrapper>
  );
}
