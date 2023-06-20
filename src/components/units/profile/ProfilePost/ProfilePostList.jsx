import React, { useRef, useState } from "react";
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
  ProfilePostLikeCount,
  ProfilePostCommentLink,
  ProfilePostCommentCount,
} from "./ProfilePost.styles";
import DateFormate from "../../../commons/dateFormat/DateFormat"
import authImg from "../../../../img/basic-profile.svg";
import moreIcon from "../../../../img/icon- more-vertical.svg";
import likeIcon from "../../../../img/icon-heart.svg";
import commentIcon from "../../../../img/icon-message-circle.svg";
import testImg from "../../../../img/cat.jpg";
import { useNavigate } from "react-router-dom";
export default function ProfilePostList({
  onClickButton,
  settingPostModalProps,
  closeModal,
}) {
  const [activeButton, setActiveButton] = useState(0);
  const ImgUlRef = useRef(null);
  const navigate = useNavigate();
  function onClickSliderBtn(e, idx) {
    ImgUlRef.current.style.transform = `translateX(-${307 * idx}px)`;
    setActiveButton(idx);
  }

  function onClickMore() {
    settingPostModalProps([  {
      name: "삭제",
      func: () => {
        onClickButton("정말 삭제하시겠습니까?", "삭제", () => {
          closeModal();
          alert("삭제");
        });
      },
    },
    {
      name: "수정",
      func: () => {
        closeModal();
        navigate("/post/postId/edit");
      },
    }])
  }

  return (
    <ProfilePostLi>
      <ProfilePostAuth to={"/profile/accountname"}>
        <ProfilePostAuthImg src={authImg} alt="작성자 프로필 이미지" />
        <ProfilePostAuthInfo>
          <ProfilePostAuthName>test</ProfilePostAuthName>
          <ProfilePostAuthId>test1</ProfilePostAuthId>
        </ProfilePostAuthInfo>
        <ProfilePostMoreBtn>
          <ProfilePostMoreBtnIcon src={moreIcon} alt="more 버튼" onClick={onClickMore}/>
        </ProfilePostMoreBtn>
      </ProfilePostAuth>

      <ProfilePostContents>
        <ProfilePostText>안녕하세요</ProfilePostText>

        <ProfilePostImgWrapper>
          <ProfilePostImgUl ref={ImgUlRef}>
            <ProfilePostImgLi>
              <ProfilePostImg src={testImg} alt="포스트 이미지" />
            </ProfilePostImgLi>

            <ProfilePostImgLi>
              <ProfilePostImg src={testImg} alt="포스트 이미지" />
            </ProfilePostImgLi>

            <ProfilePostImgLi>
              <ProfilePostImg src={testImg} alt="포스트 이미지" />
            </ProfilePostImgLi>
          </ProfilePostImgUl>
          <ProfilePostImgBtnUl>
            <ProfilePostImgBtnLi>
              <ProfilePostImgBtn className={activeButton === 0 ? "active" : ""}
              onClick={(e) => onClickSliderBtn(e, 0)}
              >
                <ProfilePostButtonSpan className="a11y-hidden">
                  이미지 슬라이드 버튼
                </ProfilePostButtonSpan>
              </ProfilePostImgBtn>
            </ProfilePostImgBtnLi>

            <ProfilePostImgBtnLi>
              <ProfilePostImgBtn className={activeButton === 1 ? "active" : ""}onClick={(e) => onClickSliderBtn(e, 1)}>
                <ProfilePostButtonSpan className="a11y-hidden">
                  이미지 슬라이드 버튼
                </ProfilePostButtonSpan>
              </ProfilePostImgBtn>
            </ProfilePostImgBtnLi>

            <ProfilePostImgBtnLi>
              <ProfilePostImgBtn className={activeButton === 2 ? "active" : ""}
              onClick={(e) => onClickSliderBtn(e, 2)}
              >
                <ProfilePostButtonSpan className="a11y-hidden">
                  이미지 슬라이드 버튼
                </ProfilePostButtonSpan>
              </ProfilePostImgBtn>
            </ProfilePostImgBtnLi>
          </ProfilePostImgBtnUl>
        </ProfilePostImgWrapper>

        <ProfilePostLikeCommentBtns>
          <ProfilePostLikeBtn>
            <ProfilePostLikeBtnIcon src={likeIcon} alt="좋아요" />
            <ProfilePostLikeCount>0</ProfilePostLikeCount>
          </ProfilePostLikeBtn>
          <ProfilePostCommentLink to={`/post/postId`}>
            <ProfilePostCommentLinkIcon src={commentIcon} alt="댓글" />
            <ProfilePostCommentCount>1</ProfilePostCommentCount>
          </ProfilePostCommentLink>
        </ProfilePostLikeCommentBtns>
        <DateFormate dateString={new Date().toISOString()}/>
      </ProfilePostContents>
    </ProfilePostLi>
  );
}
