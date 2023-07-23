import React, { useCallback, useContext, useState } from "react";
import NewTopHeader from "../../../components/commons/newTopHeader/NewTopHeader";

import MenuBar from "../../../components/commons/menuBar/MenuBar";
import { ModalContext } from "../../../context/ModalContext";
import PostModal from "../../../components/commons/postModal/PostModal";
import ConfirmModal from "../../../components/commons/confirmModal/confirmModal";
import useAuth from "../../../hook/useAuth";
import TopButton from "../../../components/commons/topButton/TopButton";
import PostList from "../../../components/commons/postList/PostList";

export default function Post() {
  // confirm 모달창 props 설정 => 버튼 마다 confirm 모달창이 달라지기 때문에 사용
  const [confirmProps, setConfirmProps] = useState({});
  // post 모달창 props 설정 => 버튼 마다 post 모달창이 달라지기 때문에 사용
  const [postModalProps, setPostModalProps] = useState([]);
  const userData = useAuth();
  const { setIsOpenConfirmModal, setIsOpenPostModal } =
    useContext(ModalContext);
  // post 모달창 props 설정 및 열기
  const settingPostModalProps = useCallback((modalProps) => {
    setPostModalProps(modalProps);
    setIsOpenPostModal(true);
  },[])

  // postModal 창에 버튼을 누를경우 confirm 모달창의 props를 넘겨줌
  function onClickButton(confirmMessage, submitMessage, handleSubmit) {
    setConfirmProps({ confirmMessage, submitMessage, handleSubmit });
    setIsOpenConfirmModal(true);
  }

  // 모달창을 닫는 함수
  const closeModal = useCallback(() => {
    setIsOpenConfirmModal(false);
    setIsOpenPostModal(false);
  }, []);

  return (
    <>
      <NewTopHeader
        left="text"
        text="수수마켓 피드"
        right="search"
        title="수수마켓 피드"
      ></NewTopHeader>
      <PostList
        isFeed={true}
        settingPostModalProps={settingPostModalProps}
        onClickButton={onClickButton}
        closeModal={closeModal}
        userData={userData}
      />

      <MenuBar />
      <TopButton />
      <PostModal menuList={postModalProps} />
      <ConfirmModal
        confirmMessage={confirmProps.confirmMessage}
        submitMessage={confirmProps.submitMessage}
        cancelMessage="취소"
        handleSubmit={confirmProps.handleSubmit}
      />
    </>
  );
}
