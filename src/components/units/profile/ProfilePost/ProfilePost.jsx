import React, { useEffect, useState } from "react";
import {
  ProfilePostDisplayBtns,
  ProfilePostDisplayGallery,
  ProfilePostDisplayList,
  ProfilePostTitle,
  ProfilePostUl,
  ProfilePostWrapper,
  ProfilePostDisplayListImg,
  ProfilePostDisplayGalleryImg,
  PostNoneWrapper,
  PostNoneImg,
  PostNoneText,
} from "./ProfilePost.styles";

import postListIconOn from "../../../../img/icon-post-list-on.svg";
import postListIconOff from "../../../../img/icon-post-list-off.svg";
import postGalleryIconOn from "../../../../img/icon-post-album-on.svg";
import postGalleryIconOff from "../../../../img/icon-post-album-off.svg";
import PostNoneImgIcon from "../../../../img/symbol-logo-404.svg";

import ProfilePostList from "./ProfilePostList";
import ProfilePostGallery from "./ProfilePostGallery";
import { customAxios } from "../../../../library/customAxios";
import { useParams } from "react-router-dom";

export default function ProfilePost({
  onClickButton,
  settingPostModalProps,
  closeModal,
}) {
  const [postData, setPostData] = useState([]);
  const [isNonePostData, setIsNonePostData] = useState(false);
  const [isGallery, setIsGallery] = useState(false);
  const params = useParams();
  const accountname = params.userId;
  const fetchPostData = async () => {
    try {
      const response = await customAxios(`post/${accountname}/userpost`);
      setPostData(response.data.post);
      if (response.data.post.length === 0) {
        setIsNonePostData(true);
      } else {
        setIsNonePostData(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPostData();
  }, []);
  return (
    <ProfilePostWrapper>
      <ProfilePostTitle className="a11y-hidden">게시물 목록</ProfilePostTitle>
      {!isNonePostData ? (
        <ProfilePostDisplayBtns>
          <ProfilePostDisplayList onClick={() => setIsGallery(false)}>
            <ProfilePostDisplayListImg
              src={isGallery ? postListIconOff : postListIconOn}
              alt="목록 보기"
            />
          </ProfilePostDisplayList>
          <ProfilePostDisplayGallery>
            <ProfilePostDisplayGalleryImg
              src={isGallery ? postGalleryIconOn : postGalleryIconOff}
              alt="갤러리 보기"
              onClick={() => setIsGallery(true)}
            />
          </ProfilePostDisplayGallery>
        </ProfilePostDisplayBtns>
      ) : (
        <PostNoneWrapper>
          <PostNoneImg src={PostNoneImgIcon} alt="게시물 없음 아이콘"/>
          <PostNoneText>현재 등록된 게시물이 없어요.</PostNoneText>
        </PostNoneWrapper>
      )}
      {postData && isGallery ? (
        <ProfilePostGallery postData={postData} />
      ) : (
        <ProfilePostUl>
          {postData.map((post) => {
            return (
              <ProfilePostList
                key={post.id}
                onClickButton={onClickButton}
                settingPostModalProps={settingPostModalProps}
                closeModal={closeModal}
                reFetchPostData={fetchPostData}
                post={post}
              />
            );
          })}
        </ProfilePostUl>
      )}
    </ProfilePostWrapper>
  );
}
