import React from "react";
import { Background, LoadingImg } from "./loading.styles";
import Spinner from "../../../img/loading.gif";
export default function Loading() {
  return (
    <Background>
      <LoadingImg src={Spinner} alt="로딩중" />
    </Background>
  );
}
