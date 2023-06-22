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
  const [followerData, setFollowerData] = useState([]);
  // const [follow, setFollow] = useState(true);
  const { accountname } = useParams();

  // 팔로워 데이터 호출
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const data = await followerAPI(accountname);   // 이렇게 사용해야함. accountname 값을 어떻게 받아오지 ??
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

  // addFollowAPI, deleteFollowAPI 호출함수 구현 필요

  // const handleSubmitFollow = async () => {
  //   const response = await addFollow(accountname);
  //   setFollow(response.profile.isfollow);
  // };

  // const handleSubmitUnFollow = async () => {
  //   const response = await deleteFollow(accountname);
  //   setFollow(response.profile.isfollow);
  // };

  // const handleFollowBtn = () => {
  //   if (follow === true) {
  //     handleSubmitUnFollow();
  //   } else {
  //     handleSubmitFollow();
  //   }
  // };
  const handleFollowBtn = () => {
    console.log("gi");
  };

  return (
    <FollowerListUl>
      {followerData.map((follower, index) => (
        <FollowerListLi key={index}>
          {/* <FollowerListLink to={`/profile/${user.accountname}`}> */}
          <FollowerListLink to={`/profile/ss`}>
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
          </FollowerListLink>
          <FollowButton
            className="small"
            active={true}
            disabled={false}
            onClick={handleFollowBtn}
          >
            팔로우
          </FollowButton>
          {/* <Button className="small">팔로우</Button> */}
        </FollowerListLi>
      ))}
    </FollowerListUl>
  );
}
