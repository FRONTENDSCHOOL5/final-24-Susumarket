import React, {useEffect, useState } from "react";
import { Img } from "./progressiveImg.styles";
import { useInView } from "react-intersection-observer";
import noImg from "../../../img/no-image.svg";
import noImgWebp from "../../../img/webp/no-image.webp";
import { resolveWebp } from "../../../library/checkWebpSupport";
import placeholderImg from "../../../img/placeholderImg.svg";
import placeholderImgWebp from "../../../img/webp/placeholderImg.webp";

export default function ProgressiveImg({ src, ...props }) {
  const placeholderSrc = resolveWebp(placeholderImgWebp, placeholderImg);
  // 이미지 src를 관리
  const [imgSrc, setImgSrc] = useState(placeholderSrc || src);
  // 현재 로딩이 상태
  const [isLoading, setIsLoading] = useState(true);
  const { ref, inView } = useInView();
  useEffect(() => {
    // 이미지가 화면에서 보이고, imgSrc가 placholder이미지 일때 이미지를 받아옴
    if (inView && imgSrc === placeholderSrc) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImgSrc(src);
        setIsLoading(false);
      };
      img.onerror = () => {
        setIsLoading(false);
        setImgSrc(resolveWebp(noImgWebp, noImg));
      };
    }
  }, [src, inView]);

  return (
    <Img
      {...{ src: imgSrc, ...props }}
      // 로딩 상태일 때 blur효과를 주기위해 사용
      className={isLoading ? "loading" : "loaded"}
      ref={ref}
    />
  );
}
