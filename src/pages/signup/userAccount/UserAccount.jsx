import React, { useEffect, useState, useCallback } from "react";
import UserInput from "../../../components/commons/dataInput/UserInput";
import DataInput from "../../../components/commons/dataInput/DataInput";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../../components/commons/errorMessage/ErrorMessage";
import { emailValidationAPI } from "../../../API/validationAPI";
import {
  SignupContainer,
  SignupForm,
  Title,
  SignupButton,
} from "./UserAccount.style";

export default function UserAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);

  // 새로 고침 막기 및 다음 페이지 이동
  const handleSubmit = async (e) => {
    e.preventDefault();
    onClickNextPage();
  };

  // 이메일 유효성 검사 (정해진 규칙대로 입력하도록)
  const validateEmail = useCallback((email) => {
    const emailPattern =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return emailPattern.test(email);
  }, []);

  const handleEmailChange = useCallback(
    (e) => {
      const value = e.target.value;
      setEmail(value);

      if (!validateEmail(value)) {
        setEmailErrorMsg("유효한 이메일 주소를 입력해주세요.");
      } else {
        setEmailErrorMsg("");
      }
    },
    [validateEmail],
  );

  //qwe11@naver.com
  // 이메일 input에서 focus가 벗어나는 경우 가입된 이메일 주소인지 아닌지 확인 (api 사용)
  const handleEmailBlur = useCallback(async () => {
    try {
      const data = await emailValidationAPI({
        user: {
          email: email,
        },
      });
      if (data === "이미 가입된 이메일 주소 입니다.") {
        setEmailErrorMsg(data);
        return;
      }
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }, [email]);

  // 패스워드 상태 변화 체크하여 6자리 미만인 경우 에러 메시지 출력
  const handlePasswordChange = useCallback((e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (newPassword.length < 6) {
      setPasswordMsg("비밀번호는 최소 6자리 이상이어야 합니다.");
    } else {
      setPasswordMsg("");
    }
  }, []);

  // 다음 페이지 이동 시 이메일, 패스워드 값을 넘겨주도록 함함
  const navigate = useNavigate();
  const onClickNextPage = () => {
    if (isFormValid) {
      navigate("/signup/profileSetting", { state: { email, password } });
    }
  };

  // useEffect로 유효성 검사 상태 관리
  useEffect(() => {
    if (validateEmail(email) && password.length >= 6) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [email, password]);

  return (
    <SignupContainer>
      <SignupForm>
        <Title>이메일로 회원가입</Title>
        <UserInput inputId="registeremail" label="이메일">
          <DataInput
            type="email"
            id="registeremail"
            placeholder="이메일 주소를 입력하세요."
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            aria-label = "이메일 주소 입력칸"
          ></DataInput>
          {emailErrorMsg && <ErrorMessage>{emailErrorMsg}</ErrorMessage>}
        </UserInput>

        <UserInput inputId="registerpassword" label="비밀번호"></UserInput>
        <DataInput
          type="password"
          id="registerpassword"
          placeholder="비밀번호를 설정해 주세요."
          value={password}
          onChange={handlePasswordChange}
          aria-label = "비밀번호 입력칸"
        ></DataInput>
        {passwordMsg && <ErrorMessage>{passwordMsg}</ErrorMessage>}
        <SignupButton
          className="large"
          disabled={
            isFormValid === false ||
            emailErrorMsg === "이미 가입된 이메일 주소 입니다."
          }
          onClick={handleSubmit}
          aria-label = "다음 버튼"
        >
          다음
        </SignupButton>
      </SignupForm>
    </SignupContainer>
  );
}