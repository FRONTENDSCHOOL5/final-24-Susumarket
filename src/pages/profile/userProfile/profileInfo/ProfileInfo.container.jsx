import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AccountContext } from "../../../../context/AccountContext";
import ProfileInfoUI from "./ProfileInfo.presenter";
import { followAPI, unFollowAPI } from "../../../../API/profileAPI";

export default function ProfileInfo({ userData }) {
  const [isfollow, setIsfollow] = useState(userData.isfollow);
  const [followCount, setFollowCount] = useState(userData.followerCount);
  const navigate = useNavigate();
  const { account } = useContext(AccountContext);
  const params = useParams();
  const userAccountname = params.userId;
  function onClickButton(url) {
    navigate(url);
  }

  useEffect(() => {
    setFollowCount(userData.followerCount);
  }, [userData]);

  const onClickFollow = useCallback(async () => {
      await followAPI(userAccountname);
      setIsfollow(true);
      setFollowCount((prev) => prev + 1);
  }, [isfollow, followCount]);

  const onClickUnfollow = useCallback(async () => {
      await unFollowAPI(userAccountname);
      setIsfollow(false);
      setFollowCount((prev) => prev - 1);
  }, [isfollow, followCount]);

  return (
    <ProfileInfoUI
      userData={userData}
      followCount={followCount}
      account={account}
      isfollow={isfollow}
      onClickButton={onClickButton}
      onClickUnfollow={onClickUnfollow}
      onClickFollow={onClickFollow}
    />
  );
}
