import React from "react";
import {
  ProfilePostGalleryImg,
  ProfilePostGalleryLi,
  ProfilePostGalleryLink,
} from "./ProfilePost.styles";
import noImg from "../../../../img/symbol-logo-404.svg";

export default function ProfilePostGalleryList({ post }) {
  const imgArray = post.image.split(",");
  return (
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
