import React from "react";
import NewTopHeader from "../../../../components/commons/newTopHeader/NewTopHeader";
import PostModal from "../../../../components/commons/postModal/PostModal";
import { useState, useEffect, useRef, useContext, useCallback } from "react";
import { customAxios } from "../../../../library/customAxios";
import { useParams } from "react-router-dom";
import { ModalContext } from "../../../../context/ModalContext";
import DateFormate from "../../../../components/commons/dateFormat/DateFormat";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../../../components/commons/confirmModal/confirmModal";
import { UserContext } from "../../../../context/UserContext";
import profileImg from "../../../../img/ProfileImg.svg";
import noImg from "../../../../img/no-image.png";
import defaultImg from "../../../../img/ProfileImg.svg";
import useAuth from "../../../../hook/useAuth";
import moreIcon from "../../../../img/icon-more-vertical.svg";
import heartIcon from "../../../../img/icon-heart.svg";
import heartFillIcon from "../../../../img/icon-heart-fill.svg";
import commentIcon from "../../../../img/icon-message-circle.svg";
import nonePostImg from "../../../../img/symbol-logo-404.svg";

import {
  ProfilePostImgBtnLi,
  ProfilePostImgWrapper,
  ProfilePostImgUl,
  ProfilePostImgLi,
  ProfilePostButtonSpan,
  ProfilePostImg,
  ProfilePostImgBtnUl,
  ProfilePostImgBtn,
  ProfilePostAuthImg,
  ProfilePostAuthInfo,
  ProfilePostAuthId,
  ProfilePostMoreBtn,
  ProfilePostContents,
  ProfilePostAuthName,
  ProfilePostMoreBtnIcon,
  ProfilePostLikeCommentBtns,
  ProfilePostLikeBtn,
  ProfilePostLikeBtnIcon,
  ProfilePostHeartCount,
  ProfilePostCommentLinkIcon,
  ProfilePostCommentCount,
  ProfilePostAuthLink,
} from "../../../../components/units/profile/ProfilePost/ProfilePost.styles";

import {
  UserWrapper,
  AccountName,
  CommentForm,
  CommentInput,
  CommentItem,
  CommentList,
  CommentUserImg,
  CommentWrapper,
  PostWrapper,
  UserInfo,
  UserName,
  UserProfile,
  CommentContent,
  CommentBtnSpan,
  CommentSubmitButton,
  CommentDeleteButton,
  PostCard,
  PostContent,
  NonePostWrapper,
  NonePostImg,
  NonePostText,
  PostWrapperTitle,
  UserLink,
  CommentMoreBtn,
} from "./postDetail.style";
import InvalidPage from "../../../../components/commons/inValidPage/InvaliPage";
import Loading from "../../../../components/commons/loading/Loading";

