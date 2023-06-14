import React from "react";
import styled from "styled-components";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetCont,
} from "./postModalStyle";

const PostModal = ({ isOpen, onClose, children }) => {
  return (
    <>
      <BottomSheetModal isOpen={isOpen}>
        <BottomSheetCont>{children}</BottomSheetCont>
      </BottomSheetModal>
      <BottomSheetBackdrop isOpen={isOpen} onClick={onClose} />
    </>
  );
};

export default PostModal;
