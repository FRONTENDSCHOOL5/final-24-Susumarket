import React from "react";
import backIcon from "../../../img/icon-arrow-left.svg";
import Button from "../button/Button";
import { useNavigate, useParams } from "react-router-dom";

import { TopHeaderWrapper, BackBtn, BackIcon } from "./TopHeaderStyle.js";

export default function ProfileTopEdit() {
  const { userId } = useParams();
  const navigation = useNavigate();

  function onClickBack(url) {
    navigation(url);
  }
  return (
    <TopHeaderWrapper>
      <BackBtn onClick={() => onClickBack(`profile/${userId}`)}>
        <BackIcon src={backIcon} alt="뒤로가기" />
      </BackBtn>
      <Button className="ms" disabled>
        저장
      </Button>
    </TopHeaderWrapper>
  );
}
