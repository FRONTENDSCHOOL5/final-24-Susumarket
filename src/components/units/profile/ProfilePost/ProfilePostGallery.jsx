import React from "react";
import { ProfilePostGalleryUl } from "./ProfilePost.styles";
import ProfilePostGalleryList from "./ProfilePostGalleryList";
export default function ProfilePostGallery({ postData }) {
  return (
    <ProfilePostGalleryUl>
      {postData.map((post) => {
        return <ProfilePostGalleryList key={post.id} post={post} />;
      })}
    </ProfilePostGalleryUl>
  );
}
