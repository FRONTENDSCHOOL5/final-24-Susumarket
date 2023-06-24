import React from "react";
import NewTopHeader from "../../../../components/commons/newTopHeader/NewTopHeader";
import PostModal from "../../../../components/commons/postModal/PostModal";
import { useState, useEffect } from "react";
import { customAxios } from "../../../../library/customAxios";
import styled from "styled-components";
import morebutton from "../../../../img/icon-more-vertical.svg";

const UserWrapper = styled.section`
  margin: 0 auto;
  display: flex;
  align-items: center;
  // text-align: center;
  margin-top: 20px;
  width: 300px;
`;
const UserProfile = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;
const UserInfo = styled.div`
  margin-left: 10px;
`;
const UserName = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
`;
const AccountName = styled.p`
  font-size: 13px;
  font-weight: 400;
  color: #767676;
`;
const UserButton = styled.button`
  background: url(${morebutton}) no-repeat center/16px 16px;
  width: 16px;
  height: 16px;
  margin-left: 160px;
`;

export default function PostDetail() {
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState("");
  const [accountname, setAccountname] = useState("");

  const myusername = localStorage.getItem("account");

  // 유저 정보 불러오기
  const fetchProfile = async () => {
    try {
      const userprofile = await customAxios.get(`profile/${myusername}`);
      setUsername(userprofile.data.profile.username);
      setAccountname(userprofile.data.profile.accountname);
      setProfileImage(userprofile.data.profile.image);
    } catch (error) {
      console.error(error);
    }
  };
  fetchProfile();

    // 지속적인 실행 막기 위해 useEffect 사용
    useEffect(() => {
      fetchProfile();
      fetchPostDetail();
    }, []);
  
    // api에서 업로드 된 post 내용과 이미지 불러오기
    const fetchPostDetail = async () => {
      try {
        const response = await customAxios.get(`post/${postId}`);
        setPostContent(response.data.post.content);
        setPostImage(response.data.post.image);
        setImgArray(response.data.post.image.split(","));
        console.log("이미지 : ", response.data.post.image.split(","));
      } catch (error) {
        console.error(error);
      }
    };
  return (
    <>
      <NewTopHeader left="back" right="more"></NewTopHeader>
      <UserWrapper>
        <UserProfile src={profileImage} alt="프로필 사진"></UserProfile>
        <UserInfo>
          <UserName>{username}</UserName>
          <AccountName>@ {accountname}</AccountName>
        </UserInfo>
        <UserButton></UserButton>
        <PostWrapper>
        <PostContent>{postcontent}</PostContent>
        {imgArray.length > 0 ? (
          <ProfilePostImgWrapper>
            <ProfilePostImgUl ref={ImgUlRef}>
              {imgArray.map((image, idx) => {
                return (
                  <ProfilePostImgLi key={image + idx}>
                    <ProfilePostImg src={image} alt="포스트 이미지" />
                  </ProfilePostImgLi>
                );
              })}
            </ProfilePostImgUl>

            <ProfilePostImgBtnUl>
              {imgArray.map((image, idx) => {
                return (
                  <ProfilePostImgBtnLi key={image + idx}>
                    {imgArray.length > 1 && (
                      <ProfilePostImgBtn
                        className={activeButton === idx ? "active" : ""}
                        onClick={(e) => onClickSliderBtn(e, idx)}
                      >
                        <ProfilePostButtonSpan className="a11y-hidden">
                          이미지 슬라이드 버튼
                        </ProfilePostButtonSpan>
                      </ProfilePostImgBtn>
                    )}
                  </ProfilePostImgBtnLi>
                );
              })}
            </ProfilePostImgBtnUl>
          </ProfilePostImgWrapper>
        ) : null}
      </PostWrapper>
      </UserWrapper>
    </>
  );
}