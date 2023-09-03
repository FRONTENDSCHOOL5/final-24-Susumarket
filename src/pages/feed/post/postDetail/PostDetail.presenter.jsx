import React from "react";
import UserInfo from "../../../../components/commons/userInfo/UserInfo";
import InvalidPage from "../../../../components/commons/inValidPage/InvaliPage";
import Loading from "../../../../components/commons/loading/Loading";
import PostCard from "../../../../components/commons/postList/PostCard.container";
import ConfirmModal from "../../../../components/commons/confirmModal/confirmModal";
import NewTopHeader from "../../../../components/commons/newTopHeader/NewTopHeader";
import PostModal from "../../../../components/commons/postModal/PostModal";
import defaultImg from "../../../../img/ProfileImg.svg";
import defaultImgWebp from "../../../../img/webp/ProfileImg.webp"
;
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
import { resolveWebp } from "../../../../library/checkWebpSupport";
export default function PostDetailUI({
  settingPostModalProps,
  settingConfirmModalProps,
  setAccessToken,
  closeModal,
  navigate,
  myProfile,
  isLoading,
  isvalidPage,
  onClickButton,
  fetchPostDetail,
  postData,
  setPostData,
  comments,
  onClickModalBtn,
  handleCommentSubmit,
  newComment,
  setNewComment,
  confirmModalProps,
  postModalProps,
}) {
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
                      onClickModalBtn={() => onClickModalBtn(comment)}
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
                        ? resolveWebp(defaultImgWebp, defaultImg)
                        : myProfile.image
                    }
                    onError={(e) => (e.target.src = resolveWebp(defaultImgWebp, defaultImg))}
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
