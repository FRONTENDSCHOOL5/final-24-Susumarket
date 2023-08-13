import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../../../API/loginAPI";
import { UserContext } from "../../../context/UserContext";
import LoginEmailPresenter from "./loginEmail.presenter";

export default function LoginEmail() {
  const Navigate = useNavigate();
  const { setAccessToken } = useContext(UserContext);
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [BtnDisabled, setBtnDisabled] = useState(true);
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [ErrorMsg, setErrorMsg] = useState("");

  const emailReg =
    /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2 }$/;
  
  const user = {
    user: {
      email: emailValue,
      password: passwordValue,
    },
  };

  useEffect(() => {
    emailValid && passwordValue.length >= 6
      ? setBtnDisabled(false)
      : setBtnDisabled(true);
  }, [emailValid, passwordValue]);


  const validateEmail = (email) => {
    const emailPattern =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return emailPattern.test(email);
  };


  const handleEmailValidation =   (e) => {
      const value = e.target.value;
      setEmailValue(value);

      if (!validateEmail(value)) {
        setEmailErrorMsg("유효한 이메일 주소를 입력해주세요.");
      } else {
        setEmailValid(true);
        setEmailErrorMsg("");
      }
    };
    
  

  const handlePasswordValidation = (e) => {
    const passwordSubmit = e.target.value;
    setPasswordValue(passwordSubmit);
    if (e.target.value.length < 6) {
      setErrorMsg("비밀번호는 최소 6자리 이상이어야 합니다.");
    } else {
      setErrorMsg("");
    }
  };

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const data = await loginAPI(user);
      
      if (data.message === "이메일 또는 비밀번호가 일치하지 않습니다.") {
        setErrorMsg(data.message);
        setEmailValue("");
        setPasswordValue("");
        return;
      } else {
        setAccessToken(data.user.token);
        localStorage.setItem("accessToken", data.user.token);
        Navigate("/post");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <LoginEmailPresenter
      emailValue={emailValue}
      passwordValue={passwordValue}
      emailErrorMsg={emailErrorMsg}
      errorMsg={ErrorMsg}
      emailValidation={handleEmailValidation}
      passwordValidation={handlePasswordValidation}
      onSubmit={onSubmit}
      btnDisabled={BtnDisabled}
    />
  );
}
