import React from "react";
import {
  ProfilePostGalleryImg,
  ProfilePostGalleryLi,
  ProfilePostGalleryLink,
} from "./ProfilePost.styles";
import noImg from "../../../../img/no-image.png";

export default function ProfilePostGalleryList({ post }) {
  const imgArray = post.image.split(",");
  return (
    // 이미지가 여러개 인지를 구분하여 className를 부여
    <ProfilePostGalleryLi className={imgArray.length > 1 ? "multifly" : ""}>
      <ProfilePostGalleryLink to={`/post/${post.id}`}>
        <ProfilePostGalleryImg
          src={imgArray[0]}
          alt="게시물 이미지"
          onError={(e) => (e.target.src = noImg)}
        />
      </ProfilePostGalleryLink>
    </ProfilePostGalleryLi>
  );
}
