import React from "react";
import backIcon from "../../../img/icon-arrow-left.svg";
import { useNavigate, useParams } from "react-router-dom";
import {
  TopHeaderWrapper,
  TopHeaderTitle,
  TopHeaderBackBtn,
  TopHeaderBackIcon,
  TopHeaderLeft,
} from "./TopHeaderStyle.js";

export default function FollowersTopHeader() {
  const { userId } = useParams();
  const navigation = useNavigate();

  function onClickBack(url) {
    navigation(url);
  }

  return (
    <TopHeaderWrapper>
      <TopHeaderLeft>
        <TopHeaderBackBtn onClick={() => onClickBack(`/profile/${userId}`)}>
          <TopHeaderBackIcon src={backIcon} alt="뒤로가기" />
        </TopHeaderBackBtn>
      <TopHeaderTitle>Followers</TopHeaderTitle>
      </TopHeaderLeft>
    </TopHeaderWrapper>
  );
}
