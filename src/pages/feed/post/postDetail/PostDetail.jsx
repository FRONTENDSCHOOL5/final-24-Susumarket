import React from "react";
import NewTopHeader from "../../../../components/commons/newTopHeader/NewTopHeader";
import PostModal from "../../../../components/commons/postModal/PostModal";
import { useState, useEffect, useRef, useContext, useCallback } from "react";
import { customAxios } from "../../../../library/customAxios";
import styled from "styled-components";
import morebutton from "../../../../img/icon-more-vertical.svg";
import { useParams } from "react-router-dom";
import { ModalContext } from "../../../../context/ModalContext";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../../../components/commons/confirmModal/confirmModal";
import { UserContext } from "../../../../context/UserContext";
import profileImg from "../../../../img/ProfileImg.svg";
import noImg from "../../../../img/symbol-logo-404.svg";

import {
  ProfilePostImgBtnLi,
  ProfilePostImgWrapper,
  ProfilePostImgUl,
  ProfilePostImgLi,
  ProfilePostButtonSpan,
  ProfilePostImg,
  ProfilePostImgBtnUl,
  ProfilePostImgBtn,
} from "../../../../components/units/profile/ProfilePost/ProfilePost.styles";

const UserWrapper = styled.section`
  margin: 0 auto;
  display: flex;
  align-items: center;
  // text-align: center;
  margin-top: 20px;
  width: 400px;
`;
const UserProfile = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;
const UserInfo = styled.div`
  margin-left: 10px;
`;
const UserName = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
`;
const AccountName = styled.p`
  font-size: 13px;
  font-weight: 400;
  color: #767676;
`;
const UserButton = styled.button`
  background: url(${morebutton}) no-repeat center/16px 16px;
  width: 16px;
  height: 16px;
  margin-left: 270px;
`;
const PostWrapper = styled.section`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 390px;
  padding-left: 54px;
  gap: 20px;
  width: 350px;
  margin-top: 20px;
