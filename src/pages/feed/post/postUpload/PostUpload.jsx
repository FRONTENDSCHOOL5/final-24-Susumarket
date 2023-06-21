import UploadTopHeader from "../../../../components/commons/topHeader/UploadTopHeader";
import imgUploadBtn from "../../../../img/upload-file.svg";
import styled from "styled-components";
import { useRef, useEffect, useState } from "react";
import { useCallback } from "react";
import defaultImg from "../../../../img/ProfileImg.svg";
import { customAxios } from "../../../../library/customAxios";
import xbutton from "../../../../img/x.svg";
import { useNavigate } from "react-router-dom";

const PostImgButton = styled.button`
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
  align-items: flex-start;
`;

const ProfileImgLabel = styled.label``;

const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  // background-color: var(--color-sub);
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

const Delete = styled.button`
  background: url(${xbutton});
  width: 20px;
  height: 20px;
  z-index: 999;
  position: absolute;
  margin-left: -35px;
  margin-top: 5px;
`;

const PostImg = styled.img`
  width: 304px;
  height: 220px;
  border-radius: 20px;
  margin-left: 30px;
  position: relative;
`;

const UploadImgArea = styled.section`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 30px;
`;

export default function PostUpload() {
  const textRef = useRef();
  const fileInputRef = useRef(null);
  const handleTextAreaHeight = useCallback(() => {
    textRef.current.style.height = "auto";
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  }, []);

  const [textLength, setTextLength] = useState("");

  const handleTextLength = (e) => {
    const value = e.target.value;
    setTextLength(value);
  };

  const [profileImage, setProfileImage] = useState(null);
  const [showPostImages, setShowPostImages] = useState([]);

  useEffect(() => {
    const loadProfileImage = async () => {
      try {
        const response = await customAxios.get(`user/myinfo`);
        setProfileImage(response.data.user.image);
      } catch (error) {
        console.error(error);
      }
    };
    loadProfileImage();
  }, []);

  const handleFileUpload = async (e) => {
    const files = e.target.files;
    let fileLists = [...showPostImages];

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      if (files[i].type.startsWith("image/")) {
        formData.append("files", files[i]);
        const currentFileUrl = URL.createObjectURL(files[i]);
        fileLists.push(currentFileUrl);
      } else {
        alert("이미지 파일 형식이 아닙니다!");
      }
    }
    if (fileLists.length > 3) {
      fileLists = fileLists.slice(0, 3);
      alert("이미지는 최대 3개까지 업로드 가능합니다:)");
    }
    setShowPostImages(fileLists);

    try {
      const response = await customAxios.post("image/uploadfiles", formData);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePostButton = () => {
    fileInputRef.current.click();
  };

  const handleDeleteImage = (id) => {
    setShowPostImages(showPostImages.filter((_, index) => index !== id));
  };

  const handleUploadButton = async () => {
    const text = textRef.current.value;
    const files = fileInputRef.current.files;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    formData.append("text", text);

    try {
      const response = await customAxios.post("image/uploadfiles", formData);
      console.log(response);
      onClickNextPage();
    } catch (error) {
      console.error(error);
    }
  };

  const UploadBtnDisable = () => {
    if (textLength === "" && showPostImages.length === 0) {
      return true;
    }
    return false;
  };

  const navigate = useNavigate();
  const onClickNextPage = () => {
    navigate("/profile/:userId");
  };

  return (
    <>
      <UploadTopHeader
        onClickUpload={handleUploadButton}
        disabled={UploadBtnDisable()}
      ></UploadTopHeader>
      <UploadMain>
        <ProfileImgLabel></ProfileImgLabel>
        <ProfileImg src={profileImage || defaultImg} alt="프로필 사진" />
        <TextArea
          ref={textRef}
          placeholder="게시글 입력하기..."
          onInput={handleTextAreaHeight}
          onChange={handleTextLength}
          value={textLength}
          rows="1"
        ></TextArea>
        <PostImgLabel htmlFor="input-file"></PostImgLabel>
        <PostImgInput
          type="file"
          multiple="multiple"
          id="input-file"
          ref={fileInputRef}
          onChange={handleFileUpload}
        ></PostImgInput>
      </UploadMain>
      <UploadImgArea>
        {showPostImages.map((image, id) => (
          <div key={id}>
            <PostImg src={image} alt={`${image}-${id}`} />
            <Delete onClick={() => handleDeleteImage(id)} />
          </div>
        ))}
      </UploadImgArea>
      <PostImgButton onClick={handlePostButton}></PostImgButton>
    </>
  );
}