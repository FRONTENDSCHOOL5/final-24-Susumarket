import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { customAxios } from "../../../../library/customAxios";
import { AccountContext } from "../../../../context/AccountContext";
import ProfileInfoUI from "./ProfileInfo.presenter";

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

  // 좋은 방법이 아님 추후 수정예정
  useEffect(() => {
    setFollowCount(userData.followerCount);
  }, [userData]);

  const onClickFollow = useCallback(async () => {
    try {
      await customAxios.post(`profile/${userAccountname}/follow`);
      setIsfollow(true);
      setFollowCount((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  }, [isfollow, followCount]);

  const onClickUnfollow = useCallback(async () => {
    try {
      await customAxios.delete(`profile/${userAccountname}/unfollow`);
      setIsfollow(false);
      setFollowCount((prev) => prev - 1);
    } catch (error) {
      console.log(error);
    }
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
