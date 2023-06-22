import React from "react";
import FollowersTopHeader from "../../../../components/commons/topHeader/FollowersTopHeader";
import { FollowersWrapper } from "./followers.style";
import FollowerList from "./FollowerList";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../../../context/UserContext";
import { useParams } from "react-router-dom";
import { FollowerListUl } from "./followerList.style";
import followerAPI from "./followerAPI";
import { customAxios } from "../../../../library/customAxios";

export default function Followers() {
  // 자기의 프로필 데이터를 가져옵니다.
  const [myFollowerList, setMyFollowerList] = useState([]);
  const [followerData, setFollowerData] = useState([]);
  const { account } = useContext(UserContext);
  const { userId } = useParams();
  useEffect(() => {
    async function fetchUserData() {
      const response = await customAxios.get(`profile/${account}/following`);
      console.log("response.data", response.data);
      setMyFollowerList(response.data);
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
        const data = await followerAPI(userId);
        // 필요에 따라 가져온 데이터 사용
        console.log("accountname", { userId });
        setFollowerData(data);
        console.log("followerData", followerData);
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
      <FollowersWrapper>
        <FollowerListUl>
          {followerData.map((follower) => {
            return (
              <FollowerList
                account={account}
                myFollowerList={myFollowerList}
                follower={follower}
                key={follower._id}
              />
            );
          })}
        </FollowerListUl>
      </FollowersWrapper>
    </>
  );
}
