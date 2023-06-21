import React from "react";
import backIcon from "../../../img/icon-arrow-left.svg";
import { useNavigate, useParams } from "react-router-dom";
import {
  TopHeaderWrapper,
  TopHeaderTitle,
  TopHeaderBackBtn,
  TopHeaderBackIcon,
  TopHeaderLeft,
  TopHeaderMainTitle,
} from "./TopHeaderStyle.js";

export default function FollowersTopHeader({ headerText }) {
  const { userId } = useParams();
  const navigation = useNavigate();

  // 이전 페이지로 이동시키는 함수
  function onClickBack(url) {
    navigation(url);
  }

  return (
    <TopHeaderWrapper>
      <TopHeaderMainTitle className="a11y-hidden">
        {headerText}
      </TopHeaderMainTitle>
      <TopHeaderLeft>
        <TopHeaderBackBtn onClick={() => onClickBack(`/profile/${userId}`)}>
          <TopHeaderBackIcon src={backIcon} alt="뒤로가기" />
        </TopHeaderBackBtn>
        <TopHeaderTitle>Followers</TopHeaderTitle>
      </TopHeaderLeft>
    </TopHeaderWrapper>
  );
}
