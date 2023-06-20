import React, { useState } from "react";
import {
  ProfilePostDisplayBtns,
  ProfilePostDisplayGallery,
  ProfilePostDisplayList,
  ProfilePostTitle,
  ProfilePostUl,
  ProfilePostWrapper,
  ProfilePostDisplayListImg,
  ProfilePostDisplayGalleryImg,
} from "./ProfilePost.styles";

import postListIconOn from "../../../../img/icon-post-list-on.svg";
import postListIconOff from "../../../../img/icon-post-list-off.svg";
import postGalleryIconOn from "../../../../img/icon-post-album-on.svg";
import postGalleryIconOff from "../../../../img/icon-post-album-off.svg";

import ProfilePostList from "./ProfilePostList";
import ProfilePostGallery from "./ProfilePostGallery";
export default function ProfilePost({
  onClickButton,
  settingPostModalProps,
  closeModal,
}) {
  const [isGallery, setIsGallery] = useState(false);
  return (
    <ProfilePostWrapper>
      <ProfilePostTitle className="a11y-hidden">게시물 목록</ProfilePostTitle>

      <ProfilePostDisplayBtns>
        <ProfilePostDisplayList onClick={()=>setIsGallery(false)}>
          <ProfilePostDisplayListImg src={isGallery ? postListIconOff : postListIconOn} alt="목록 보기" />
        </ProfilePostDisplayList>
        <ProfilePostDisplayGallery>
          <ProfilePostDisplayGalleryImg
            src={isGallery ? postGalleryIconOn : postGalleryIconOff}
            alt="갤러리 보기"
            onClick={()=>setIsGallery(true)}
          />
        </ProfilePostDisplayGallery>
      </ProfilePostDisplayBtns>
      {isGallery ? <ProfilePostGallery/> : <ProfilePostUl>
        <ProfilePostList 
        onClickButton={onClickButton}
        settingPostModalProps={settingPostModalProps}
        closeModal={closeModal}
        />
      </ProfilePostUl>}
    </ProfilePostWrapper>
  );
}