`;

const PostContent = styled.div``;

export default function PostDetail() {
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState("");
  const [accountname, setAccountname] = useState("");
  const [postcontent, setPostContent] = useState("");
  const [postImage, setPostImage] = useState([]);
  const [imgArray, setImgArray] = useState([]);
  const [postModalProps, setPostModalProps] = useState([]);
  const [activeButton, setActiveButton] = useState(0);
  const { postId } = useParams();
  const ImgUlRef = useRef();
  const { setIsOpenPostModal } = useContext(ModalContext);
  console.log(postId);
  const myusername = localStorage.getItem("account");

  // 컨펌 모달 창
  const [confirmModalProps, setConfirmModalProps] = useState([]);
  const { setIsOpenConfirmModal } = useContext(ModalContext);
  // 로그아웃 버튼을 누른 경우 token과 삭제하기 위함
  const { setAccessToken } = useContext(UserContext);

  // 다중 이미지 게시물 보기 위한 버튼 함수
  function onClickSliderBtn(e, idx) {
    ImgUlRef.current.style.transform = `translateX(-${307 * idx}px)`;
    setActiveButton(idx);
  }

  // postmodal 사용 위해 props 설정
  function settingPostModalProps(modalProps) {
    setPostModalProps(modalProps);
    setIsOpenPostModal(true);
  }

  // confirm modal 사용 위해 props 설정
  function settingConfirmModalProps(confirmModalProps) {
    setConfirmModalProps(confirmModalProps);
    setIsOpenConfirmModal(true);
  }

  // 모달 창 닫기 위한 함수
  function closeModal() {
    setIsOpenPostModal(false);
    setIsOpenConfirmModal(false);
  }

  // 지속적인 실행 막기 위해 useEffect 사용
  useEffect(() => {
    fetchPostDetail();
  }, []);

  // api에서 업로드 된 post 내용과 이미지 불러오기
  const fetchPostDetail = async () => {
    try {
      const response = await customAxios.get(`post/${postId}`);
      setUsername(response.data.post.author.username);
      setAccountname(response.data.post.author.accountname);
      setProfileImage(response.data.post.author.image);
      setPostContent(response.data.post.content);
      setPostImage(response.data.post.image);
      setImgArray(response.data.post.image.split(","));
      console.log("이미지 : ", response.data.post.image.split(","));
    } catch (error) {
      console.error(error);
    }
  };

  // confirm modal 창에서 삭제 버튼 눌렀을 때, 게시글이 삭제될 수 있도록 하기 위한 함수
  const DeletePost = useCallback(async () => {
    try {
      await customAxios.delete(`post/${postId}`);
    } catch (error) {
      console.log(error);
    }
  }, [postId]);

  // 페이지 이동 위해 useNavigate() 사용
  const navigate = useNavigate();

  return (
    <>
      <NewTopHeader
        left="back"
        right="more"
        title = "수수마켓 게시글 상세"
        onClickButton={() =>
          settingPostModalProps([
            {
              name: "설정 및 개인정보",
              func: () => {
                navigate(`../../profile/${myusername}/edit`);
                // onClickProfileEdit();
              },
            },
            {
              name: "로그아웃",
              func: () => {
                settingConfirmModalProps({
                  confirmMessage: "정말 로그아웃 하시겠습니까?",
                  submitMessage: "로그아웃",
                  cancelMessage: "취소",
                  handleSubmit: () => {
                    localStorage.removeItem("accessToken");
                    setAccessToken(null);
                    closeModal();
                    navigate("/login");
                  },
                });
                console.log("로그아웃");
              },
            },
          ])
        }
      ></NewTopHeader>
      <UserWrapper>
        <UserProfile
          src={profileImage}
          alt="프로필 사진"
          onError={(e) => {
            e.target.src = profileImg;
          }}
        ></UserProfile>
        <UserInfo>
          <UserName>{username}</UserName>
          <AccountName>@ {accountname}</AccountName>
        </UserInfo>
        <UserButton
          onClick={() =>
            settingPostModalProps([
              {
                name: "삭제",
                func: () => {
                  settingConfirmModalProps({
                    confirmMessage: "게시글을 삭제할까요?",
                    submitMessage: "삭제",
                    cancelMessage: "취소",
                    handleSubmit: () => {
                      closeModal();
                      DeletePost();
                      navigate(`/profile/${myusername}`);
                    },
                  });
                  console.log("삭제");
                },
              },
              {
                name: "수정",
                func: () => {
                  // onClickPostEdit();
                  navigate(`../../post/${postId}/edit`);
                },
              },
            ])
          }
        ></UserButton>
      </UserWrapper>
      <PostWrapper>
        <PostContent>{postcontent}</PostContent>
        {imgArray.length > 0 ? (
          <ProfilePostImgWrapper>
            <ProfilePostImgUl ref={ImgUlRef}>
              {imgArray.map((image, idx) => {
                return (
                  <ProfilePostImgLi key={image + idx}>
                    <ProfilePostImg
                      src={image}
                      alt="포스트 이미지"
                      onError={(e) => {
                        e.target.src = noImg;
                      }}
                    />
                  </ProfilePostImgLi>
                );
              })}
            </ProfilePostImgUl>

            <ProfilePostImgBtnUl>
              {imgArray.map((image, idx) => {
                return (
                  <ProfilePostImgBtnLi key={image + idx}>
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
        ) : null}
      </PostWrapper>
      <PostModal menuList={postModalProps}></PostModal>
      <ConfirmModal
        confirmMessage={confirmModalProps.confirmMessage}
        cancelMessage={confirmModalProps.cancelMessage}
        submitMessage={confirmModalProps.submitMessage}
        handleSubmit={confirmModalProps.handleSubmit}
      ></ConfirmModal>
    </>
  );
}
