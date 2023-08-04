import {
  SearchListUl,
  SearchListLi,
  SearchListLink,
  UserWrapper,
  UserId,
  UserAccount,
  SearchListTitle,
} from "./searchList.style.js";
import DefaultImg from "../../../img/basic-profile.svg";
import UserInfo from "../../../components/commons/userInfo/UserInfo.jsx";
import { useCallback } from "react";

const defaultImage = DefaultImg;

export default function SearchList({ userList, inputValue }) {
  // 검색어와 같은 단어에 하이라이트 시키는 함수
  // text는 원본 텍스트, query는 강조할 대상을 나타내는 문자열
  const highlightText = useCallback(
    (text, query) => {
      const regex = new RegExp(`(${query})`, "g");
      // 첫 번째 일치하는 부분을 찾기위한 변수
      let isFirstMatch = true;
      return text.split(regex).map((part, index) => {
        if (part === query && isFirstMatch) {
          isFirstMatch = false;
          return (
            <span key={index} style={{ color: "#B51215" }}>
              {part}
            </span>
          );
        } else {
          return part;
        }
      });
    },
    [inputValue],
  );

  return (
    <>
      <SearchListTitle className="a11y-hidden">검색리스트</SearchListTitle>
      <SearchListUl>
        {userList.map((user, index) => (
          <SearchListLi key={index}>
            {/* 유저 리스트 클릭시 유저 프로필 페이지로 이동 */}
            <SearchListLink to={`/profile/${user.accountname}`}>
              <UserInfo bottom="intro" userData={user} />
            </SearchListLink>
          </SearchListLi>
        ))}
      </SearchListUl>
    </>
  );
}
