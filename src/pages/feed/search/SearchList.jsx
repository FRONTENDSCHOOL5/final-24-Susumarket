import { useState } from "react";
import {
  SearchListUl,
  SearchListLi,
  SearchListLink,
  SearchListImg,
  UserWrapper,
  UserName,
  UserId,
} from "./searchList.style.js";

export default function SearchList({ userList, inputValue }) {
  return (
    <>
      <SearchListUl>
        {userList.map((user, index) => (
          <SearchListLi key={index}>
            {/* 유저 리스트 클릭시 유저 프로필 페이지로 이동 */}
            <SearchListLink to={`/profile/${user.accountname}`}>
              <img
                style={{
                  backgroundImage: `url(${user.image})`,
                  backgroundPosition: "top center",
                  backgroundSize: "cover",
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                }}
              />

              <UserWrapper>
                <UserName>{user.username}</UserName>
                <UserId>{user.accountname}</UserId>
              </UserWrapper>
            </SearchListLink>
          </SearchListLi>
        ))}
      </SearchListUl>
    </>
  );
}
