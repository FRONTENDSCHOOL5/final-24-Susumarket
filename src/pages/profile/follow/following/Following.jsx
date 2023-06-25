import React from "react";
import FollowersTopHeader from "../../../../components/commons/topHeader/FollowersTopHeader";
import { FollowingWrapper } from "./following.style";
import FollowingList from "./FollowingList";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { FollowingListUl } from "./followingList.style";
import followingAPI from "./followingAPI";
import { customAxios } from "../../../../library/customAxios";
import MenuBar from "../../../../components/commons/menuBar/MenuBar";
import NewTopHeader from "../../../../components/commons/newTopHeader/NewTopHeader";
import TopButton from "../../../../components/commons/topButton/TopButton";

export default function Following({ text }) {
  const [followingData, setFollowingData] = useState([]);

  const { userId } = useParams();

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
        const data = await followingAPI(userId);
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
      <NewTopHeader
        title={"FollowingListPage"}
        text={"following"}
        left={"back"}
        leftSide={true}
        middle={"text"}
      />
      <FollowingWrapper>
        <FollowingListUl>
          {followingData.map((following) => {
            return (
              <FollowingList
                account={userId}
                following={following}
                key={following._id}
              />
            );
          })}
        </FollowingListUl>
      </FollowingWrapper>
      <TopButton />
      <MenuBar />
    </>
  );
}
