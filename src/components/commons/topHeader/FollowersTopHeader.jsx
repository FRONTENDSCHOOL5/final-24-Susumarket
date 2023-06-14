import React from "react";
import backIcon from "../../../img/icon-arrow-left.svg";
import { useNavigate, useParams } from "react-router-dom";
import {
  TopHeaderWrapper,
  TopHeaderTitle,
  BackBtn,
  BackIcon,
} from "./TopHeaderStyle.js";

export default function FollowersTopHeader() {
  const { userId } = useParams();
  const navigation = useNavigate();

  function onClickBack(url) {
    navigation(url);
  }

  return (
    <TopHeaderWrapper className="followers">
      <BackBtn onClick={() => onClickBack(`/profile/${userId}`)}>
        <BackIcon src={backIcon} alt="뒤로가기" />
      </BackBtn>
      <TopHeaderTitle>Followers</TopHeaderTitle>
    </TopHeaderWrapper>
  );
}
