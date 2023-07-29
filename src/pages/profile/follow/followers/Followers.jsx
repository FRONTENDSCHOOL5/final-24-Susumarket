import React, { useEffect, useState } from "react";
import { FollowersWrapper } from "./followers.style";
import FollowerList from "./FollowerList";
import { useParams } from "react-router-dom";
import { FollowerListUl, FollowerTitle } from "./followerList.style";
import { followerAPI } from "../../../../API/profileAPI";
import MenuBar from "../../../../components/commons/menuBar/MenuBar";
import NewTopHeader from "../../../../components/commons/newTopHeader/NewTopHeader";
import TopButton from "../../../../components/commons/topButton/TopButton";
import Loading from "../../../../components/commons/loading/Loading";
import { useCallback } from "react";

export default function Followers() {
  const [followerData, setFollowerData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useParams();
  const limit = 5;
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // 팔로워 데이터 호출
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await followerAPI(userId, limit, skip);
        if (skip === 0) {
          setFollowerData(data);
        } else {
          setFollowerData((prevData) => [...prevData, ...data]);
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
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (!isLoading && hasMore) {
        setSkip((prevSkip) => prevSkip + limit);
      }
    }
  }, [hasMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
      <NewTopHeader
        title={"FollowersListPage"}
        text={"followers"}
        left={"back"}
        leftSide={true}
        middle={"text"}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <FollowersWrapper>
          <FollowerTitle className="a11y-hidden">팔로워리스트</FollowerTitle>
          <FollowerListUl>
            {followerData.map((follower) => {
              return (
                <FollowerList
                  account={userId}
                  follower={follower}
                  key={follower._id}
                />
              );
            })}
          </FollowerListUl>
        </FollowersWrapper>
      )}

      <TopButton />
      <MenuBar />
    </>
  );
}
