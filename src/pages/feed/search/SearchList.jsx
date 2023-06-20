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
import InfiniteScroll from "react-infinite-scroller";

export default function SearchList({ userList, inputValue }) {
  return (
    <>
      <SearchListUl>
        {userList.map((user) => (
          <SearchListLi key={user.id}>
            <SearchListLink>
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
