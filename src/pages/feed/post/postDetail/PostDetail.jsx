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
      </UserWrapper>
    </>
  );
}