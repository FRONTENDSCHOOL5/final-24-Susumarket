import React, { useEffect } from "react";
import {
  SplashWrapper,
  SplashTitle,
  SplashLionImg,
  SplashTextImg,
} from "./splash.style";
import lionImg from "../../img/symbol-logo-main.svg";
import splashTextImg from "../../img/splash-text.svg";
import lionImgWebp from "../../img/webp/symbol-logo-main.webp";
import splashTextImgWebp from "../../img/webp/splash-text.webp";
import { useNavigate } from "react-router-dom";
import { resolveWebp } from "../../library/checkWebpSupport";
export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, 2800);
  }, []);
  return (
    <SplashWrapper>
      <SplashLionImg src={resolveWebp(lionImgWebp, lionImg)} alt="로고 이미지" />
      <SplashTitle>
        <SplashTextImg
          src={resolveWebp(splashTextImgWebp, splashTextImg)}
          alt="수수마켓"
        />
      </SplashTitle>
    </SplashWrapper>
  );
}
