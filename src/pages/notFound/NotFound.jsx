import React from "react";
import {
  NotFoundWrapper,
  NotFoundTitle,
  NotFoundImage,
  NotFoundP,
} from "./notFound.style";
import Button from "../../components/commons/button/Button";
import Svg404 from "../../img/symbol-logo-404.svg";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <>
      <NotFoundWrapper>
        <NotFoundTitle>
          <NotFoundImage src={Svg404} alt="" />
          <NotFoundP>페이지를 찾을 수 없습니다 :&#41;</NotFoundP>
        </NotFoundTitle>
        <Button active={true} className="medium" onClick={() => navigate(-1)}>
          이전 페이지
        </Button>
      </NotFoundWrapper>
    </>
  );
}
