import React, { useState, useRef, useEffect } from "react";
import { customAxios } from "../../../../library/customAxios";

import imgUploadBtn from "../../../../img/upload-file.svg";
import styled from "styled-components";
import xbutton from "../../../../img/x.svg";
import defaultImg from "../../../../img/ProfileImg.svg";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import NewTopHeader from "../../../../components/commons/newTopHeader/NewTopHeader";
import profileImg from "../../../../img/ProfileImg.svg";

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

  // 이미지 업로드
  const uploadImages = async () => {
    const formData = new FormData();

    for (let i = 0; i < images.length; i++) {
      formData.append("image", images[i]);
    }

    try {
      const response = await customAxios.post("image/uploadfiles", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      let filenames = [];
      for (let i = 0; i < response.data.length; i++) {
        filenames.push(
          `${process.env.REACT_APP_BASE_URL}/${response.data[i].filename}`,
        );
      }
      return filenames.join(",");
      // onClickNextPage();
    } catch (error) {
      console.error(error);
    }
  };

  // 이미지 post
  const uploadPost = async (images) => {
    try {
      const response = await customAxios.post("post", {
        post: {
          content: text,
          image: images,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleUploadWholePost = async () => {
    const images = await uploadImages();
    await uploadPost(images);
    onClickNextPage();
  };

  // const handleFileUpload = (e) => {
  //   const files = e.target.files[0];
  //   let filelength = 0;

  //   if (files.type.startsWith("image/")) {
  //     const currentFileUrl = URL.createObjectURL(files);
  //     setPreviewImages((prev) => [...prev, currentFileUrl]); //덮어씌워지지 않게 하기 위해 prev 사용
  //     setImages((prev) => [...prev, files]);
  //     console.log(files);
  //   } else {
  //     alert("이미지 파일 형식이 아닙니다!");
  //   }
  // };

  // 이미지 파일 업로드
  const handleFileUpload = (e) => {
    const files = e.target.files;

    if (files.length + images.length > 3) {
      alert("이미지는 최대 3개까지 업로드 가능합니다:)");
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.type.startsWith("image/")) {
        const currentFileUrl = URL.createObjectURL(file);
        setPreviewImages((prev) => [...prev, currentFileUrl]);
        setImages((prev) => [...prev, file]);
        console.log(file);
      } else {
        alert("이미지 파일 형식이 아닙니다!");
      }
    }
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
    navigate(`/profile`);
  };

  return (
    <>
      <NewTopHeader
        left="back"
        right="upload"
        onClickButton={handleUploadWholePost}
        disabled={UploadBtnDisable()}
      ></NewTopHeader>
      <UploadMain>
        <ProfileImgLabel></ProfileImgLabel>
        <ProfileImg
          src={profileImage || defaultImg}
          alt="프로필 사진"
          onError={(e) => (e.target.src = profileImg)}
        />
        <TextArea
          ref={textRef}
          placeholder="게시글 입력하기..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onInput={handleTextAreaHeight}
          rows="1"
        />
      </UploadMain>
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
