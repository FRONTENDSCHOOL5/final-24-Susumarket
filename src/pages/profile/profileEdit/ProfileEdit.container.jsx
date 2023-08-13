import React, { useEffect, useState } from "react";
import defaultProfileImg from "../../../img/ProfileImg.svg";
import defaultProfileImgWebp from "../../../img/webp/ProfileImg.webp";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hook/useAuth";
import { imgValidation } from "../../../library/imgValidation";
import { imgUploadAPI } from "../../../API/imgUploadAPI";
import { accountValidationAPI } from "../../../API/validationAPI";
import { profileEditAPI } from "../../../API/profileAPI";
import ProfileEditUI from "./ProfileEdit.presenter";
import { resolveWebp } from "../../../library/checkWebpSupport";
import { sweetToast } from "../../../library/sweetAlert/sweetAlert";
import { profileImgCompression } from "../../../library/imgCompression";
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
  const usernameReg = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/;
  const accountnameReg = /^[a-zA-Z0-9._]+$/;
  const userData = useAuth();
  const defaultProfileImgSrc = resolveWebp(
    defaultProfileImgWebp,
    defaultProfileImg,
  );

  const onChangeImg = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const valid = imgValidation(file);
    if (!valid) return;
    // 이미지 압축후 이미지 (압축한 blob이미지, 미리보기 이미지) 반환
    const {compressedFileBlob, preview} = await profileImgCompression(file);
    // blob이미지 file 형식으로 변환
    const compressedFile = new File([compressedFileBlob], file.name, { type: file.type });
    // 압축 이미지 미리보기 적용
    setImgPreviewURL(preview);
    // 업로드할 압축 이미지 적용
    setUploadFile(compressedFile);
  };

  // 인자로 event 객체, 유효성 검사 정규표현식, valid 상태관리 함수, 경고 메세지 텍스트를 받음
  // 인자로 받은 정규표현식 유효성 검사를 통해 유효하다면 에러 메세지를 없애고, isVali값을 true로
  // 유효하지 않다면 인자로 받은 에러 메세지를 넣고, isVali값을 false로
  const vaildation = (e, reg, setValid, text) => {
    if (reg.test(e.target.value)) {
      setValid({ errorMessage: "", isValid: true });
    } else {
      setValid({ errorMessage: text, isValid: false });
    }
  };

  const onChangeUserame = (e) => {
    const value = e.target.value.trim();
    setUsername(value);
    vaildation(
      e,
      usernameReg,
      setUsernameValidation,
      "2~10자 이내 이름을 입력하세요.",
    );
  };

  const onChangeAccountname = (e) => {
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
  };

  // bulr 이벤트가 발생했을때 계정 중복 검사
  const onBlurAccountname = async () => {
    const user = {
      user: {
        accountname,
      },
    };
    if (!accountname) return;
    const response = await accountValidationAPI(user);
    if (response !== "사용 가능한 계정ID 입니다.") {
      // 계정 ID와 일치하는 경우는 예외 처리 => 본인 계정 ID는 중복 가능하도록 함, 계정 ID 이외 다른 정보만 변경할 경우도 있기 때문
      if (accountname !== userData.accountname)
        setAccountnameValidation({
          errorMessage: response,
          isValid: false,
        });
    } else {
      setAccountnameValidation({ errorMessage: "", isValid: true });
    }
  };

  const onChangeIntro = (e) => {
    const value = e.target.value;
    if (value.trim() === "") {
      setIntro(value.trim());
    } else {
      setIntro(value);
    }
  };

  const onSubmitSave = async (e) => {
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
      sweetToast("수정사항이 없습니다!", "warning");
      return;
    }
    const formData = new FormData();
    formData.append("image", uploadFile);
    const filename = await imgUploadAPI(formData);
    await profileEditAPI({
      user: {
        username,
        accountname,
        intro,
        image: uploadFile
          ? `${process.env.REACT_APP_BASE_URL}${filename}`
          : imgPreviewURL === defaultProfileImgSrc
          ? `${process.env.REACT_APP_BASE_URL}Ellipse.png`
          : imgPreviewURL,
      },
    });
    navigate(`/profile`);
  };

  useEffect(() => {
    if (userData) {
      setAccountname(userData.accountname);
      setUsername(userData.username);
      setIntro(userData.intro);
      setImgPreviewURL(
        userData.image.includes("Ellipse.png")
          ? defaultProfileImgSrc
          : userData.image,
      );
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
    setImgPreviewURL(defaultProfileImgSrc);
  }

  return (
    <ProfileEditUI
      isDisabled={isDisabled}
      username={username}
      usernameValidation={usernameValidation}
      accountname={accountname}
      accountnameValidation={accountnameValidation}
      intro={intro}
      imgPreviewURL={imgPreviewURL}
      defaultProfileImgWebp={defaultProfileImgWebp}
      onSubmitSave={onSubmitSave}
      reset={reset}
      onChangeImg={onChangeImg}
      onChangeUserame={onChangeUserame}
      onChangeAccountname={onChangeAccountname}
      onBlurAccountname={onBlurAccountname}
      onChangeIntro={onChangeIntro}
      resolveWebp={resolveWebp}
    />
  );
}
