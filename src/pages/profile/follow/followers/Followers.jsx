import React from "react";
import { FollowersWrapper } from "./followers.style";
import FollowerList from "./FollowerList";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FollowerListUl } from "./followerList.style";
// import followerAPI from "./followerAPI";
import { followerAPI } from "../../../../API/profileAPI";
import MenuBar from "../../../../components/commons/menuBar/MenuBar";
import NewTopHeader from "../../../../components/commons/newTopHeader/NewTopHeader";
import TopButton from "../../../../components/commons/topButton/TopButton";
import useAuth from "../../../../hook/useAuth";
import Loading from "../../../../components/commons/loading/Loading";

export default function Followers() {
  const [followerData, setFollowerData] = useState([]);
  const { userId } = useParams();
  const myProfile = useAuth();

  const [isLoading, setIsLoading] = useState(true);

  // 팔로워 데이터 호출
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await followerAPI(userId);
        setFollowerData(data);
        setIsLoading(false);
      } catch (error) {
        console.error(
          "팔로워 데이터를 가져오는 중 오류가 발생했습니다:",
          error,
        );
      }
    };
    if (myProfile) fetchData();
  }, [userId, myProfile]);

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
        </FollowersWrapper>
      )}

      <TopButton />
      <MenuBar />
    </>
  );
}
