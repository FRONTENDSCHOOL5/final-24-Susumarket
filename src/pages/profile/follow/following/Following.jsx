import React, { useCallback, useEffect, useState } from "react";
import { FollowingWrapper } from "./following.style";
import FollowingList from "./FollowingList";
import { useParams } from "react-router-dom";
import { FollowingListUl, FollowingTitle } from "./followingList.style";
import { followingPageAPI } from "../../../../API/profileAPI";
import MenuBar from "../../../../components/commons/menuBar/MenuBar";
import NewTopHeader from "../../../../components/commons/newTopHeader/NewTopHeader";
import TopButton from "../../../../components/commons/topButton/TopButton";
import Loading from "../../../../components/commons/loading/Loading";
import { useInView } from "react-intersection-observer";

export default function Following() {
  const [followingData, setFollowingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useParams();
  const [ref, inView] = useInView();
  const limit = 5;
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchFollowingData = useCallback(async () => {
    try {
      const data = await followingPageAPI(userId);
      setIsLoading(false);
      setFollowingData((prevData) => [...prevData, ...data]); // 기존 데이터와 합침
      setHasMore(data.length === limit);
      setSkip((prev) => prev + limit);
    } catch (error) {
      console.error("팔로워 데이터를 가져오는 중 오류가 발생했습니다:", error);
    }
  }, [skip]);

  useEffect(() => {
    if (skip === 0) {
      fetchFollowingData();
    }
    if (hasMore && inView) {
      fetchFollowingData();
    }
  }, [inView]);

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
          <FollowingTitle className="a11y-hidden">팔로잉리스트</FollowingTitle>
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
            <div ref={ref}></div>
          </FollowingListUl>
        </FollowingWrapper>
      )}

      <TopButton />
      <MenuBar />
    </>
  );
}
