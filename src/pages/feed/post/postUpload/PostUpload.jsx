import UploadTopHeader from "../../../../components/commons/topHeader/UploadTopHeader";
import imgUploadBtn from "../../../../img/upload-file.svg";
import styled from "styled-components";
import TopButton from "../../../../components/commons/topButton/TopButton";
import { useRef } from "react";
import { useCallback } from "react";

const UpLoadButton = styled.button`
  // top: 70%;
  position: fixed;
  bottom: 70px;
  right: 40px;
  width: 50px;
  height: 50px;
  background: url(${imgUploadBtn}) no-repeat;
  background-position: 0 0;
`;

const UploadMain = styled.main`
  display: flex;
  flex-direction: row;
`;

const ProfileImgLabel = styled.label``;

const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  background-color: var(--color-sub);
  margin-left: 20px;
  margin-top: 20px;
`;

const TextArea = styled.textarea`
  font-size: 15px;
  width: calc(85% - 90px);
  outline: none;
  border: none;
  resize: none;
  margin-left: 20px;
  margin-top: 35px;
`;
const PostImgLabel = styled.label`
  margin-top: 10px;
`;

const PostImgInput = styled.input`
  display: none;
`;

export default function PostUpload() {
  const textRef = useRef();
  const handleTextAreaHeight = useCallback(() => {
    textRef.current.style.height = "auto";
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  }, []);

  return (
    <>
      <UploadTopHeader disabled></UploadTopHeader>
      <UploadMain>
        <ProfileImgLabel></ProfileImgLabel>
        <ProfileImg />
        <TextArea
          ref={textRef}
          placeholder="게시글 입력하기..."
          onInput={handleTextAreaHeight}
          rows="1"
        ></TextArea>
        <PostImgLabel htmlFor="input-file"></PostImgLabel>
        <PostImgInput
          type="file"
          multiple="multiple"
          id="input-file"
        ></PostImgInput>
      </UploadMain>
      <UpLoadButton disabled></UpLoadButton>
      <TopButton></TopButton>
    </>
  );
}
