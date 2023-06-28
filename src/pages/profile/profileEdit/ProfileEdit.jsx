import React, { useEffect, useState } from "react";
import {
  ProfileEditForm,
  ProfileEditImg,
  ProfileEditImgRestBtn,
  ProfileEditLabel,
  ProfileEditUploadInput,
  ProfileEditWrapper,
} from "./profileEdit.style";
import profileImg from "../../../img/ProfileImg.svg";
import defaultProfileImg from "../../../img/ProfileImg.svg";
import NewTopHeader from "../../../components/commons/newTopHeader/NewTopHeader";
import DataInput from "../../../components/commons/dataInput/DataInput";
import UserInput from "../../../components/commons/dataInput/UserInput";
import ErrorMessage from "../../../components/commons/errorMessage/ErrorMessage";
import { customAxios } from "../../../library/customAxios";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../../hook/useAuth";
import { imgValidation } from "../../../library/imgValidation";
export default function ProfileEdit() {
  const [imgPreviewURL, setImgPreviewURL] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);

  const [username, setUsername] = useState("");
  const [usernameValidation, setUsernameValidation] = useState({
    errorMessage: "",
    isValid: true,
  });
  const [accountname, setAccountname] = useState("");
  const [accountnameValidation, setAccountnameValidation] = useState({
    errorMessage: "",
    isValid: true,
  });
  const [intro, setIntro] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const userAccountname = params.userId;
  const usernameReg = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/;
  const accountnameReg = /^[a-zA-Z0-9._]+$/;
  const userData = useAuth();

  function onChangeImg(e) {
    e.preventDefault();
    const file = e.target.files[0];
    const valid = imgValidation(file);
    if (!valid) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImgPreviewURL(reader.result);
    };
    reader.readAsDataURL(file);
    setUploadFile(file);
  }

  // 인자로 event 객체, 유효성 검사 정규표현식, valid 상태관리 함수, 경고 메세지 텍스트를 받음
  // 인자로 받은 정규표현식 유효성 검사를 통해 유효하다면 에러 메세지를 없애고, isVali값을 true로
  // 유효하지 않다면 인자로 받은 에러 메세지를 넣고, isVali값을 false로
  function vaildation(e, reg, setValid, text) {
    if (reg.test(e.target.value)) {
      setValid({ errorMessage: "", isValid: true });
    } else {
      setValid({ errorMessage: text, isValid: false });
    }
  }

  function onChangeUserame(e) {
    const value = e.target.value.trim();
    setUsername(value);
    vaildation(
      e,
      usernameReg,
      setUsernameValidation,
      "2~10자 이내 이름을 입력하세요.",
    );
  }

  function onChangeAccountname(e) {
    const value = e.target.value.trim();
    setAccountname(value);
    // onchange이벤트가 발생했을 경우 유효성 검사 실행
    // 값이 있을 경우
    if (!value.length) {
      setAccountnameValidation({
        errorMessage: "계정 ID를 입력하세요",
        isValid: false,
      });
    } else {
      // 값이 있을 경우 정규표현식을 이용해 유효성 검사
      vaildation(
        e,
        accountnameReg,
        setAccountnameValidation,
        "영문, 숫자, 특수문자( . )( _ )만 사용가능합니다.",
      );
    }
  }

  // bulr 이벤트가 발생했을때 계정 중복 검사
  async function onBlurAccountname() {
    const user = {
      user: {
        accountname,
      },
    };
    try {
      if (!accountname) return;
      const response = await customAxios.post("user/accountnamevalid", user);
      if (response.data.message !== "사용 가능한 계정ID 입니다.") {
        // 계정 ID와 일치하는 경우는 예외 처리 => 본인 계정 ID는 중복 가능하도록 함, 계정 ID 이외 다른 정보만 변경할 경우도 있기 때문
        if (accountname !== userAccountname)
          setAccountnameValidation({
            errorMessage: response.data.message,
            isValid: false,
          });
      } else {
        setAccountnameValidation({ errorMessage: "", isValid: true });
      }
    } catch (error) {
      console.log(error);
    }
  }

  function onChangeIntro(e) {
    const value = e.target.value;
    if (value.trim() === "") {
      setIntro(value.trim());
    } else {
      setIntro(value);
    }
  }

  async function onSubmitSave(e) {
    e.preventDefault();
    // 수정사항 없는지 체크 불필요한 데이터 전송 방지
    if (
      username === userData.username &&
      accountname === userData.accountname &&
      (imgPreviewURL === userData.image ||
        (imgPreviewURL === defaultProfileImg &&
          userData.image.includes("Ellipse"))) &&
      intro === userData.intro
    ) {
      alert("수정사항이 없습니다!");
      return;
    }
    const formData = new FormData();
    formData.append("image", uploadFile);
    try {
      const imgUrlRes = await customAxios.post("image/uploadfile", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      const imgURLResult = imgUrlRes.data;
      await customAxios.put("user", {
        user: {
          username,
          accountname,
          intro,
          image: uploadFile
            ? `${process.env.REACT_APP_BASE_URL}${imgURLResult.filename}`
            : imgPreviewURL === defaultProfileImg
            ? `${process.env.REACT_APP_BASE_URL}Ellipse.png`
            : imgPreviewURL,
        },
      });
      navigate(`/profile`);
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    if (userData) {
      setAccountname(userData.accountname);
      setUsername(userData.username);
      setIntro(userData.intro);
      setImgPreviewURL(userData.image);
    }
  }, [userData]);

  // 모든 값 유효성 체크
  useEffect(() => {
    if (accountnameValidation.isValid && usernameValidation.isValid) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [accountnameValidation, usernameValidation]);

  // 이미지 파일 리셋
  function reset() {
    setUploadFile("");
    setImgPreviewURL(defaultProfileImg);
  }

  return (
    <>
      <NewTopHeader
        left="back"
        title="프로필 수정"
        right="save"
        disabled={isDisabled}
        onClickButton={(e) => onSubmitSave(e)}
      />
      <ProfileEditWrapper>
        <ProfileEditForm>
          <ProfileEditLabel htmlFor="input-file">
            <ProfileEditImg
              src={imgPreviewURL || defaultProfileImg}
              alt="유저 프로필 이미지"
              onError={(e) => (e.target.src = profileImg)}
            />
          </ProfileEditLabel>

          <ProfileEditImgRestBtn type="button" onClick={reset}>
            <span className="a11y-hidden">이미지 초기화</span>
          </ProfileEditImgRestBtn>

          <ProfileEditUploadInput
            type="file"
            className="a11y-hidden"
            id="input-file"
            accept="image/*"
            onChange={onChangeImg}
          />
          <UserInput label="사용자 이름" inputId="input-username">
            <DataInput
              type="text"
              id="input-username"
              placeholder="2~10자 이내여야 합니다."
              value={username}
              onChange={onChangeUserame}
              max={10}
            />
            {usernameValidation.errorMessage && (
              <ErrorMessage>{usernameValidation.errorMessage}</ErrorMessage>
            )}
          </UserInput>

          <UserInput label="계정 ID" inputId="input-accountId">
            <DataInput
              type="text"
              id="input-accountId"
              placeholder="영문, 숫자, 특수문자(.),(_)만 사용 가능합니다."
              value={accountname}
              onChange={onChangeAccountname}
              onBlur={onBlurAccountname}
            />
            {accountnameValidation.errorMessage && (
              <ErrorMessage>{accountnameValidation.errorMessage}</ErrorMessage>
            )}
          </UserInput>

          <UserInput label="소개" inputId="input-intro">
            <DataInput
              type="text"
              id="input-intro"
              placeholder="자신과 판매할 상품에 대해 소개해 주세요!"
              value={intro}
              onChange={onChangeIntro}
              max={50}
            />
          </UserInput>
        </ProfileEditForm>
      </ProfileEditWrapper>
    </>
  );
}
