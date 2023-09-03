import React from "react";

import { useState, useEffect, useContext, useCallback } from "react";
import { useParams } from "react-router-dom";
import { ModalContext } from "../../../../context/ModalContext";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../../context/UserContext";
import useAuth from "../../../../hook/useAuth";
import { postDetailAPI } from "../../../../API/postAPI";
import {
  writeCommentAPI,
  commentListAPI,
  commentDeleteAPI,
  commentReportAPI,
} from "../../../../API/commentAPI";
import PostDetailUI from "./PostDetail.presenter";

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

  const fetchPostDetail = async () => {
    try {
      const response = await postDetailAPI(postId);
      setPostData(response);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsValidPage(true);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await writeCommentAPI(postId, {
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

  const fetchComments = useCallback(async () => {
    try {
      const fetchedComments = await commentListAPI(postId);
      setComments(fetchedComments);
    } catch (error) {
      console.error(error);
    }
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // postModal 창에 버튼을 누를경우 confirm 모달창의 props를 넘겨줌
  function onClickButton(
    confirmMessage,
    submitMessage,
    cancelMessage,
    handleSubmit,
  ) {
    setConfirmModalProps({
      confirmMessage,
      submitMessage,
      cancelMessage,
      handleSubmit,
    });
    setIsOpenConfirmModal(true);
  }

  const deleteComment = useCallback(
    async (commentId) => {
      try {
        await commentDeleteAPI(postId, commentId);
        setComments(comments.filter((comment) => comment.id !== commentId));
      } catch (error) {
        if (error.response.data.message === "존재하지 않는 게시글 입니다.") {
          alert(error.response.data.message);
          navigate("/post");
        }
        console.error(error);
      }
    },
    [postId, comments],
  );

  const reportComment = useCallback(
    async (commentId) => {
      try {
        await commentReportAPI(postId, commentId);
      } catch (error) {
        if (error.response.data.message === "댓글이 존재하지 않습니다.") {
          alert(error.response.data.message);
          fetchComments();
        }
        console.error(error);
      }
    },
    [postId, fetchComments],
  );

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
    <PostDetailUI
      settingPostModalProps={settingPostModalProps}
      settingConfirmModalProps={settingConfirmModalProps}
      setAccessToken={setAccessToken}
      closeModal={closeModal}
      navigate={navigate}
      myProfile={myProfile}
      isLoading={isLoading}
      isvalidPage={isvalidPage}
      onClickButton={onClickButton}
      fetchPostDetail={fetchPostDetail}
      postData={postData}
      setPostData={setPostData}
      comments={comments}
      onClickModalBtn={onClickModalBtn}
      handleCommentSubmit={handleCommentSubmit}
      newComment={newComment}
      setNewComment={setNewComment}
      confirmModalProps={confirmModalProps}
      postModalProps={postModalProps}
    />
  );
}
