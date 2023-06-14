import React from "react";
import {
  LoginWrapper,
  LoginLionImg,
  LoginSelectWrapper,
  LoginSelectLi,
  LoginSelectBtn,
  LoginLink,
} from "./login.style";
import loginlion from "../../img/login-logo.svg";
import facebook from "../../img/facebook.svg";
import google from "../../img/google-logo.svg";
import kakao from "../../img/kakao-logo.svg";

export default function Login() {
  return (
    <LoginWrapper>
      <LoginLionImg src={loginlion} alt="로그인 로고" />
      <LoginSelectWrapper>
        <LoginSelectLi>
          <LoginSelectBtn logo={kakao} color="#F2C94C">
            카카오톡 계정으로 로그인
          </LoginSelectBtn>
        </LoginSelectLi>
        <LoginSelectLi>
          <LoginSelectBtn logo={google} color="#767676">
            구글 계정으로 로그인
          </LoginSelectBtn>
        </LoginSelectLi>
        <LoginSelectLi>
          <LoginSelectBtn logo={facebook} color="#2D9CDB">
            페이스북 계정으로 로그인
          </LoginSelectBtn>
        </LoginSelectLi>
        <LoginSelectLi>
          <LoginLink to="/login/loginEmail">이메일로 로그인</LoginLink>
          <LoginLink to="/signup/userAccount">회원가입</LoginLink>
        </LoginSelectLi>
      </LoginSelectWrapper>
    </LoginWrapper>
  );
}
