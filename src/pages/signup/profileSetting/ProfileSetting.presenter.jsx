import React from "react";
import UserInput from "../../../components/commons/dataInput/UserInput";
import DataInput from "../../../components/commons/dataInput/DataInput";
import ErrorMessage from "../../../components/commons/errorMessage/ErrorMessage";
import uploadfile from "../../../img/upload-file.svg";
import {
  ProfileContainer,
  ProfileForm,
  Title,
  Subtitle,
  ProfileButton,
  ImgLabel,
  ImgInput,
  Img,
} from "./profileSetting.style";

const ProfileSettingUI = ({
  profileImage,
  userName,
  userNameErrorMsg,
  nickName,
  nickNameErrorMsg,
  intro,
  handleImageChange,
  handleNickNameChange,
  handleNickNameBlur,
  handleUserNameChange,
  handleIntroChange,
  isFormValid,
  handleSubmit,
  onClickNextPage,
}) => {
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
          aria-label = "프로필 사진 업로드"
        ></ImgInput>

        <UserInput inputId="registernickname" label="사용자 이름">
          <DataInput
            type="text"
            id="registernickname"
            placeholder="2~10자 이내여야 합니다."
            value={userName}
            onChange={handleUserNameChange}
            aria-label = "사용자 이름 입력칸"
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
            aria-label = "계정 아이디 입력칸"
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
            aria-label = "소개 입력칸"
          ></DataInput>
        </UserInput>

        <ProfileButton
          className="large"
          disabled={
            !isFormValid() || nickNameErrorMsg === "이미 가입된 계정ID 입니다."
          }
          onClick={handleSubmit}
          aria-label = "수수마켓 시작하기 버튼"
        >
          수수마켓 시작하기
        </ProfileButton>
      </ProfileForm>
    </ProfileContainer>
  );
};

export default ProfileSettingUI;
