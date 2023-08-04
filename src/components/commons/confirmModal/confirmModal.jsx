import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { ModalContext } from "../../../context/ModalContext";
import { useLocation } from "react-router-dom";

function ConfirmModal({
  confirmMessage,
  cancelMessage,
  submitMessage,
  handleSubmit,
}) {
  const { isOpenConfirmModal, setIsOpenConfirmModal, setIsOpenPostModal } =
    useContext(ModalContext);
  const ConfirmRef = useRef(null);
  const cancelBtnRef = useRef(null);
  const submitBtnRef = useRef(null);
  const pathname = useLocation().pathname;
  const handleCancel = () => {
    setIsOpenConfirmModal(false);
    setIsOpenPostModal(false);
  };

  useEffect(() => {
    if (isOpenConfirmModal) {
      ConfirmRef.current.focus();
    }
  }, [isOpenConfirmModal]);

  useEffect(() => {
    setIsOpenConfirmModal(false);
  }, [pathname]);

  return (
    <>
      {isOpenConfirmModal && (
        <Confirm
          tabIndex="0"
          ref={ConfirmRef}
          onKeyDown={(e) => {
            if (e.keyCode === 27) {
              setIsOpenConfirmModal(false);
              setIsOpenPostModal(false);
            }
          }}
        >
          <ConfirmMessage>{confirmMessage}</ConfirmMessage>
          <div>
            <CancelButton
              onClick={handleCancel}
              ref={cancelBtnRef}
              onKeyDown={(e) => {
                if (e.shiftKey && e.keyCode === 9) {
                  e.preventDefault();
                  submitBtnRef.current.focus();
                }
              }}
            >
              {cancelMessage}
            </CancelButton>
            <SubmitButton
              onClick={() => handleSubmit()}
              ref={submitBtnRef}
              onKeyDown={(e) => {
                if (e.keyCode === 9) {
                  e.preventDefault();
                  cancelBtnRef.current.focus();
                }
              }}
            >
              {submitMessage}
            </SubmitButton>
          </div>
        </Confirm>
      )}
    </>
  );
}

const Confirm = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 252px;
  border-radius: 10px;
  background-color: #fff;
  z-index: 999;
  :focus {
    outline: none;
  }
`;
const ConfirmMessage = styled.h2`
  padding: 22px 0;
  border-bottom: 0.5px solid #dbdbdb;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
`;
const CancelButton = styled.button`
  background-color: transparent;
  border-right: 0.5px solid #dbdbdb;
  border-radius: 0 0 0 10px;
  width: 50%;
  padding: 14px 0;
  :hover {
    background-color: var(--color-sub);
  }
  :focus {
    outline: none;
    background-color: var(--color-sub);
  }
`;
const SubmitButton = styled.button`
  background-color: transparent;
  border-right: 0.5px solid #dbdbdb;
  border-radius: 0 0 10px 0;
  color: var(--color-primary);
  width: 50%;
  padding: 14px 0;
  :hover {
    background-color: var(--color-sub);
  }
  :focus {
    outline: none;
    background-color: var(--color-sub);
  }
`;

export default ConfirmModal;
