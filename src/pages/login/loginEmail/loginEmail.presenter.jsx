import React from "react";
import ErrorMessage from "../../../components/commons/errorMessage/ErrorMessage";
import {
  Container,
  LoginForm,
  Title,
  SignupButton,
  SignUpLink,
} from "./loginEmail.style";
import UserInput from "../../../components/commons/dataInput/UserInput";
import DataInput from "../../../components/commons/dataInput/DataInput";

export default function LoginEmailPresenter({
  emailValue,
  passwordValue,
  emailErrorMsg,
  errorMsg,
  emailValidation,
  passwordValidation,
  onSubmit,
  btnDisabled,
}) {
  return (
    <Container>
      <LoginForm>
        <Title>로그인</Title>
        <UserInput label="이메일">
          <DataInput
            type="email"
            placeholder="이메일을 입력하세요"
            value={emailValue}
            onChange={emailValidation}
            required
          />
        </UserInput>
        {emailErrorMsg && <ErrorMessage>{emailErrorMsg}</ErrorMessage>}
        <UserInput label="비밀번호">
          <DataInput
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={passwordValue}
            onChange={passwordValidation}
            required
          />
        </UserInput>
        {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}

        <SignupButton className="large" disabled={btnDisabled} onClick={onSubmit}>
          로그인
        </SignupButton>
        <SignUpLink to="/signup/userAccount">이메일로 회원 가입</SignUpLink>
      </LoginForm>
    </Container>
  );
}
