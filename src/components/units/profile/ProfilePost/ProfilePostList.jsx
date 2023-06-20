import React, { useContext, useRef, useState } from "react";
import {
  ProfilePostAuth,
  ProfilePostAuthId,
  ProfilePostAuthImg,
  ProfilePostAuthInfo,
  ProfilePostAuthName,
  ProfilePostContents,
  ProfilePostButtonSpan,
  ProfilePostImg,
  ProfilePostImgBtn,
  ProfilePostImgBtnLi,
  ProfilePostImgBtnUl,
  ProfilePostImgLi,
  ProfilePostImgUl,
  ProfilePostImgWrapper,
  ProfilePostLi,
  ProfilePostText,
  ProfilePostMoreBtn,
  ProfilePostMoreBtnIcon,
  ProfilePostLikeBtnIcon,
  ProfilePostCommentLinkIcon,
  ProfilePostLikeCommentBtns,
  ProfilePostLikeBtn,
  ProfilePostHeartCount,
  ProfilePostCommentLink,
  ProfilePostCommentCount,
} from "./ProfilePost.styles";
import DateFormate from "../../../commons/dateFormat/DateFormat";
import authImg from "../../../../img/basic-profile.svg";
import moreIcon from "../../../../img/icon- more-vertical.svg";
import heartIcon from "../../../../img/icon-heart.svg";
import heartFillIcon from "../../../../img/icon-heart-fill.svg"
import commentIcon from "../../../../img/icon-message-circle.svg";
import { useNavigate } from "react-router-dom";
import { customAxios } from "../../../../library/customAxios";
import { UserContext } from "../../../../context/UserContext";
export default function ProfilePostList({
  onClickButton,
  settingPostModalProps,
  closeModal,
  reFetchPostData,
  post,
  idx,
}) {
  const {account} = useContext(UserContext);
  const [activeButton, setActiveButton] = useState(0);

  // 서버 재요청하지 않고 클라이언트에서 처리 하기 위해 사용
  const [heartCount, setHeartCount] = useState(post.heartCount);
  const [hearted, setHearted] = useState(post.hearted)


  const imgArray = post.image.split(",");
  const ImgUlRef = useRef(null);
  const navigate = useNavigate();
  function onClickSliderBtn(e, idx) {
    ImgUlRef.current.style.transform = `translateX(-${307 * idx}px)`;
    setActiveButton(idx);
  }

  async function onClickRemovePost() {
    try {
      await customAxios.delete(`post/${post.id}`);
    } catch (error) {
      console.log(error);
    }
  }
  async function onClickLike() {
    try {
      if(post.author.accountname === account) {
        alert("자신의 글을 좋아요를 할 수 없습니다!");
        return;
      }
      if (hearted) {
        await customAxios.delete(`post/${post.id}/unheart`);
        setHeartCount((prev) => parseInt(prev) - 1);
        setHearted(false);
      } else {
        await customAxios.post(`post/${post.id}/heart`);
        setHeartCount((prev) => parseInt(prev) + 1);
        setHearted(true);
      }
    } catch (error) {
      console.log(error);
    }
  }
  function onClickMore(e) {
    e.preventDefault();
    settingPostModalProps([
      {
        name: "삭제",
        func: () => {
          onClickButton("정말 삭제하시겠습니까?", "삭제", async () => {
            closeModal();
            await onClickRemovePost();
            reFetchPostData();
          });
        },
      },
      {
        name: "수정",
        func: () => {
          closeModal();
          navigate(`/post/${post.id}/edit`);
        },
      },
    ]);
  }

  return (
    <ProfilePostLi>
      <ProfilePostAuth to={`/profile/${post.author.accountname}`}>
        <ProfilePostAuthImg src={authImg} alt="작성자 프로필 이미지" />
        <ProfilePostAuthInfo>
          <ProfilePostAuthName>{post.author.accountname}</ProfilePostAuthName>
          <ProfilePostAuthId>{post.author.username}</ProfilePostAuthId>
        </ProfilePostAuthInfo>
        <ProfilePostMoreBtn>
          <ProfilePostMoreBtnIcon
            src={moreIcon}
            alt="more 버튼"
            onClick={onClickMore}
          />
        </ProfilePostMoreBtn>
      </ProfilePostAuth>

      <ProfilePostContents>
        <ProfilePostText>{post.content}</ProfilePostText>

        <ProfilePostImgWrapper>
          <ProfilePostImgUl ref={ImgUlRef}>
            {imgArray.map((image) => {
              return (
                <ProfilePostImgLi key={image}>
                  <ProfilePostImg src={image} alt="포스트 이미지" />
                </ProfilePostImgLi>
              );
            })}
          </ProfilePostImgUl>

          <ProfilePostImgBtnUl>
            {imgArray.map((image, idx) => {
              return (
                <ProfilePostImgBtnLi key={image}>
                  {imgArray.length > 1 && (
                    <ProfilePostImgBtn
                      className={activeButton === idx ? "active" : ""}
                      onClick={(e) => onClickSliderBtn(e, idx)}
                    >
                      <ProfilePostButtonSpan className="a11y-hidden">
                        이미지 슬라이드 버튼
                      </ProfilePostButtonSpan>
                    </ProfilePostImgBtn>
                  )}
                </ProfilePostImgBtnLi>
              );
            })}
          </ProfilePostImgBtnUl>
        </ProfilePostImgWrapper>

        <ProfilePostLikeCommentBtns>
          <ProfilePostLikeBtn onClick={onClickLike}>
            <ProfilePostLikeBtnIcon src={hearted? heartFillIcon : heartIcon} alt="좋아요" />
            <ProfilePostHeartCount>{heartCount}</ProfilePostHeartCount>
          </ProfilePostLikeBtn>
          <ProfilePostCommentLink to={`/post/${post.id}`}>
            <ProfilePostCommentLinkIcon src={commentIcon} alt="댓글" />
            <ProfilePostCommentCount>
              {post.commentCount}
            </ProfilePostCommentCount>
          </ProfilePostCommentLink>
        </ProfilePostLikeCommentBtns>
        <DateFormate dateString={post.createdAt} />
      </ProfilePostContents>
    </ProfilePostLi>
  );
}
