import React, { useContext, useEffect, useState } from "react";
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
  const [userData, setUserData] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const myAccountname = params.userId;
  const usernameReg = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/;
  const accountnameReg = /^[a-zA-Z0-9._]+$/;
  function onChangeImg(e) {
    e.preventDefault();
    const file = e.target.files[0];
    const valid = validataionImg(file);
    if (!valid) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImgPreviewURL(reader.result);
    };
    reader.readAsDataURL(file);
    setUploadFile(file);
  }

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
    console.log(e.target.value.length);
    if (!value.length) {
      setAccountnameValidation({
        errorMessage: "계정 ID를 입력하세요",
        isValid: false,
      });
    } else {
      vaildation(
        e,
        accountnameReg,
        setAccountnameValidation,
        "영문, 숫자, 특수문자( . )( _ )만 사용가능합니다.",
      );
    }
  }

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
        if(accountname !== myAccountname)
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
    if (
      username === userData.username &&
      accountname === userData.accountname &&
      (imgPreviewURL === userData.image ||
        imgPreviewURL === defaultProfileImg) &&
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
    async function fetchUserData() {
      try {
        const response = await customAxios.get("user/myinfo");
        const data = response.data.user;
        setImgPreviewURL(
          data.image.includes("Ellipse.png") ? defaultProfileImg : data.image,
        );
        setUserData(data);
        setAccountname(data.accountname);
        setUsername(data.username);
        setIntro(data.intro);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserData();
  }, []);

  useEffect(() => {
    if (accountnameValidation.isValid && usernameValidation.isValid) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [accountnameValidation, usernameValidation]);

  function validataionImg(file) {
    if (!file) {
      return false;
    }
    if (file.size > 1024 * 1024 * 10) {
      alert("이미지 파일의 크기를 초과하였습니다.(최대 10MB)");
      return false;
    }
    if (
      !file.name.includes("png") &&
      !file.name.includes("jpg") &&
      !file.name.includes("jpeg") &&
      !file.name.includes("bmp") &&
      !file.name.includes("tif") &&
      !file.name.includes("heic") &&
      !file.name.includes("gif")
    ) {
      alert(
        "이미지 형식을 확인해 주세요!\n(지원형식 : .jpg,.gif, .png,.jpeg, .bmp,.tif, *.heic)",
      );
      return false;
    }
    return true;
  }
  function reset() {
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
            <ProfileEditImgRestBtn
              type="button"
              onClick={reset}
            ></ProfileEditImgRestBtn>
          </ProfileEditLabel>

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
            />
          </UserInput>
        </ProfileEditForm>
      </ProfileEditWrapper>
    </>
  );
}
