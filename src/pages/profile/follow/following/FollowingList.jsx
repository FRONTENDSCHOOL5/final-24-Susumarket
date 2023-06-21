import React from "react";
import {
  FollowingListLi,
  FollowingListUl,
  FollowingListLink,
  UserWrapper,
  UserName,
  UserIntro,
  FollowButton,
} from "./followingList.style";

export default function FollowingList() {
  return (
    <FollowingListUl>
      {/* ex1 */}
      <FollowingListLi>
        <img
          url="https://www.google.com/url?sa=i&url=https%3A%2F%2Fappledoong.com%2Fentry%2F%25EB%25AC%25B4%25EB%25A3%258C-%25EC%259D%25B4%25EB%25AF%25B8%25EC%25A7%2580-%25EC%2582%25AC%25EC%259D%25B4%25ED%258A%25B8-%25EC%25A0%2580%25EC%259E%2591%25EA%25B6%258C-%25ED%2594%2584%25EB%25A6%25AC-%25EC%2583%2581%25EC%2597%2585%25EC%2582%25AC%25EC%259A%25A9-%25EA%25B0%2580%25EB%258A%25A5-%25EA%25B3%25A0%25ED%2599%2594%25EC%25A7%2588&psig=AOvVaw00nl3sB5Var8K8RDaqugqb&ust=1687433331440000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCLCbnJqh1P8CFQAAAAAdAAAAABAD"
          alt="프로필 이미지"
          style={{
            objectFit: "cover",
            width: "50px",
            height: "50px",
          }}
        />
        <UserWrapper>
          <UserName>dd</UserName>
          <UserIntro>dd</UserIntro>
        </UserWrapper>
        <FollowButton>팔로우</FollowButton>
      </FollowingListLi>
    </FollowingListUl>
  );
}
