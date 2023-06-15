import React from "react";
import backIcon from "../../../img/icon-arrow-left.svg";
import Button from "../button/Button";
import { useNavigate, useParams } from "react-router-dom";

import { TopHeaderWrapper, TopHeaderBackBtn, TopHeaderBackIcon } from "./TopHeaderStyle.js";

export default function ProfileTopEdit() {
  const { userId } = useParams();
  const navigation = useNavigate();

  function onClickBack(url) {
    navigation(url);
  }
  return (
    <TopHeaderWrapper>
      <TopHeaderBackBtn onClick={() => onClickBack(`profile/${userId}`)}>
        <TopHeaderBackIcon src={backIcon} alt="뒤로가기" />
      </TopHeaderBackBtn>
      <Button className="ms" disabled>
        저장
      </Button>
    </TopHeaderWrapper>
  );
}
