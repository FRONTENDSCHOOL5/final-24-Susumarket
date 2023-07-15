import React from "react";
import {
  PostNoneImg,
  PostNoneText,
  PostNoneWrapper,
  PostGalleryUl,
} from "./postList.styles";
import PostGalleryList from "./postGalleryList";
import PostNoneImgIcon from "../../../img/symbol-logo-404.svg";
export default function PostGalleries({ postData }) {
  return (
    // posData에서 image가 있는 데이터만 찾음
    <>
      {postData.find((el) => el.image.length > 0) ? (
        <PostGalleryUl>
          {postData.map((post) => {
            return post.image && <PostGalleryList key={post.id} post={post} />;
          })}
        </PostGalleryUl>
      ) : (
        <PostNoneWrapper>
          <PostNoneImg src={PostNoneImgIcon} alt="게시물 없음 아이콘" />
          <PostNoneText>현재 등록된 이미지 게시물이 없어요.</PostNoneText>
        </PostNoneWrapper>
      )}
    </>
  );
}
