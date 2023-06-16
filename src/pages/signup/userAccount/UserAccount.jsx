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

export default function UserAccount() {
  return (
    <SignupContainer>
    <SignupForm>
      <Title>이메일로 회원가입</Title>
      <UserInput inputId="email" label="이메일">
        <DataInput
          type="email"
          id="email"
          placeholder="이메일 주소를 입력하세요."
        ></DataInput>
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
