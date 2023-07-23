import React, { useEffect, useState } from "react";
import { FollowersWrapper } from "./followers.style";
import FollowerList from "./FollowerList";
import { useParams } from "react-router-dom";
import { FollowerListUl } from "./followerList.style";
import { followerAPI } from "../../../../API/profileAPI";
import MenuBar from "../../../../components/commons/menuBar/MenuBar";
import NewTopHeader from "../../../../components/commons/newTopHeader/NewTopHeader";
import TopButton from "../../../../components/commons/topButton/TopButton";
import useAuth from "../../../../hook/useAuth";
import Loading from "../../../../components/commons/loading/Loading";
import { useInView } from "react-intersection-observer"; // 추가

export default function Followers() {
  const [followerData, setFollowerData] = useState([]);
  const { userId } = useParams();
  const myProfile = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [ref, inView] = useInView(); // 추가
  const limit = 5; // 추가
  const [skip, setSkip] = useState(0); // 추가
  const [hasMore, setHasMore] = useState(true); // 추가

  // 팔로워 데이터 호출
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await followerAPI(userId, limit, skip); // 수정
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
      }
    };
    if (myProfile) fetchData();
  }, [userId, myProfile, skip]);

  useEffect(() => {
    if (inView && !isLoading && hasMore) {
      setSkip((prevSkip) => prevSkip + limit);
    }
  }, [inView, isLoading, hasMore]);

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
          <FollowerListUl>
            {followerData.map((follower) => {
              return (
                <FollowerList
                  account={myProfile.accountname}
                  follower={follower}
                  key={follower._id}
                />
              );
            })}
          </FollowerListUl>
          {hasMore && <div ref={ref} />} {/* 추가 */}
        </FollowersWrapper>
      )}

      <TopButton />
      <MenuBar />
    </>
  );
}
