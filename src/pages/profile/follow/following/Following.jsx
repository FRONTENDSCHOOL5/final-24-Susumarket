import React from "react";
import { FollowingWrapper } from "./following.style";
import FollowingList from "./FollowingList";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FollowingListUl } from "./followingList.style";
import followingAPI from "./followingAPI";
import MenuBar from "../../../../components/commons/menuBar/MenuBar";
import NewTopHeader from "../../../../components/commons/newTopHeader/NewTopHeader";
import TopButton from "../../../../components/commons/topButton/TopButton";
import Loading from "../../../../components/commons/loading/Loading";

export default function Following() {
  const [followingData, setFollowingData] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const { userId } = useParams();

  // 팔로잉 데이터 호출
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await followingAPI(userId);
        setFollowingData(data);
        setIsLoading(false);
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
      {isLoading ? (
        <Loading />
      ) : (
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
      )}

      <TopButton />
      <MenuBar />
    </>
  );
}
