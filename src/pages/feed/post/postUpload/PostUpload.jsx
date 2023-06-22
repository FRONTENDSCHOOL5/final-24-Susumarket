import React, { useState, useRef, useEffect } from "react";
import { customAxios } from "../../../../library/customAxios";
import UploadTopHeader from "../../../../components/commons/topHeader/UploadTopHeader";
import imgUploadBtn from "../../../../img/upload-file.svg";
import styled from "styled-components";
import xbutton from "../../../../img/x.svg";
import defaultImg from "../../../../img/ProfileImg.svg";
import { useCallback } from "react";
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

export default function Post() {
  const [profileImage, setProfileImage] = useState(null);
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const fileInputRef = useRef();
  const textRef = useRef();
  const handleTextAreaHeight = useCallback(() => {
    textRef.current.style.height = "auto";
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  }, []);

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

  // const handleUploadImages = async () => {
  //   const files = fileInputRef.current.files;
  //   const formData = new FormData();

  //   // 이미지 파일을 formData에 추가
  //   for (let i = 0; i < files.length; i++) {
  //     if (files[i].type.startsWith("image/")) {
  //       formData.append("files", files[i]);
  //     } else {
  //       alert("이미지 파일 형식이 아닙니다!");
  //     }
  //   }

  //   try {
  //     const response = await customAxios.post("/image/uploadfiles", formData);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleUploadWholePost = async () => {
    const formData = new FormData();

    // 텍스트를 formData에 추가
    formData.append("post[content]", text);

    // 이미지 파일 이름을 배열에 저장
    const imageNames = images.map((image) => image.name);
    // 이미지 URL 문자열을 formData에 추가
    const imageUrls = imageNames.join(",");
    formData.append("post[image]", imageUrls);

    try {
      const response = await customAxios.post("/post", formData);
      console.log(response);
      onClickNextPage();
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;
    let fileLists = [...images];
    let previewFileLists = [...previewImages];

    for (let i = 0; i < files.length; i++) {
      if (files[i].type.startsWith("image/")) {
        const currentFileUrl = URL.createObjectURL(files[i]);
        fileLists.push(files[i]);
        previewFileLists.push(currentFileUrl);
        // 최대 3개까지 업로드 가능하도록 제한
        if (fileLists.length > 3) {
          fileLists = fileLists.slice(0, 3);
          previewFileLists = previewFileLists.slice(0, 3);
          alert("이미지는 최대 3개까지 업로드 가능합니다:)");
        }
      } else {
        alert("이미지 파일 형식이 아닙니다!");
      }
    }
    setImages(fileLists);
    setPreviewImages(previewFileLists);
  };

  const handleDeleteImage = (id) => {
    setImages(images.filter((_, index) => index !== id));
    setPreviewImages((prevPreviewImages) =>
      prevPreviewImages.filter((_, index) => index !== id),
    );
  };

  const handleFileButton = () => {
    fileInputRef.current.click();
  };

  const UploadBtnDisable = () => {
    if (text === "" && images.length === 0) {
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
        onClickUpload={handleUploadWholePost}
        disabled={UploadBtnDisable()}
      ></UploadTopHeader>
      <UploadMain>
        <ProfileImgLabel></ProfileImgLabel>
        <ProfileImg src={profileImage || defaultImg} alt="프로필 사진" />
        <TextArea
          ref={textRef}
          placeholder="게시글 입력하기..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onInput={handleTextAreaHeight}
          rows="1"
        />
      </UploadMain>
      {/* <button onClick={handleUploadImages}>이미지 업로드</button> */}
      <PostImgLabel htmlFor="input-file"></PostImgLabel>
      <PostImgInput
        type="file"
        multiple
        id="input-file"
        ref={fileInputRef}
        onChange={handleFileUpload}
      />
      <UploadImgArea>
        {previewImages.map((image, id) => (
          <div key={id}>
            <PostImg src={image} alt={`${image}-${id}`} />
            <Delete onClick={() => handleDeleteImage(id)} />
          </div>
        ))}
      </UploadImgArea>
      <PostImgButton onClick={handleFileButton}></PostImgButton>
    </>
  );
}
