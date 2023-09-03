import React from "react";
import {
  LoginWrapper,
  LoginLionImg,
  LoginSelectWrapper,
  LoginSelectLi,
  LoginSelectBtn,
  LoginLink,
} from "./login.style";
import loginLogo from "../../img/login-logo.svg";
import facebook from "../../img/facebook.svg";
import google from "../../img/google-logo.svg";
import kakao from "../../img/kakao-logo.svg";

import loginLogoWebp from "../../img/webp/login-logo.webp";
import facebookWebp from "../../img/webp/facebook-logo.webp";
import googleWebp from "../../img/webp/google-logo.webp";
import kakaoWebp from "../../img/webp/kakao-logo.webp";
import { resolveWebp } from "../../library/checkWebpSupport";
import { sweetToast } from "../../library/sweetAlert/sweetAlert";

export default function Login() {
  const onClickSocialLogin = () => {
    sweetToast("소셜 로그인은 현재 지원하지 않습니다.", "warning")
  }
  return (
    <LoginWrapper>
      <LoginLionImg src={resolveWebp(loginLogoWebp, loginLogo)} alt="로그인 로고" />
      <LoginSelectWrapper>
        <LoginSelectLi>
          <LoginSelectBtn logo={resolveWebp(kakaoWebp, kakao)} onClick={onClickSocialLogin} color="#F2C94C">
            카카오톡 계정으로 로그인
          </LoginSelectBtn>
        </LoginSelectLi>
        <LoginSelectLi>
          <LoginSelectBtn logo={resolveWebp(googleWebp, google)} onClick={onClickSocialLogin} color="#767676">
            구글 계정으로 로그인
          </LoginSelectBtn>
        </LoginSelectLi>
        <LoginSelectLi>
          <LoginSelectBtn logo={resolveWebp(facebookWebp, facebook)} onClick={onClickSocialLogin} color="#2D9CDB">
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
