import React, { useEffect } from "react";
import { SplashWrapper, SplashTitle, SplashLionImg, SplashTextImg } from "./splash.style";
import lion from "../../img/symbol-logo-main.svg";
import susumarket from "../../img/splash-text.svg";
import { useNavigate } from "react-router-dom";
export default function Splash() {
  const navigate = useNavigate();
 
  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, 2800);
  }, []);
  return (
    <SplashWrapper>
      <SplashLionImg src={lion} alt="로고 이미지" />
      <SplashTitle>
        <SplashTextImg src={susumarket} alt="수수마켓" />
      </SplashTitle>
    </SplashWrapper>
  );
}
