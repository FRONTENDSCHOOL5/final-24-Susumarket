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
  ProfileInfoButtonIcon,
} from "./ProfileInfo.styles";
import messageIcon from "../../../../img/icon-message-circle.svg";
import shareIcon from "../../../../img/icon-share.svg";
import profileImg from "../../../../img/ProfileImg.svg";
import messageIconWebp from "../../../../img/webp/icon-message-circle.webp";
import shareIconWebp from "../../../../img/webp/icon-share.webp";
import profileImgWebp from "../../../../img/webp/ProfileImg.webp";
import Button from "../../../../components/commons/button/Button";
import { resolveWebp } from "../../../../library/checkWebpSupport";
export default function ProfileInfoUI({
  userData,
  followCount,
  account,
  isfollow,
  onClickButton,
  onClickUnfollow,
  onClickFollow,
}) {
  return (
    <ProfileInfoWrapper>
      <ProfileInfoTitle className="a11y-hidden">프로필 정보</ProfileInfoTitle>
      <UserInfo>
        <ProfileInfoFollowers to={`/profile/${userData.accountname}/followers`}>
          <ProfileInfoFollowersCount>
            {followCount || 0}
          </ProfileInfoFollowersCount>
          <ProfileInfoFollowersText>followers</ProfileInfoFollowersText>
        </ProfileInfoFollowers>
        <ProfileInfoeImg
          src={
            userData.image && userData.image.includes("Ellipse.png")
              ? resolveWebp(profileImgWebp, messageIcon)
              : userData.image
          }
          onError={(e) => (e.target.src = resolveWebp(profileImgWebp, profileImg))}
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
            <Button
              className="medium"
              onClick={() => onClickButton(`/profile/myinfo/edit`)}
            >
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
              <ProfileInfoButtonIcon
                src={resolveWebp(messageIconWebp, messageIcon)}
                alt="채팅"
              />
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
              <Button
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
              <ProfileInfoButtonIcon
                src={resolveWebp(shareIconWebp, shareIcon)}
                alt="공유"
              />
            </Button>
          </>
        )}
      </ProfileInfoButtonWrapper>
    </ProfileInfoWrapper>
  );
}
