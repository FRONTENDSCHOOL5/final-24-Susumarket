import React from "react";
import {
  PostGalleryImg,
  PostGalleryLi,
  PostGalleryLink,
} from "./postList.styles";
import noImg from "../../../img/no-image.png";

export default function PostGalleryList({ post }) {
  const imgArray = post.image.split(",");
  return (
    // 이미지가 여러개 인지를 구분하여 className를 부여
    <PostGalleryLi className={imgArray.length > 1 ? "multifly" : ""}>
      <PostGalleryLink to={`/post/${post.id}`}>
        <PostGalleryImg
          src={imgArray[0]}
          alt="게시물 이미지"
          onError={(e) => (e.target.src = noImg)}
        />
      </PostGalleryLink>
    </PostGalleryLi>
  );
}
