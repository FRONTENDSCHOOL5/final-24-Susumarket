import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../../components/commons/button/Button";
import UserInput from "../../../components/commons/dataInput/UserInput";
import DataInput from "../../../components/commons/dataInput/DataInput";
import defaultimg from "../../../img/ProfileImg.svg";
import uploadfile from "../../../img/upload-file.svg";
import { customAxios } from "../../../library/customAxios";
import { useLocation } from "react-router-dom";

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

const ImgLabel = styled.label`
  text-align: center;
  margin-top: 20px;
  margin-bottom: 50px;
`;
const ImgInput = styled.input`
  display: none;
`;

const Img = styled.img`
  &.defaultlion {
    position: absolute;
    margin-left: -30px;
    width: 110px;
    height: 110px;
    border-radius: 50%;
    object-fit: cover;
  }
  &.uploadbtn {
    position: relative;
    top: 70px;
    left: 50px;
  }
`;
const ErrorMessage = styled.p`
  color: var(--color-primary);
  margin-top: 10px;
`;

export default function ProfileSetting() {
  const [profileImage, setProfileImage] = useState(defaultimg);
  const [selectedImage, setSelectedImage] = useState(null);

  const [userName, setUserName] = useState("");
  const [userNameErrorMsg, setUserNameErrorMsg] = useState("");

  const [nickName, setNickName] = useState("");
  const [nickNameErrorMsg, setNickNameErrorMsg] = useState("");

  const [intro, setIntro] = useState("");

  const location = useLocation();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setProfileImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
      setSelectedImage(file);
      uploadProfileImage(file);
    } else {
      setProfileImage(defaultimg);
      setSelectedImage(null);
    }
  };
  const uploadProfileImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await customAxios.post("image/uploadfile", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      console.log(response);
      setSelectedImage(response.data.filename);
    } catch (error) {
      console.error(error);
      return null;
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

  const handleNickNameBlur = async () => {
    try {
      const response = await customAxios.post(`user/accountnamevalid`, {
        user: {
          accountname: nickName,
        },
      });
      const data = response.data;
      if (data.message === "이미 가입된 계정ID 입니다.") {
        setNickNameErrorMsg(data.message);
        return;
      }
      console.log(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserNameChange = (e) => {
    const newUserName = e.target.value;
    setUserName(newUserName);

    if (newUserName.length < 2 || newUserName.length > 10) {
      setUserNameErrorMsg("사용자 이름은 2~10자 이내여야 합니다.");
    } else {
      setUserNameErrorMsg("");
    }
  };

  const handleIntroChange = (e) => {
    const value = e.target.value;
    setIntro(value);
  };

  const isFormValid = () => {
    return (
      validateNickName(nickName) &&
      userName.length >= 2 &&
      userName.length <= 10
    );
  };

  const handleSubmit = async (e) => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    e.preventDefault();
    const user = {
      user: {
        username: userName,
        email: location.state.email,
        password: location.state.password,
        accountname: nickName,
        intro: intro,
        image: `${baseUrl}/${selectedImage}`, // 예시) https://api.mandarin.weniv.co.kr/1641906557953.png
      },
    };

    try {
      const response = await customAxios.post(`user`, user);
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProfileContainer>
      <ProfileForm>
        <Title>프로필 설정</Title>
        <Subtitle>나중에 언제든지 변경할 수 있습니다.</Subtitle>
        <ImgLabel htmlFor="file-input">
          <Img className="defaultlion" src={profileImage} alt="기본 이미지" />
          <Img className="uploadbtn" src={uploadfile} alt="업로드 버튼" />
        </ImgLabel>
        <ImgInput
          type="file"
          id="file-input"
          accept="image/*"
          onChange={handleImageChange}
        ></ImgInput>

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
            onBlur={handleNickNameBlur}
          ></DataInput>
          {nickNameErrorMsg && <ErrorMessage>{nickNameErrorMsg}</ErrorMessage>}
        </UserInput>

        <UserInput inputId="registerintro" label="소개">
          <DataInput
            type="text"
            id="registerintro"
            placeholder="자신과 판매할 상품에 대해 소개해 주세요!"
            value={intro}
            onChange={handleIntroChange}
          ></DataInput>
        </UserInput>

        <ProfileButton
          className="large"
          disabled={!isFormValid()}
          onClick={handleSubmit}
        >
          수수마켓 시작하기
        </ProfileButton>
      </ProfileForm>
    </ProfileContainer>
  );
}
