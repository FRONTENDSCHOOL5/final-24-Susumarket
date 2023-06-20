import React from 'react'
import { ProfilePostGalleryImg, ProfilePostGalleryLi, ProfilePostGalleryLink } from './ProfilePost.styles'
import testImg from "../../../../img/cat.jpg";
export default function ProfilePostGalleryList() {
  return (
    <ProfilePostGalleryLi className="multifly">
    <ProfilePostGalleryLink to="/post/postId">
      <ProfilePostGalleryImg src={testImg} alt="게시물 이미지" />
    </ProfilePostGalleryLink>
  </ProfilePostGalleryLi>
  )
}
