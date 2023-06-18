// - (o)로그인 메인 화면에서 이메일로 로그인 을 클릭하면 이메일로 로그인할 수 있는 화면으로 이동합니다.
// - (o)이메일과 비밀번호를 모두 입력하면 `다음` 버튼이 활성화 됩니다. 입력되지 않은 입력창이 있다면 버튼은 활성되지 않습니다.
// - (x)`로그인` 버튼을 클릭하면 이메일 주소와 로그인에 대한 유효성 검사를 진행하며, 이메일 주소 또는 비밀번호가 일치하지 않을 경우에는 경고 문구가 나타납니다.
// - (o)입력창에 focus 될 경우에는 선의 색이 변합니다.(회색, #DBDBDB → 주황색, #F26E22)
import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import UserInput from "../../../components/commons/dataInput/UserInput"
import DataInput from "../../../components/commons/dataInput/DataInput"
import {
  Title, Container, LoginForm, SignUpLink, SignupButton
} from "./loginEmail.style";
// http://localhost:3000/login/LoginEmail
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../../../components/commons/errorMessage/ErrorMessage';
import { customAxios } from "../../../library/customAxios"
import { UserContext } from '../../../context/UserContext';

export default function LoginEmail() {
  const Navigate = useNavigate();
  const { setAccessToken, setAccount } = useContext(UserContext);
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [BtnDisabled, setBtnDisabled] = useState(true);
  const [ErrorMsg, setErrorMsg] = useState('');

  const user = {
    user: {
      email: emailValue,
      password: passwordValue
    }
  };


  // 형식 맞으면 버튼 활성화시킴
  useEffect(() => {
    emailValid && passwordValue.length >= 6 ? setBtnDisabled(false) : setBtnDisabled(true);
  }, [emailValid, passwordValue])

  // 이메일 input 유효성 검사
  const handleEmailValidation = (e) => {
    e.target.validity.typeMismatch ? setEmailValid(false) : setEmailValid(true);
    const emailSubmit = e.target.value; //현재 input값
    setEmailValue(emailSubmit); //email input값 useState 통해 emailValue로 전달
  }
  // 비밀번호 inpt 유효성 검사
  const handlePasswordValidation = (e) => {
    const passwordSubmit = e.target.value; //현재 input값
    setPasswordValue(passwordSubmit);//password input값 useState 통해 passwordValue로 전달
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const response = await customAxios.post(`user/login`, user);

      const data = response.data;
      
      if (data.message === "이메일 또는 비밀번호가 일치하지 않습니다.") {
        setErrorMsg(data.message);
        setEmailValue('');
        setPasswordValue('');
        return;
      } else {
        setAccessToken(data.user.token);
        setAccount(data.user.account);
        localStorage.setItem("accessToken", data.user.token);
        localStorage.setItem("account", data.user.account);
        Navigate("../../feed/post")
      }
    } catch (error) {
      // if(axios.isAxiosError(error)){
      // }
    }
  }
  return (
    <Container>
      <LoginForm>
        <Title>로그인</Title>
        <UserInput label="이메일">
          <DataInput
            type="email"
            placeholder="이메일을 입력해주세요"
            value={emailValue}
            onChange={handleEmailValidation}
            required> </DataInput>
        </UserInput>
        <UserInput label="비밀번호">
          <DataInput
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={passwordValue}
            onChange={handlePasswordValidation}
            required> </DataInput>
        </UserInput>
       {ErrorMsg&&<ErrorMessage>
          {ErrorMsg}
        </ErrorMessage>}

        <SignupButton
          className="large"
          disabled={BtnDisabled}
          onClick={onSubmit}>
          로그인 </SignupButton>
        <SignUpLink to="/signup/userAccount">이메일로 회원가입</SignUpLink>
      </LoginForm>
    </Container>

  )
}
