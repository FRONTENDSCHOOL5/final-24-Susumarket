import React, { useCallback, useEffect, useState } from "react";
import {
  PostDisplayBtns,
  PostDisplayGallery,
  PostDisplayList,
  PostTitle,
  PostUl,
  PostWrapper,
  PostDisplayListImg,
  PostDisplayGalleryImg,
  PostNoneWrapper,
  PostNoneImg,
  PostNoneText,
  UserSearchWrapper,
  Img,
  Content,
} from "./postList.styles";
import lionImage from "../../../img/symbol-logo-gray.svg";
import postListIconOn from "../../../img/icon-post-list-on.svg";
import postListIconOff from "../../../img/icon-post-list-off.svg";
import postGalleryIconOn from "../../../img/icon-post-album-on.svg";
import postGalleryIconOff from "../../../img/icon-post-album-off.svg";
import PostNoneImgIcon from "../../../img/symbol-logo-404.svg";
import PostGalleries from "./postGalleries";
import { useNavigate } from "react-router-dom";
import Loading from "../../commons/loading/Loading";
import { useInView } from "react-intersection-observer";
import PostCard from "./PostCard.container";
import Button from "../button/Button";
import { myPostPageAPI, postFeedPageAPI } from "../../../API/postAPI";

export default function PostList({
  onClickButton,
  settingPostModalProps,
  closeModal,
  userData,
  isFeed,
}) {
  const [postData, setPostData] = useState([]);
  const [isNonePostData, setIsNonePostData] = useState(false);
  const [isGallery, setIsGallery] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [ref, inVeiw] = useInView();
  const limit = 5;
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  // 게시물 정보를 받아옴
  const fetchPostData = useCallback(async () => {
    try {
      const data = isFeed
        ? await postFeedPageAPI(limit, skip)
        : await myPostPageAPI(userData.accountname, limit, skip);
      setPostData((prev) => [...prev, ...data]);
      setHasMore(data.length === limit);
      setSkip((prev) => prev + limit);
      setIsLoading(false);
      if (data.length === 0 && skip === 0) {
        setIsNonePostData(true);
      } else {
        setIsNonePostData(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, [skip]);

  useEffect(() => {
    if (skip === 0) {
      fetchPostData();
    }
    if (hasMore && inVeiw) {
      fetchPostData();
    }
  }, [inVeiw]);

  return (
    // isFeed를 통해 profile 페이지에서 출력될 요소와 feed 페이지에서 출력될 요소를 구분
    <PostWrapper>
      <PostTitle className="a11y-hidden">게시물 목록</PostTitle>
      {!isNonePostData && !isFeed && (
        <PostDisplayBtns>
          <PostDisplayList onClick={() => setIsGallery(false)}>
            <PostDisplayListImg
              src={isGallery ? postListIconOff : postListIconOn}
              alt="목록 보기"
            />
          </PostDisplayList>
          <PostDisplayGallery>
            <PostDisplayGalleryImg
              src={isGallery ? postGalleryIconOn : postGalleryIconOff}
              alt="갤러리 보기"
              onClick={() => setIsGallery(true)}
            />
          </PostDisplayGallery>
        </PostDisplayBtns>
      )}
      {isNonePostData || !postData.length ? (
        isLoading ? (
          <Loading />
        ) : (
          <>
            {!isFeed && (
              <PostNoneWrapper>
                <PostNoneImg src={PostNoneImgIcon} alt="게시물 없음 아이콘" />
                <PostNoneText>현재 등록된 게시물이 없어요.</PostNoneText>
              </PostNoneWrapper>
            )}
            {isFeed && (
              <UserSearchWrapper>
                <Img src={lionImage} alt="유저 검색 이미지" />
                <Content>유저를 검색해 팔로우 해보세요!</Content>
                <Button className="ms" onClick={() => navigate("/search")}>
                  검색하기
                </Button>
              </UserSearchWrapper>
            )}
          </>
        )
      ) : (
        <>
          {postData && isGallery ? (
            <PostGalleries postData={postData} />
          ) : (
            <PostUl>
              {postData.map((post) => (
                <PostCard
                  key={post.id}
                  onClickButton={onClickButton}
                  settingPostModalProps={settingPostModalProps}
                  closeModal={closeModal}
                  reFetchPostData={fetchPostData}
                  post={post}
                  setPostData={setPostData}
                  isFeed={isFeed}
                  isPostDetail={false}
                  userData={userData}
                />
              ))}
              <div ref={ref}></div>
            </PostUl>
          )}
        </>
      )}
    </PostWrapper>
  );
}
