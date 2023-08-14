import React, { useEffect, useState } from "react";
import { FollowersWrapper } from "./followers.style";
import FollowerList from "./FollowerList";
import { useParams } from "react-router-dom";
import { FollowerListUl, FollowerTitle } from "./followerList.style";
import { followerPageAPI } from "../../../../API/profileAPI";
import MenuBar from "../../../../components/commons/menuBar/MenuBar";
import NewTopHeader from "../../../../components/commons/newTopHeader/NewTopHeader";
import TopButton from "../../../../components/commons/topButton/TopButton";
import Loading from "../../../../components/commons/loading/Loading";
import { useInView } from "react-intersection-observer";

export default function Followers() {
  const [followerData, setFollowerData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useParams();
  const [ref, inView] = useInView();
  let limit;
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  async function fetchFollowerData() {
    try {
      const data = await followerPageAPI(userId);
      setIsLoading(false);
      setFollowerData((prevData) => [...prevData, ...data]); // 기존 데이터와 합침
      setHasMore(data.length === limit);
      setSkip((prev) => prev + limit);
      console.log(followerData);
    } catch (error) {
      console.error("팔로워 데이터를 가져오는 중 오류가 발생했습니다:", error);
    }
  }

  useEffect(() => {
    if (skip === 0) {
      fetchFollowerData();
    }
    if (hasMore && inView) {
      fetchFollowerData();
    }
  }, [inView]);

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
            <div ref={ref}></div>
          </FollowerListUl>
        </FollowersWrapper>
      )}

      <TopButton />
      <MenuBar />
    </>
  );
}
