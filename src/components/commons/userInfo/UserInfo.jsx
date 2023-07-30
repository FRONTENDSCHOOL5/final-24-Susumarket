import React from "react";
import {
  Chat,
  Intro,
  UserAccount,
  UserIdWrapper,
  UserInfoWrapper,
  UserName,
  UserProfileImg,
  UserProfileLink,
  UserInfoModalBtn,
  UserInfoDate,
  UserNameWrapper,
} from "./userInfo.style";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";
import defaultImg from "../../../img/ProfileImg.svg";
import DateFormat from "../dateFormat/DateFormat";

export default function UserInfo({
  right,
  userData,
  date,
  bottom,
  lastChat,
  commentDate,
  onClickModalBtn,
  onClickFollowBtn,
  isFollow,
}) {
  const navigate = useNavigate();
  const setRight = () => {
    switch (right) {
      case "modalBtn":
        return (
          <UserInfoModalBtn
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClickModalBtn();
            }}
            aria-label="더 보기"
          ></UserInfoModalBtn>
        );
      case "date":
        return <UserInfoDate dateTime={date.replace(/\./g,"-")}>{date}</UserInfoDate>;
      case "followBtn":
        return (
          <Button
            type="button"
            active={!isFollow}
            className="small"
            onClick={(e) => {
              e.stopPropagation();
              onClickFollowBtn(e);
            }}
          >
            {isFollow ? "취소" : "팔로우"}
          </Button>
        );
      default:
        return null;
    }
  };

  const setBottom = () => {
    switch (bottom) {
      case "account":
        return <UserAccount>{userData.accountname}</UserAccount>;
      case "intro":
        return <Intro>{userData.intro}</Intro>;
      case "chat":
        return <Chat>{lastChat}</Chat>;
      default:
        return null;
    }
  };
  return (
    <UserInfoWrapper>
      <UserProfileLink
        onClick={() =>
          bottom === "chat"
            ? navigate(`/chatList/${userData.accountname}`)
            : navigate(`/profile/${userData.accountname}`)
        }
      >
        <UserProfileImg
          src={
            userData.image.includes("Ellipse.png") ? defaultImg : userData.image
          }
          alt="유저 프로필 이미지"
          onError={(e) => (e.target.src = defaultImg)}
          commentDate={commentDate}
        />
        <UserIdWrapper>
          {commentDate ? (
            <UserNameWrapper>
              <UserName>{userData.username}</UserName>
              <DateFormat dateString={commentDate} />
            </UserNameWrapper>
          ) : (
            <UserName>{userData.username}</UserName>
          )}
          {setBottom()}
        </UserIdWrapper>
        {setRight()}
      </UserProfileLink>
    </UserInfoWrapper>
  );
}
