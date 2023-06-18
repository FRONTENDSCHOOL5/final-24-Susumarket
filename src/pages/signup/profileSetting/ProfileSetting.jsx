import React from 'react'
import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../../components/commons/button/Button";
import UserInput from "../../../components/commons/dataInput/UserInput";
import DataInput from "../../../components/commons/dataInput/DataInput";

const ProfileContainer = styled.main`
  width: 87%;
  max-width: 500px;
  margin: 20px auto;
`;

const ProfileForm = styled.form`
  margin: auto 0;
  margin-top: 54px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-weight: 500;
  font-size: 28px;
  text-align: center;
  margin-bottom: 40px;
`;

const Subtitle = styled.h2`
  text-align: center;
  color: #767676;
  font-weight: 400;
  font-size: 18px;
`;

const ProfileButton = styled(Button)`
  margin-top: 50px;
`;


export default function ProfileSetting() {
  const [userName, setUserName] = useState("");
  const [userNameErrorMsg, setUserNameErrorMsg] = useState("");

  const [nickName, setNickName] = useState("");
  const [nickNameErrorMsg, setNickNameErrorMsg] = useState("");

  const handleUserNameChange = (e) => {
    const newUserName = e.target.value;
    setUserName(newUserName);

    if (newUserName.length < 2 || newUserName.length > 10) {
      setUserNameErrorMsg("사용자 이름은 2~10자 이내여야 합니다.");
    } else {
      setUserNameErrorMsg("");
    }
  };


  const validateNickName = (nickName) => {
    const nickNamePattern = /^[a-zA-Z0-9._]+$/;
    return nickNamePattern.test(nickName);
  };

  const handleNickNameChange = (e) => {
    const value = e.target.value;
    setNickName(value);

    if (!validateNickName(value)) {
      setNickNameErrorMsg("*영문, 숫자 밑줄 및 마침표만 사용할 수 있습니다.");
    } else {
      setNickNameErrorMsg("");
    }
  };

  return (
    <ProfileContainer>
    <ProfileForm>
      <Title>프로필 설정</Title>
      <Subtitle>나중에 언제든지 변경할 수 있습니다.</Subtitle>

      <UserInput inputId="registernickname" label="사용자 이름">
          <DataInput
            type="text"
            id="registernickname"
            placeholder="2~10자 이내여야 합니다."
            value={userName}
            onChange={handleUserNameChange}
          ></DataInput>
          {userNameErrorMsg && <ErrorMessage>{userNameErrorMsg}</ErrorMessage>}
        </UserInput>

        <UserInput inputId="registerid" label="계정 ID">
          <DataInput
            type="text"
            id="registerid"
            placeholder="영문, 숫자, 특수문자(.),(_)만 사용 가능합니다."
            value={nickName}
            onChange={handleNickNameChange}
          ></DataInput>
          {nickNameErrorMsg && <ErrorMessage>{nickNameErrorMsg}</ErrorMessage>}
        </UserInput>

        <UserInput inputId="registerintro" label="소개">
          <DataInput
            type="text"
            id="registerintro"
            placeholder="자신과 판매할 상품에 대해 소개해 주세요!"
          ></DataInput>
        </UserInput>

      <ProfileButton className="large">수수마켓 시작하기</ProfileButton>
    </ProfileForm>
  </ProfileContainer>
);
}
