import React, { useState, useCallback } from "react";
import defaultimg from "../../../img/ProfileImg.svg";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { accountValidationAPI } from "../../../API/validationAPI";
import { signupAPI } from "../../../API/signupAPI";
import { imgUploadAPI } from "../../../API/imgUploadAPI";
import ProfileSettingUI from "./ProfileSetting.presenter";

const ProfileSettingContainer = () => {
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
  const handleImageChange = useCallback((e) => {
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
  }, []);

  const uploadProfileImage = useCallback(async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await imgUploadAPI(formData);
      console.log(response);
      setSelectedImage(response);
    } catch (error) {
      console.error(error);
      return null;
    }
  }, []);

  // 계정 id 유효성 검사
  const validateNickName = useCallback((nickName) => {
    const nickNamePattern = /^[a-zA-Z0-9._]+$/;
    return nickNamePattern.test(nickName);
  }, []);

  // 계정 id 에러 메시지 출력, 영문 숫자 밑줄 마침표가 아닌 다른 문자 입력 시 에러 메시지 출력
  const handleNickNameChange = useCallback(
    (e) => {
      const value = e.target.value;
      setNickName(value);

      if (!validateNickName(value)) {
        setNickNameErrorMsg("*영문, 숫자 밑줄 및 마침표만 사용할 수 있습니다.");
      } else {
        setNickNameErrorMsg("");
      }
    },
    [validateNickName],
  );

  // 이미 가입된 계정id의 경우 input에서 focus가 벗어나면 가입된 계정id라는 에러 메시지를 출력하도록 함함
  const handleNickNameBlur = useCallback(async () => {
    try {
      const data = await accountValidationAPI({
        user: {
          accountname: nickName,
        },
      });
      if (data === "이미 가입된 계정ID 입니다.") {
        setNickNameErrorMsg(data);
        return;
      }
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }, [nickName]);

  // 사용자 이름이 2~10자가 아닌 경우 에러 메시지를 출력하도록 함
  const handleUserNameChange = useCallback((e) => {
    const newUserName = e.target.value;
    setUserName(newUserName);

    if (newUserName.length < 2 || newUserName.length > 10) {
      setUserNameErrorMsg("사용자 이름은 2~10자 이내여야 합니다.");
    } else {
      setUserNameErrorMsg("");
    }
  }, []);

  // 소개란에 입력 받은 값을 상태 관리. 입력이 필수 사항은 아님
  const handleIntroChange = useCallback((e) => {
    const value = e.target.value;
    setIntro(value);
  }, []);

  // form이 유효하도록 하는 함수, 계정 id 코드의 경우 return 내 코드에 추가
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
        image: selectedImage ? `${baseUrl}/${selectedImage}` : "",
      },
    };

    try {
      const data = await signupAPI(user);
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
  };

  return (
    <ProfileSettingUI
      profileImage={profileImage}
      userName={userName}
      userNameErrorMsg={userNameErrorMsg}
      nickName={nickName}
      nickNameErrorMsg={nickNameErrorMsg}
      intro={intro}
      handleImageChange={handleImageChange}
      handleNickNameChange={handleNickNameChange}
      handleNickNameBlur={handleNickNameBlur}
      handleUserNameChange={handleUserNameChange}
      handleIntroChange={handleIntroChange}
      isFormValid={isFormValid}
      handleSubmit={handleSubmit}
      onClickNextPage={onClickNextPage}
    />
  );
};

export default ProfileSettingContainer;
