import React from "react";
import {
  ProfilePostGalleryUl,
} from "./ProfilePost.styles";
import ProfilePostGalleryList from "./ProfilePostGalleryList";
export default function ProfilePostGallery() {
  return (
    <ProfilePostGalleryUl>
     <ProfilePostGalleryList/>
     <ProfilePostGalleryList/>
     <ProfilePostGalleryList/>
     <ProfilePostGalleryList/>
     <ProfilePostGalleryList/>
    </ProfilePostGalleryUl>
  );
}
