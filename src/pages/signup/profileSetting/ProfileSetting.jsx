import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../../components/commons/button/Button";
import UserInput from "../../../components/commons/dataInput/UserInput";
import DataInput from "../../../components/commons/dataInput/DataInput";
import defaultimg from "../../../img/ProfileImg.svg";
import uploadfile from "../../../img/upload-file.svg";
import { customAxios } from "../../../library/customAxios";
import { useLocation } from "react-router-dom";
import ErrorMessage from "../../../components/commons/errorMessage/ErrorMessage";
import { useNavigate } from "react-router-dom";

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


export default function ProfileSetting() {
  const [profileImage, setProfileImage] = useState(defaultimg);
  const [selectedImage, setSelectedImage] = useState(null);

  const [userName, setUserName] = useState("");
  const [userNameErrorMsg, setUserNameErrorMsg] = useState("");

  const [nickName, setNickName] = useState("");
  const [nickNameErrorMsg, setNickNameErrorMsg] = useState("");

  const [intro, setIntro] = useState("");

  const location = useLocation();

  // 이미지 미리보기
  // 이미지를 변경 시 변경한 이미지 대로 출력
  // 이미지를 변경하지 않으면 default image인 수수마켓 이미지가 출력되도록 함
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

  // api 이미지
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

  // 계정 id 유효성 검사
  const validateNickName = (nickName) => {
    const nickNamePattern = /^[a-zA-Z0-9._]+$/;
    return nickNamePattern.test(nickName);
  };

  // 계정 id 에러 메시지 출력, 영문 숫자 밑줄 마침표가 아닌 다른 문자 입력 시 에러 메시지 출력
  const handleNickNameChange = (e) => {
    const value = e.target.value;
    setNickName(value);

    if (!validateNickName(value)) {
      setNickNameErrorMsg("*영문, 숫자 밑줄 및 마침표만 사용할 수 있습니다.");
    } else {
      setNickNameErrorMsg("");
    }
  };

  // 이미 가입된 계정id의 경우 input에서 focus가 벗어나면 가입된 계정id라는 에러 메시지를 출력하도록 함함
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

  // 사용자 이름이 2~10자가 아닌 경우 에러 메시지를 출력하도록 함
  const handleUserNameChange = (e) => {
    const newUserName = e.target.value;
    setUserName(newUserName);

    if (newUserName.length < 2 || newUserName.length > 10) {
      setUserNameErrorMsg("사용자 이름은 2~10자 이내여야 합니다.");
    } else {
      setUserNameErrorMsg("");
    }
  };

  // 소개란에 입력 받은 값을 상태 관리. 입력이 필수 사항은 아님
  const handleIntroChange = (e) => {
    const value = e.target.value;
    setIntro(value);
  };

  // form이 유효하도록 하는 함수, 계정 id 코드의 경우 return 내 코드에 추가가
  const isFormValid = () => {
    return (
      validateNickName(nickName) &&
      userName.length >= 2 &&
      userName.length <= 10
    );
  };

  // 앞선 email, password를 받아오고 profileSetting에서 받은 값을 api로 보냄
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
      onClickNextPage();
    } catch (error) {
      console.log(error);
    }
  };

  // 수수마켓 시작하기 버튼 클릭 시 로그인 페이지로 이동
  const navigate = useNavigate();
  const onClickNextPage = () => {
    navigate("/login/loginEmail");
  }

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
          disabled={!isFormValid() || nickNameErrorMsg === "이미 가입된 계정ID 입니다."}
          onClick={handleSubmit}
        >
          수수마켓 시작하기
        </ProfileButton>
      </ProfileForm>
    </ProfileContainer>
  );
}
