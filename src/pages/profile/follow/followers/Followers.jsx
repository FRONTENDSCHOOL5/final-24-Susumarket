import React from "react";
import FollowersTopHeader from "../../../../components/commons/topHeader/FollowersTopHeader";
import { FollowersWrapper } from "./followers.style";
import FollowerList from "./FollowerList";

export default function Followers() {
  return (
    <>
      <FollowersTopHeader />
      <FollowersWrapper>
        <FollowerList />
      </FollowersWrapper>
    </>
  );
}
