import React, { useState } from "react";
import Button from "../../../components/commons/button/Button";
import UserInput from "../../../components/commons/dataInput/UserInput";
import DataInput from "../../../components/commons/dataInput/DataInput";
import styled from "styled-components";
import { css } from "styled-components";
import { useNavigate } from "react-router-dom";

const SignupContainer = styled.main`
  width: 87%;
  max-width: 500px;
  margin: 20px auto;
`;

const SignupForm = styled.form`
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

const SignupButton = styled(Button)`
  margin-top: 50px;

  ${(props) =>
    props.disabled &&
    css`
      background-color: var(--color-sub);
      cursor: not-allowed;
    `}
`;

const ErrorMessage = styled.p`
  color: var(--color-primary);
  margin-top: 10px;
`;

export default function UserAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = {
        user: {
          username: null,
          email: email,
          password: password.toString(),
          accountname: null,
          intro: null,
          image: null,
        },
      };
      onClickNextPage();
    } catch (error) {
      console.error(error);
    }
  };

  const validateEmail = (email) => {
    const emailPattern =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return emailPattern.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!validateEmail(value)) {
      setEmailErrorMsg("유효한 이메일 주소를 입력해주세요.");
    } else {
      setEmailErrorMsg("사용 가능한 이메일 입니다.");
    }
  };

  const handleEmailBlur = async () => {
    try {
      const response = await customAxios.post(`user/emailvalid`, {
        user: {
          email: email,
        },
      });
      const data = response.data;
      if (data.message === "이미 가입된 이메일 주소 입니다.") {
        setEmailErrorMsg(data.message);
        return;
      }
      console.log(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (newPassword.length < 6) {
      setPasswordMsg("비밀번호는 최소 6자리 이상이어야 합니다.");
    } else {
      setPasswordMsg("");
    }
  };

  const isFormValid = () => {
    return validateEmail(email) && password.length >= 6;
  };

  const navigate = useNavigate();
  const onClickNextPage = () => {
    navigate("/signup/profileSetting", { state: { email, password } });
  };

  return (
    <SignupContainer>
      <SignupForm>
        <Title>이메일로 회원가입</Title>
        <UserInput inputId="email" label="이메일">
          <DataInput
            type="email"
            id="email"
            placeholder="이메일 주소를 입력하세요."
            value={email}
            onChange={handleEmailChange}
          ></DataInput>
          {emailErrorMsg && <ErrorMessage>{emailErrorMsg}</ErrorMessage>}
        </UserInput>

        <UserInput inputId="password" label="비밀번호"></UserInput>
        <DataInput
          type="password"
          id="password"
          placeholder="비밀번호를 설정해 주세요."
          value={password}
          onChange={handlePasswordChange}
        ></DataInput>
        {passwordMsg && <ErrorMessage>{passwordMsg}</ErrorMessage>}
        <SignupButton
          className="large"
          disabled={!isFormValid() || emailErrorMsg === "이미 가입된 이메일 주소 입니다."}
          onClick={handleSubmit}
        >
          다음
        </SignupButton>
      </SignupForm>
    </SignupContainer>
  );
}
