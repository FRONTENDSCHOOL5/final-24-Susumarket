import React from 'react'
import Button from "../../../components/commons/button/Button";
import UserInput from "../../../components/commons/dataInput/UserInput";
import DataInput from "../../../components/commons/dataInput/DataInput";
import styled from "styled-components";

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
  `

  const ErrorMessage = styled.p`
    color: var(--color-primary);
    margin-top: 10px;
  `;

export default function UserAccount() {
  const [email, setEmail] = useState("");

  const [emailErrorMsg, setEmailErrorMsg] = useState("");

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
      setEmailErrorMsg("");
    }
  };

  return (
    <SignupContainer>
    <SignupForm>
      <Title>이메일로 회원가입</Title>
      <UserInput inputId="email" label="이메일">
        <DataInput
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="이메일 주소를 입력하세요."
        ></DataInput>
        {emailErrorMsg && <ErrorMessage>{emailErrorMsg}</ErrorMessage>}
      </UserInput>

      <UserInput inputId="password" label="비밀번호"></UserInput>
      <DataInput
        type="password"
        id="password"
        placeholder="비밀번호를 설정해 주세요."
      ></DataInput>
      <SignupButton>
        다음
      </SignupButton>
    </SignupForm>
  </SignupContainer>
  )
}
