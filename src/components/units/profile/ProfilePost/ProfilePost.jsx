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
  UserSearchWrapper,
  Img,
  Content,
} from "./ProfilePost.styles";
import LionImage from "../../../../img/symbol-logo-gray.svg";
import postListIconOn from "../../../../img/icon-post-list-on.svg";
import postListIconOff from "../../../../img/icon-post-list-off.svg";
import postGalleryIconOn from "../../../../img/icon-post-album-on.svg";
import postGalleryIconOff from "../../../../img/icon-post-album-off.svg";
import PostNoneImgIcon from "../../../../img/symbol-logo-404.svg";

import ProfilePostList from "./ProfilePostList";
import ProfilePostGallery from "./ProfilePostGallery";
import { customAxios } from "../../../../library/customAxios";
import Button from "../../../commons/button/Button";
import { useNavigate } from "react-router-dom";

export default function ProfilePost({
  onClickButton,
  settingPostModalProps,
  closeModal,
  userData,
  isFeed,
}) {
  const [postData, setPostData] = useState([]);
  const [isNonePostData, setIsNonePostData] = useState(false);
  const [isGallery, setIsGallery] = useState(false);
  const navigate = useNavigate();

  // 게시물 정보를 받아옴
  const fetchPostData = async () => {
    try {
      const response = await customAxios(
        `post/${userData.accountname}/userpost`,
      );
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

  // 팔로잉된 유저들의 게시물 목록을 가져옴
  const fetchFeedPostData = async () => {
    try {
      const response = await customAxios(`post/feed?limit=1000&skip=0`);
      setPostData(response.data.posts);
      if (response.data.posts.length === 0) {
        setIsNonePostData(true);
      } else {
        setIsNonePostData(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // userData.accountname이 있을 경우에 게시물 정보를 받아옴 => userData.accountname undefined 방지
  useEffect(() => {
    // isFeed를 통해 profile페이지와 feed(post)페이지에 적용될 데이터를 다르게 처리
    if (isFeed) {
      fetchFeedPostData();
    } else if (!isFeed && userData.accountname) {
      fetchPostData();
    }
  }, [userData]);
  return (
    // isFeed를 통해 profile 페이지에서 출력될 요소와 feed 페이지에서 출력될 요소를 구분
    <ProfilePostWrapper>
      <ProfilePostTitle className="a11y-hidden">게시물 목록</ProfilePostTitle>
      {!isNonePostData && !isFeed && (
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
      )}
      {isNonePostData ? (
        <>
          {!isFeed && (
            <PostNoneWrapper>
              <PostNoneImg src={PostNoneImgIcon} alt="게시물 없음 아이콘" />
              <PostNoneText>현재 등록된 게시물이 없어요.</PostNoneText>
            </PostNoneWrapper>
          )}
          {isFeed && (
            <UserSearchWrapper>
              <Img src={LionImage} alt="유저 검색 이미지" />
              <Content>유저를 검색해 팔로우 해보세요!</Content>
              <Button className="ms" onClick={() => navigate("/search")}>
                검색하기
              </Button>
            </UserSearchWrapper>
          )}
        </>
      ) : (
        <>
          {postData && isGallery ? (
            <ProfilePostGallery postData={postData} />
          ) : (
            <ProfilePostUl>
              {postData.map((post) => (
                <ProfilePostList
                  key={post.id}
                  onClickButton={onClickButton}
                  settingPostModalProps={settingPostModalProps}
                  closeModal={closeModal}
                  reFetchPostData={fetchPostData}
                  post={post}
                  isFeed={isFeed}
                  userData={userData}
                />
              ))}
            </ProfilePostUl>
          )}
        </>
      )}
    </ProfilePostWrapper>
  );
}
