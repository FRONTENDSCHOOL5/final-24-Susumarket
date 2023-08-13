import styled from "styled-components";
import backIcon from "../../../img/icon-arrow-left.svg";
import searchIcon from "../../../img/icon-search.svg";
import moreIcon from "../../../img/icon-more-vertical.svg";
import backIconWebp from "../../../img/webp/icon-arrow-left.webp";
import searchIconWebp from "../../../img/webp/icon-search.webp";
import moreIconWebp from "../../../img/webp/icon-more-vertical.webp";

export const TopHeaderWrapper = styled.header`
  position: sticky;
  left: 0;
  top: 0;
  background-color: #fff;
  width: 100%;
  padding: 8px 16px;
  font-size: 18px;
  border-bottom: 1px solid #dbdbdb;
  height: 48px;
  z-index: 999;
`;

export const TopHeaderEl = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  &.left-side {
    justify-content: left;
  }
`;
export const TopHeaderTitle = styled.h1``;

export const TopHeaderText = styled.p`
  display: inline-block;
  font-weight: 500;
  vertical-align: middle;
  margin-left: 8px;
`;

export const TopHeaderSearchBtn = styled.button`
  body.no-webp & {
    background: url(${searchIcon}) no-repeat center / 24px 24px;
  }
  body.webp & {
    background: url(${searchIconWebp}) no-repeat center / 24px 24px;
  }
  width: 24px;
  height: 24px;
`;

export const TopHeaderBackBtn = styled.button`
  body.no-webp & {
    background: url(${backIcon}) no-repeat center / 24px 24px;
  }
  body.webp & {
    background: url(${backIconWebp}) no-repeat center / 24px 24px;
  }
  width: 24px;
  height: 24px;
`;

export const TopHeaderMoreBtn = styled.button`
  body.no-webp & {
    background: url(${moreIcon}) no-repeat center / 24px 24px;
  }
  body.webp & {
    background: url(${moreIconWebp}) no-repeat center / 24px 24px;
  }
  width: 24px;
  height: 24px;
`;

export const TopHeaderSearchInput = styled.input`
  width: 100%;
  height: 32px;
  padding: 7px 16px;
  font-size: 14px;
  font-weight: 400;
  border-radius: 32px;
  border: none;
  margin-left: 24px;
  background-color: #f2f2f2;
  ::placeholder {
    color: #c4c4c4;
  }
`;

export const TopHeaderSearchLabel = styled.label``;
