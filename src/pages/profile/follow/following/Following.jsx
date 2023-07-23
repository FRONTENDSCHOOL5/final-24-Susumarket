import React, { useEffect, useState } from "react";
import { FollowingWrapper } from "./following.style";
import FollowingList from "./FollowingList";
import { useParams } from "react-router-dom";
import { FollowingListUl } from "./followingList.style";
import { followingAPI } from "../../../../API/profileAPI";
import MenuBar from "../../../../components/commons/menuBar/MenuBar";
import NewTopHeader from "../../../../components/commons/newTopHeader/NewTopHeader";
import TopButton from "../../../../components/commons/topButton/TopButton";
import Loading from "../../../../components/commons/loading/Loading";

export default function Following() {
  const [followingData, setFollowingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useParams();
  const limit = 5;
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // 팔로잉 데이터 호출
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await followingAPI(userId, limit, skip);
        if (skip === 0) {
          setFollowingData(data);
        } else {
          setFollowingData((prevData) => [...prevData, ...data]);
        }
        setHasMore(data.length === limit);
        setIsLoading(false);
      } catch (error) {
        console.error(
          "팔로워 데이터를 가져오는 중 오류가 발생했습니다:",
          error,
        );
        setIsLoading(false);
      }
    };
    fetchData();
  }, [userId, skip]);

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (!isLoading && hasMore) {
        setSkip((prevSkip) => prevSkip + limit);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

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