export default function PostDetail() {
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState("");
  const [accountname, setAccountname] = useState("");
  const [postcontent, setPostContent] = useState("");
  const [commentCount, setCommentCount] = useState(0);
  const [heartCount, setHeartCount] = useState(0);
  const [hearted, setHearted] = useState(false);
  const [imgArray, setImgArray] = useState([]);
  const [postModalProps, setPostModalProps] = useState([]);
  const [postData, setPostData] = useState({});
  const [activeButton, setActiveButton] = useState(0);
  const [isvalidPage, setIsValidPage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { postId } = useParams();
  const ImgUlRef = useRef();
  const { setIsOpenPostModal } = useContext(ModalContext);
  const myProfile = useAuth();

  // 페이지 이동 위해 useNavigate() 사용
  const navigate = useNavigate();

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
    if (myProfile) {
      fetchPostDetail();
    }
  }, [myProfile]);

  // api에서 업로드 된 post 내용과 이미지 불러오기
  const fetchPostDetail = async () => {
    try {
      const response = await customAxios.get(`post/${postId}`);
      setUsername(response.data.post.author.username);
      setAccountname(response.data.post.author.accountname);
      setProfileImage(response.data.post.author.image);
      setIsValidPage(false);
      setPostContent(response.data.post.content);
      if (response.data.post.image) {
        setImgArray(response.data.post.image.split(","));
      }

      setCommentCount(response.data.post.commentCount);
      setHeartCount(response.data.post.heartCount);
      setHearted(response.data.post.hearted);
      setPostData(response.data.post);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsValidPage(true);
    }
  };

  // confirm modal 창에서 삭제 버튼 눌렀을 때, 게시글이 삭제될 수 있도록 하기 위한 함수
  const DeletePost = useCallback(async () => {
    try {
      await customAxios.delete(`post/${postId}`);
    } catch (error) {
      if (error.response.data.message === "존재하지 않는 게시글 입니다.") {
        alert(error.response.data.message);
      }
      console.log(error);
    }
  }, [postId]);

  const ReportPost = useCallback(async () => {
    try {
      await customAxios.delete(`post/${postId}/report`);
    } catch (error) {
      if (error.response.data.message === "존재하지 않는 게시글 입니다.") {
        alert(error.response.data.message);
      }
      console.log(error);
    }
  }, [postId]);

  async function onClickLike() {
    try {
      if (accountname === myProfile.accountname) {
        alert("자신의 글을 좋아요 할 수 없습니다!");
        return;
      }
      if (hearted) {
        await customAxios.delete(`post/${postId}/unheart`);
        setHeartCount((prev) => parseInt(prev) - 1);
        setHearted(false);
      } else {
        await customAxios.post(`post/${postId}/heart`);
        setHeartCount((prev) => parseInt(prev) + 1);
        setHearted(true);
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.message) {
        alert(error.response.data.message);
        navigate("/post");
      }
    }
  }

  // 댓글 작성 처리 함수
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await customAxios.post(`post/${postId}/comments`, {
        comment: {
          content: newComment,
        },
      });

      setNewComment("");
      await fetchPostDetail();
      await fetchComments();
    } catch (error) {
      if (error.response.data.message === "존재하지 않는 게시글 입니다.") {
        alert(error.response.data.message);
        navigate("/post");
      }
      console.error(error);
    }
  };

  // 댓글 목록 불러오기
  const fetchComments = async () => {
    try {
      const response = await customAxios.get(`post/${postId}/comments`);
      const fetchedComments = response.data.comments;
      setComments(fetchedComments);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const deleteComment = async (commentId) => {
    try {
      await customAxios.delete(`post/${postId}/comments/${commentId}`);
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      if (error.response.data.message === "존재하지 않는 게시글 입니다.") {
        alert(error.response.data.message);
        navigate("/post");
      }
      console.error(error);
    }
  };

  const reportComment = async (commentId) => {
    try {
      await customAxios.delete(`post/${postId}/comments/${commentId}/report`);
    } catch (error) {
      if (error.response.data.message === "댓글이 존재하지 않습니다.") {
        alert(error.response.data.message);
        fetchComments();
      }
      console.error(error);
    }
  };

  return (
    <>
      <NewTopHeader
        left="back"
        right="more"
        title="수수마켓 게시글 상세"
        onClickButton={() =>
          settingPostModalProps([
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
              },
            },
            {
              name: "설정 및 개인정보",
              func: () => {
                navigate(`../../profile/${myProfile.accountname}/edit`);
                // onClickProfileEdit();
              },
            },
          ])
        }
      ></NewTopHeader>
      <>
        {isLoading ? (
          <Loading />
        ) : !isvalidPage ? (
          <>
            <PostWrapper>
              <PostWrapperTitle className="a11y-hidden">
                게시물
              </PostWrapperTitle>
              <PostCard>
                <ProfilePostAuthLink to={`/profile/${accountname}`}>
                  <ProfilePostAuthImg
                    src={
                      profileImage && profileImage.endsWith("Ellipse.png")
                        ? defaultImg
                        : profileImage
                    }
                    alt="프로필 사진"
                    onError={(e) => {
                      e.target.src = profileImg;
                    }}
                  />
                  <ProfilePostAuthInfo>
                    <ProfilePostAuthName>{username}</ProfilePostAuthName>
                    <ProfilePostAuthId>{accountname}</ProfilePostAuthId>
                  </ProfilePostAuthInfo>
                </ProfilePostAuthLink>
                <ProfilePostMoreBtn
                  onClick={() => {
                    if (myProfile.accountname === accountname) {
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
                                navigate(`/profile/${myProfile}`);
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
                      ]);
                    } else {
                      settingPostModalProps([
                        {
                          name: "신고",
                          func: () => {
                            settingConfirmModalProps({
                              confirmMessage: "게시글을 신고할까요?",
                              submitMessage: "신고",
                              cancelMessage: "취소",
                              handleSubmit: () => {
                                closeModal();
                                ReportPost();
                                alert("신고가 완료되었습니다.");
                              },
                            });
                          },
                        },
                      ]);
                    }
                  }}
                >
                  <ProfilePostMoreBtnIcon src={moreIcon} alt="more 버튼" />
                </ProfilePostMoreBtn>
                <ProfilePostContents>
                  <PostContent>{postcontent}</PostContent>
                  {imgArray.length > 0 ? (
                    <ProfilePostImgWrapper>
                      <ProfilePostImgUl ref={ImgUlRef}>
                        {imgArray.map((image, idx) => {
                          return (
                            image !== "" && (
                              <ProfilePostImgLi key={image + idx}>
                                <ProfilePostImg
                                  src={image}
                                  alt="포스트 이미지"
                                  onError={(e) => {
                                    e.target.src = noImg;
                                  }}
                                />
                              </ProfilePostImgLi>
                            )
                          );
                        })}
                      </ProfilePostImgUl>

                      <ProfilePostImgBtnUl>
                        {imgArray.map((image, idx) => {
                          return (
                            <ProfilePostImgBtnLi key={image + idx}>
                              {imgArray.length > 1 && (
                                <ProfilePostImgBtn
                                  className={
                                    activeButton === idx ? "active" : ""
                                  }
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
                  <ProfilePostLikeCommentBtns>
                    <ProfilePostLikeBtn onClick={onClickLike}>
                      <ProfilePostLikeBtnIcon
                        src={hearted ? heartFillIcon : heartIcon}
                        alt="좋아요"
                      />
                      <ProfilePostHeartCount>
                        {heartCount}
                      </ProfilePostHeartCount>
                    </ProfilePostLikeBtn>
                    <ProfilePostCommentLinkIcon src={commentIcon} alt="댓글" />
                    <ProfilePostCommentCount>
                      {commentCount}
                    </ProfilePostCommentCount>
                  </ProfilePostLikeCommentBtns>
                  {postData.createdAt && (
                    <DateFormate dateString={postData.createdAt} />
                  )}
                </ProfilePostContents>
              </PostCard>
            </PostWrapper>
            <CommentWrapper>
              <CommentList>
                {comments.map((comment) => (
                  <CommentItem key={comment.id}>
                    <UserWrapper>
                      <UserLink to={`/profile/${comment.author.accountname}`}>
                        <UserProfile
                          src={
                            comment.author.image &&
                            comment.author.image.endsWith("Ellipse.png")
                              ? defaultImg
                              : comment.author.image
                          }
                          onError={(e) => (e.target.src = defaultImg)}
                          alt="프로필 이미지"
                        />
                        <UserInfo>
                          <UserName>
                            {comment.author.username}
                            <DateFormate dateString={comment.createdAt} />
                          </UserName>
                          <AccountName>
                            {comment.author.accountname}
                          </AccountName>
                        </UserInfo>
                      </UserLink>
                      <CommentMoreBtn
                        onClick={(e) => {
                          e.preventDefault();
                          if (
                            myProfile.accountname === comment.author.accountname
                          ) {
                            settingPostModalProps([
                              {
                                name: "삭제",
                                func: () => {
                                  settingConfirmModalProps({
                                    confirmMessage: "댓글을 삭제하시겠습니까?",
                                    submitMessage: "삭제",
                                    cancelMessage: "취소",
                                    handleSubmit: () => {
                                      deleteComment(comment.id);
                                      closeModal();
                                    },
                                  });
                                },
                              },
                            ]);
                          } else {
                            settingPostModalProps([
                              {
                                name: "신고",
                                func: () => {
                                  settingConfirmModalProps({
                                    confirmMessage: "신고하시겠습니까?",
                                    submitMessage: "신고",
                                    cancelMessage: "취소",
                                    handleSubmit: () => {
                                      reportComment(comment.id);
                                      alert("신고가 완료되었습니다.");
                                      closeModal();
                                    },
                                  });
                                },
                              },
                            ]);
                          }
                        }}
                      >
                        <CommentBtnSpan className="a11y-hidden">
                          더 보기
                        </CommentBtnSpan>
                      </CommentMoreBtn>
                    </UserWrapper>

                    <CommentContent>{comment.content}</CommentContent>
                  </CommentItem>
                ))}
              </CommentList>

              <CommentForm onSubmit={handleCommentSubmit}>
                {myProfile && (
                  <CommentUserImg
                    src={
                      myProfile.image.endsWith("Ellipse.png")
                        ? defaultImg
                        : myProfile.image
                    }
                    onError={(e) => (e.target.src = defaultImg)}
                    alt="프로필 이미지"
                  />
                )}
                <CommentInput
                  type="text"
                  placeholder="댓글을 입력하세요"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <CommentSubmitButton type="submit" value={newComment}>
                  작성
                </CommentSubmitButton>
              </CommentForm>
            </CommentWrapper>
          </>
        ) : (
          <InvalidPage text={"존재하지 않는 게시물 입니다."} size={"large"} />
        )}
      </>

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
