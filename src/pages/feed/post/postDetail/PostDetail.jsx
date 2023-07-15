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
import defaultImg from "../../../../img/ProfileImg.svg";
import useAuth from "../../../../hook/useAuth";
import UserInfo from "../../../../components/commons/userInfo/UserInfo";
import {
  CommentForm,
  CommentInput,
  CommentItem,
  CommentList,
  CommentUserImg,
  CommentWrapper,
  PostWrapper,
  CommentContent,
  CommentSubmitButton,
  PostWrapperTitle,
} from "./postDetail.style";
import InvalidPage from "../../../../components/commons/inValidPage/InvaliPage";
import Loading from "../../../../components/commons/loading/Loading";
import PostCard from "../../../../components/commons/postList/PostCard";

export default function PostDetail() {
  const [postModalProps, setPostModalProps] = useState([]);
  const [postData, setPostData] = useState({});
  const [isvalidPage, setIsValidPage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { postId } = useParams();
  const { setIsOpenPostModal } = useContext(ModalContext);
  const myProfile = useAuth();

  // 페이지 이동 위해 useNavigate() 사용
  const navigate = useNavigate();

  // 컨펌 모달 창
  const [confirmModalProps, setConfirmModalProps] = useState([]);
  const { setIsOpenConfirmModal } = useContext(ModalContext);
  // 로그아웃 버튼을 누른 경우 token과 삭제하기 위함
  const { setAccessToken } = useContext(UserContext);

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
      setPostData(response.data.post);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsValidPage(true);
    }
  };

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

  // postModal 창에 버튼을 누를경우 confirm 모달창의 props를 넘겨줌
  function onClickButton(confirmMessage, submitMessage, handleSubmit) {
    setConfirmModalProps({ confirmMessage, submitMessage, handleSubmit });
    setIsOpenConfirmModal(true);
  }

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

  const onClickModalBtn = (comment) => {
    if (myProfile.accountname === comment.author.accountname) {
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
              <PostCard
                onClickButton={onClickButton}
                settingPostModalProps={settingPostModalProps}
                closeModal={closeModal}
                reFetchPostData={fetchPostDetail}
                post={postData}
                userData={myProfile}
                isFeed={false}
                isPostDetail={true}
                setPostData={setPostData}
              />
            </PostWrapper>
            <CommentWrapper>
              <CommentList>
                {comments.map((comment) => (
                  <CommentItem key={comment.id}>
                    <UserInfo
                      right={"modalBtn"}
                      userData={comment.author}
                      bottom={"account"}
                      onClickModalBtn={()=>onClickModalBtn(comment)}
                      commentDate={comment.createdAt}
                    />

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
