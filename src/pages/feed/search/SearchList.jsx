import React from "react";
// import "searchList.style.js";
import {
  SearchListUl,
  SearchListLi,
  SearchListLink,
  SearchListImg,
  UserWrapper,
  UserName,
  UserId,
} from "./searchList.style.js";

export default function SearchList() {
  return (
    <>
      <SearchListUl>
        <SearchListLi>
          <SearchListLink>
            <SearchListImg />
            <UserWrapper>
              <UserName>Sample</UserName>
              <UserId>sample1</UserId>
            </UserWrapper>
          </SearchListLink>
        </SearchListLi>
        <SearchListLi>
          <SearchListLink>
            <SearchListImg />
            <UserWrapper>
              <UserName>SampleLike</UserName>
              <UserId>sampleLike1</UserId>
            </UserWrapper>
          </SearchListLink>
        </SearchListLi>
        <SearchListLi>
          <SearchListLink>
            <SearchListImg />
            <UserWrapper>
              <UserName>Hello</UserName>
              <UserId>Hello3</UserId>
            </UserWrapper>
          </SearchListLink>
        </SearchListLi>
      </SearchListUl>
    </>
  );
}
