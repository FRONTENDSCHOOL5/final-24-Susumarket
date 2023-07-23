import React from "react";
import noImg from "../../../img/no-image.png";
import DateFormate from "../../commons/dateFormat/DateFormat";
import heartIcon from "../../../img/icon-heart.svg";
import heartFillIcon from "../../../img/icon-heart-fill.svg";
import commentIcon from "../../../img/icon-message-circle.svg";
import {
  PostContents,
  PostButtonSpan,
  PostImg,
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
                    <PostImg
                      src={image}
                      alt="포스트 이미지"
                      onError={(e) => (e.target.src = noImg)}
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
              src={hearted ? heartFillIcon : heartIcon}
              alt="좋아요"
            />
            <PostHeartCount>{heartCount}</PostHeartCount>
          </PostLikeBtn>
          <PostCommentLink to={`/post/${post.id}`}>
            <PostCommentLinkIcon src={commentIcon} alt="댓글" />
            <PostCommentCount>{post.commentCount}</PostCommentCount>
          </PostCommentLink>
        </PostLikeCommentBtns>
        <DateFormate dateString={post.createdAt} />
      </PostContents>
    </PostLi>
  );
}
