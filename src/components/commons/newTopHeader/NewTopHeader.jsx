import React from "react";
import { useNavigate } from "react-router-dom";
import {
  TopHeaderBackBtn,
  TopHeaderEl,
  TopHeaderMoreBtn,
  TopHeaderSearchBtn,
  TopHeaderSearchInput,
  TopHeaderSearchLabel,
  TopHeaderText,
  TopHeaderTitle,
  TopHeaderWrapper,
} from "./newTopHeader.style";
import Button from "../button/Button";

// left는 오른쪽에 위치할 요소들을 나타냅니다.
// middled 중간에 넣을 요소들을 나타냅니다.
// right는 오른쪽에 넣을 요소들을 나타냅니다.
// disabled는 버튼의 disabled를 나타냅니다.
// onClickButton는 버튼을 눌럿을때 발생한느 이벤트 입니다.
// title은 헤더에 들어갈 h1 태그 내용 입니다.
// text는 헤더에 들어갈 글자 입니다.
// leftside는 왼쪽에만 요소들이 있는 경우를 의미합니다.
// url은 backbtn를 눌렀을 경우 이동할 페이지를 의미합니다. 비워 두면 기본적으로 뒤로가기가 적용됩니다.
export default function NewTopHeader({
  left,
  middle,
  right,
  disabled,
  onClickButton,
  text,
  title,
  leftSide,
  searchInputValue,
  onChangeKeyword,
  searchInputId,
  url
}) {
  const navigate = useNavigate();
  const setLeft = () => {
    switch (left) {
      case "back":
        return <TopHeaderBackBtn type="button" onClick={() => navigate(url||-1)} />;
      case "text":
        return <TopHeaderText>{text}</TopHeaderText>;
      default:
        return null;
    }
  };

  const setmiddle = () => {
    switch (middle) {
      case "text":
        return <TopHeaderText>{text}</TopHeaderText>;
      default:
        return null;
    }
  };

  const setRight = () => {
    switch (right) {
      case "search":
        return (
          <TopHeaderSearchBtn
            type="button"
            onClick={() => navigate("/search")}
          />
        );
      case "searchInput":
        return (
          <>
            <TopHeaderSearchLabel
              className="a11y-hidden"
              htmlFor={searchInputId}
            >
              계정 검색
            </TopHeaderSearchLabel>
            <TopHeaderSearchInput
              value={searchInputValue}
              onChange={onChangeKeyword}
              id={searchInputId}
              placeholder="계정 검색"
            />
          </>
        );
      case "more":
        return <TopHeaderMoreBtn type="button" onClick={onClickButton} />;
      case "upload":
        return (
          <Button
            type="button"
            className="ms"
            disabled={disabled}
            onClick={onClickButton}
          >
            업로드
          </Button>
        );
      case "save":
        return (
          <Button
            type="button"
            className="ms"
            disabled={disabled}
            onClick={onClickButton}
          >
            저장
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <TopHeaderWrapper>
      <TopHeaderTitle className="a11y-hidden">{title}</TopHeaderTitle>
      <TopHeaderEl className={leftSide ? "left-side" : ""}>
        {setLeft()}
        {setmiddle()}
        {setRight()}
      </TopHeaderEl>
    </TopHeaderWrapper>
  );
}
