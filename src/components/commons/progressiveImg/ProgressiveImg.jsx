import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Img } from "./progressiveImg.styles";

export default function ProgressiveImg({ placeholderSrc, src, ...props }) {
  const [imgSrc, setImgSrc] = useState("");
  const [isLazy, setIsLazy] = useState(true);
  const { ref, inView } = useInView();
  const customClass = isLazy ? "loading" : "loaded";
  useEffect(() => {
    if (inView && imgSrc === "") {
      console.log(imgSrc);
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImgSrc(src);
        setIsLazy(false);
      };
    }
  }, [src, inView]);

  return (
    <Img
      {...props}
      src={imgSrc}
      className={customClass}
      onError={(e) => (e.target.src = placeholderSrc)}
      ref={ref}
    />
  );
}
