import React, { useEffect, useState } from "react";
import {
  FollowerListUl,
  FollowerListLi,
  FollowerListLink,
  UserWrapper,
  UserName,
  UserIntro,
  FollowButton,
} from "./followerList.style";
import { useParams } from "react-router-dom";
import followerAPI from "./follower";

export default function FollowerList() {
  const { accountname } = useParams();
  const [followerData, setFollowerData] = useState([{}]);
  // console.log(accountname);

  // accountname 값을 어떻게 받아오지 ??
  // 팔로워 데이터 호출
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await followerAPI("ss");
        // 필요에 따라 가져온 데이터 사용
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
  }, [accountname]);

  return (
    <FollowerListUl>
      {followerData.map((follower, index) => (
        <FollowerListLi key={index}>
          <FollowerListLink>
            <img
              src={follower.image}
              alt="프로필 이미지"
              style={{
                objectFit: "cover",
                width: "50px",
                height: "50px",
              }}
            />
            <UserWrapper>
              <UserName>{follower.username}</UserName>
              <UserIntro>{follower.intro}</UserIntro>
            </UserWrapper>
            <FollowButton>팔로우</FollowButton>
          </FollowerListLink>
        </FollowerListLi>
      ))}
    </FollowerListUl>
  );
}
