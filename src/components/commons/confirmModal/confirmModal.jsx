import React, { useContext } from "react";
import styled from "styled-components";
import { ModalContext } from "../../../context/ModalContext";

function ConfirmModal({
  confirmMessage,
  cancelMessage,
  submitMessage,
  handleSubmit,
}) {
  const { isConfirmModal, SetIsConfirmModal } = useContext(ModalContext);

  const handleCancel = () => {
    SetIsConfirmModal(false);
  };

  return (
    <>
      {isConfirmModal && (
        <Confirm>
          <ConfirmMessage>{confirmMessage}</ConfirmMessage>
          <div>
            <CancelButton onClick={handleCancel}>{cancelMessage}</CancelButton>
            <SubmitButton onClick={() => handleSubmit()}>
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
`;
const SubmitButton = styled.button`
  background-color: transparent;
  color: var(--color-primary);
  width: 50%;
`;

export default ConfirmModal;
