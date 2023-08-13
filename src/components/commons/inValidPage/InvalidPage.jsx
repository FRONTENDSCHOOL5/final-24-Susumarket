import React from "react";
import {
  InvalidImg,
  InvalidText,
  InvalidTitle,
  InvalidWrapper,
} from "./invalidPage.style";
import invalidPageImg from "../../../img/symbol-logo-404.svg";
import invalidPageImgWebp from "../../../img/webp/symbol-logo-404.webp";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";
import { resolveWebp } from "../../../library/checkWebpSupport";

export default function InvalidPage({ text, size }) {
  const navigate = useNavigate();
  return (
    <InvalidWrapper>
      <InvalidTitle className={"a11y-hidden"}>{text}</InvalidTitle>
      <InvalidImg
        src={resolveWebp(invalidPageImgWebp, invalidPageImg)}
        alt=""
        className={size}
      />
      <InvalidText>{text}</InvalidText>
      <Button onClick={() => navigate(-1)} className="medium" active={true}>
        이전 페이지
      </Button>
    </InvalidWrapper>
  );
}
