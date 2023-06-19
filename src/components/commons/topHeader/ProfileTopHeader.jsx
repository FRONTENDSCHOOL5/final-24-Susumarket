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

   // 이전 페이지로 이동시키는 함수
  function onClickBack(url) {
    navigation(url)
  }
  
 // postModal창을 여는 함수
  function onClickMore() {
    // postModal창 
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
