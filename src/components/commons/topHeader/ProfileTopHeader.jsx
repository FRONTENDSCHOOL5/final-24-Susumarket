import React from 'react'
import { useNavigate } from 'react-router-dom';
import backIcon from "../../../img/icon-arrow-left.svg";
import moreIcon from "../../../img/icon- more-vertical.svg";
import {
  TopHeaderWrapper,
  BackBtn,
  BackIcon,
  MoreBtn,
  MoreIconImg,
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
      <BackBtn onClick={()=>onClickBack("/post")}>
        <BackIcon src={backIcon} alt="뒤로가기" />
      </BackBtn>
      <MoreBtn>
        <MoreIconImg src={moreIcon} alt="더보기" onClick={onClickMore}/>
      </MoreBtn>
    </TopHeaderWrapper>
  );
}
