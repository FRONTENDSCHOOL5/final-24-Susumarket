import React from "react";
import DateFormate from "../../commons/dateFormat/DateFormat";
import heartIcon from "../../../img/icon-heart.svg";
import heartIconFill from "../../../img/icon-heart-fill.svg";
import commentIcon from "../../../img/icon-message-circle.svg";
import placeholderImg from "../../../img/placeholderImg.svg";
import heartIconWebp from "../../../img/webp/icon-heart.webp";
import heartIconFillWebp from "../../../img/webp/icon-heart-fill.webp";
import commentIconWebp from "../../../img/webp/icon-message-circle.webp";
import placeholderImgWebp from "../../../img/webp/placeholderImg.webp";

import {
  PostContents,
  PostButtonSpan,
  PostImgBtn,
  PostImgBtnLi,
  PostImgBtnUl,
  PostImgLi,
  PostImgUl,
  PostImgWrapper,
  PostLi,
  PostText,
  PostLikeBtnIcon,
  PostCommentLinkIcon,
  PostLikeCommentBtns,
  PostLikeBtn,
  PostHeartCount,
  PostCommentLink,
  PostCommentCount,
} from "./postList.styles";
import UserInfo from "../userInfo/UserInfo";
import ProgressiveImg from "../progressiveImg/ProgressiveImg";
import { resolveWebp } from "../../../library/checkWebpSupport";
export default function PostCardUI({
  post,
  onClickMore,
  imgArray,
  ImgUlRef,
  hearted,
  heartCount,
  activeButton,
  onClickSliderBtn,
  onClickLike,
}) {
  return (
    <PostLi>
      <UserInfo
        right={"modalBtn"}
        userData={post.author}
        bottom={"account"}
        onClickModalBtn={onClickMore}
      />
      <PostContents>
        <PostText>{post.content}</PostText>
        {imgArray[0] && imgArray[0].length > 0 ? (
          <PostImgWrapper>
            <PostImgUl ref={ImgUlRef}>
              {imgArray.map((image, idx) => {
                return (
                  <PostImgLi key={image + idx}>
                    <ProgressiveImg
                      style={{
                        borderRadius: "10px",
                        marginBottom: "16px",
                        width: "100%",
                        maxWidth: "304px",
                        height: "100%",
                        objectFit: "cover",
                        verticalAlign: "top",
                      }}
                      placeholderSrc={placeholderImgWebp}
                      src={image}
                      alt="포스트 이미지"
                    />
                  </PostImgLi>
                );
              })}
            </PostImgUl>

            <PostImgBtnUl>
              {imgArray.map((image, idx) => {
                return (
                  <PostImgBtnLi key={image + idx}>
                    {imgArray.length > 1 && (
                      <PostImgBtn
                        className={activeButton === idx ? "active" : ""}
                        onClick={(e) => onClickSliderBtn(e, idx)}
                      >
                        <PostButtonSpan className="a11y-hidden">
                          이미지 슬라이드 버튼
                        </PostButtonSpan>
                      </PostImgBtn>
                    )}
                  </PostImgBtnLi>
                );
              })}
            </PostImgBtnUl>
          </PostImgWrapper>
        ) : null}

        <PostLikeCommentBtns>
          <PostLikeBtn onClick={onClickLike}>
            <PostLikeBtnIcon
              src={
                hearted
                  ? resolveWebp( heartIconFillWebp, heartIconFill)
                  : resolveWebp(heartIconWebp, heartIcon)
              }
              alt="좋아요"
            />
            <PostHeartCount>{heartCount}</PostHeartCount>
          </PostLikeBtn>
          <PostCommentLink to={`/post/${post.id}`}>
            <PostCommentLinkIcon
              src={resolveWebp(commentIconWebp, commentIcon)}
              alt="댓글"
            />
            <PostCommentCount>{post.commentCount}</PostCommentCount>
          </PostCommentLink>
        </PostLikeCommentBtns>
        <DateFormate dateString={post.createdAt} />
      </PostContents>
    </PostLi>
  );
}
