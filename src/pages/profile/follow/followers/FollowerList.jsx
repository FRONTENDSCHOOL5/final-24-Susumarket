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
import followerAPI from "./followerAPI";
import { addFollowAPI } from "./addFollowAPI";
import { deleteFollowAPI } from "./deleteFollowAPI";

export default function FollowerList() {
  const [followerData, setFollowerData] = useState([]);
  const [isFollow, setIsFollow] = useState(true);
  const { accountname } = useParams();

  // 팔로워 데이터 호출
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const data = await followerAPI(accountname);   // 이렇게 사용해야함. accountname 값을 어떻게 받아오지 ??
        const data = await followerAPI("19duckchun");
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

  const handleSubmitFollow = async () => {
    const response = await addFollowAPI("19duckchun");
    setIsFollow(response.profile.isFollow);
    console.log("response", response);
  };

  const handleSubmitUnFollow = async () => {
    const response = await deleteFollowAPI("19duckchun");
    setIsFollow(response.profile.isFollow);
    console.log("response", response);
  };

  const handleFollowBtn = () => {
    if (isFollow) {
      handleSubmitUnFollow();
    } else {
      handleSubmitFollow();
    }
  };

  return (
    <FollowerListUl>
      {followerData.map((follower, index) => (
        <FollowerListLi key={index}>
          {/* <FollowerListLink to={`/profile/${user.accountname}`}> */}
          <FollowerListLink to={`/profile/19duckchun`}>
            <img
              src={follower.image}
              alt="프로필 이미지"
              style={{
                objectFit: "cover",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
              }}
            />
            <UserWrapper>
              <UserName>{follower.username}</UserName>
              <UserIntro>{follower.intro}</UserIntro>
            </UserWrapper>
          </FollowerListLink>
          <FollowButton
            className="small"
            active={!isFollow} // isFollow 상태 값을 반전시켜서 active prop으로 전달
            onClick={handleFollowBtn}
          >
            {isFollow ? "취소" : "팔로우"}{" "}
            {/* isFollow 값에 따라 텍스트 변경 */}
          </FollowButton>
        </FollowerListLi>
      ))}
    </FollowerListUl>
  );
}
