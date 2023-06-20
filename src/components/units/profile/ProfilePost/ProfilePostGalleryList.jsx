import React from "react";
import {
  ProfilePostGalleryImg,
  ProfilePostGalleryLi,
  ProfilePostGalleryLink,
} from "./ProfilePost.styles";
export default function ProfilePostGalleryList({ post }) {
  const imgArray = post.image.split(",")
  return (
    <ProfilePostGalleryLi className={imgArray.length > 1 ? "multifly" : ""}>
      <ProfilePostGalleryLink to={`/post/${post.id}`}>
        <ProfilePostGalleryImg src={imgArray[0]} alt="게시물 이미지" />
      </ProfilePostGalleryLink>
    </ProfilePostGalleryLi>
  );
}
