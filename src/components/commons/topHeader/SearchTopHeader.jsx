import React from 'react'
import backIcon from "../../../img/icon-arrow-left.svg";
import {
  TopHeaderWrapper,
  BackBtn,
  BackIcon,
  SearchInput,
} from "./TopHeaderStyle.js";
import { useNavigate } from 'react-router-dom';

export default function SearchTopHeader() {
  const navigation = useNavigate();

  function onClickBack(url) {
    navigation(url)
  }

  return (
    <TopHeaderWrapper>
      <BackBtn onClick={()=>onClickBack("/post")}>
        <BackIcon src={backIcon} alt="뒤로가기" />
      </BackBtn>
      <SearchInput type="text" placeholder="계정검색" />
    </TopHeaderWrapper>
  );
}
