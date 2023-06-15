import React from 'react'
import { useNavigate } from 'react-router-dom';
import backIcon from "../../../img/icon-arrow-left.svg";
import moreIcon from "../../../img/icon- more-vertical.svg";
import {
  TopHeaderWrapper,
  TopHeaderBackBtn,
  TopHeaderBackIcon,
  TopHeaderMoreBtn,
  TopHeaderMoreIconImg,
} from "./TopHeaderStyle.js";

export default function ProfileTopHeader() {

  const navigation = useNavigate();

  function onClickBack(url) {
    navigation(url)
  }

  function onClickMore() {
    //
  }
  return (
    <TopHeaderWrapper>
      <TopHeaderBackBtn onClick={()=>onClickBack("/post")}>
        <TopHeaderBackIcon src={backIcon} alt="뒤로가기" />
      </TopHeaderBackBtn>
      <TopHeaderMoreBtn>
        <TopHeaderMoreIconImg src={moreIcon} alt="더보기" onClick={onClickMore}/>
      </TopHeaderMoreBtn>
    </TopHeaderWrapper>
  );
}
