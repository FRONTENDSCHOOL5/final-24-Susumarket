import React from "react";
import { FollowingWrapper } from "./following.style";
import FollowersTopHeader from "../../../../components/commons/topHeader/FollowersTopHeader";
import FollowingList from "./FollowingList";

export default function Following() {
  return (
    <>
      <FollowersTopHeader />
      <FollowingWrapper>
        <FollowingList />
      </FollowingWrapper>
    </>
  );
}
