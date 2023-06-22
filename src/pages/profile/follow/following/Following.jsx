import React from "react";
import FollowersTopHeader from "../../../../components/commons/topHeader/FollowersTopHeader";
import { FollowingWrapper } from "./following.style";
import FollowingList from "./FollowingList";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../../../context/UserContext";
import { useParams } from "react-router-dom";
import { FollowingListUl } from "./followingList.style";
import followingAPI from "./followingAPI";
import { customAxios } from "../../../../library/customAxios";

export default function Following() {
  // 자기의 프로필 데이터를 가져옵니다.
  const [myFollowingList, setMyFollowingList] = useState([]);
  const [followingData, setFollowingData] = useState([]);
  const { account } = useContext(UserContext);
  const { userId } = useParams();
  useEffect(() => {
    async function fetchUserData() {
      const response = await customAxios.get(`profile/${account}/following`);
      console.log("response.data", response.data);
      setMyFollowingList(response.data);
    }
    fetchUserData();
  }, []);

  useEffect(() => {
    async function test() {
      const response = await customAxios.get(`user/myinfo`);
      console.log("myInfo", response.data);
    }
    test();
  }, []);

  // 팔로워 데이터 호출
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const data = await followerAPI(userId);   // 이렇게 사용해야함. userId 값을 어떻게 받아오지 ??
        const data = await followingAPI(userId);
        // 필요에 따라 가져온 데이터 사용
        console.log("accountname", { userId });
        setFollowingData(data);
        console.log("followingData", followingData);
      } catch (error) {
        console.error(
          "팔로워 데이터를 가져오는 중 오류가 발생했습니다:",
          error,
        );
      }
    };
    fetchData();
  }, [userId]);

  return (
    <>
      <FollowersTopHeader />
      <FollowingWrapper>
        <FollowingListUl>
          {followerData.map((following) => {
            return (
              <FollowingList
                account={account}
                myFollowingList={myFollowingList}
                following={following}
                key={following._id}
              />
            );
          })}
        </FollowingListUl>
      </FollowingWrapper>
    </>
  );
}
