import React from "react";
import {
  PostGalleryLi,
  PostGalleryLink,
} from "./postList.styles";
import ProgressiveImg from "../progressiveImg/ProgressiveImg";
import placeholderImgWebp from "../../../img/webp/placeholderImg.webp"

export default function PostGalleryList({ post }) {
  const imgArray = post.image.split(",");
  return (
    // 이미지가 여러개 인지를 구분하여 className를 부여
    <PostGalleryLi className={imgArray.length > 1 ? "multifly" : ""}>
      <PostGalleryLink to={`/post/${post.id}`}>
        <ProgressiveImg
          placeholderSrc={placeholderImgWebp}
          style={{
            marginBottom: "0",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          src={imgArray[0]}
          alt="게시물 이미지"
        />
      </PostGalleryLink>
    </PostGalleryLi>
  );
}
