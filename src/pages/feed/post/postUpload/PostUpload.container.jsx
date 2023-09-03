import React, { useState, useRef, useEffect, useCallback } from "react";

import { imgValidation } from "../../../../library/imgValidation";
import { postUploadAPI } from "../../../../API/postAPI";
import { mutiImgUploadAPI } from "../../../../API/imgUploadAPI";
import { loadProfileImageAPI } from "../../../../API/profileAPI";
import { useNavigate } from "react-router-dom";
import PostUploadUI from "./PostUpload.presenter";
import { uploadImgCompression } from "../../../../library/imgCompression";

const PostUploadContainer = () => {
  const [profileImage, setProfileImage] = useState("");
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const fileInputRef = useRef();
  const textRef = useRef();
  const navigate = useNavigate();

  const handleTextAreaHeight = useCallback(() => {
    textRef.current.style.height = "auto";
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  }, []);

  useEffect(() => {
    const loadProfileImage = async () => {
      try {
        const response = await loadProfileImageAPI();
        setProfileImage(response);
      } catch (error) {
        console.error(error);
      }
    };
    loadProfileImage();
  }, []);

  const uploadImages = async () => {
    try {
      const imageURLs = await mutiImgUploadAPI(images);
      return imageURLs;
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileUpload = async (e) => {
    const files = e.target.files[0];
    const valid = imgValidation(files);
    if (!valid) return;
    // 이미지 압축후 이미지 (압축한 blob이미지, 미리보기 이미지) 반환
    const { compressedFileBlob, preview } = await uploadImgCompression(files);
    // blob이미지 file 형식으로 변환
    const compressedFile = new File([compressedFileBlob], files.name, {
      type: files.type,
    });
    // 압축 이미지 미리보기 적용
    setPreviewImages((prev) => [...prev, preview]);
    // 업로드할 압축 이미지 적용
    setImages((prev) => [...prev, compressedFile]);
  };

  const handleDeleteImage = (id) => {
    setImages((prevImages) => prevImages.filter((_, index) => index !== id));
    setPreviewImages((prevPreviewImages) =>
      prevPreviewImages.filter((_, index) => index !== id),
    );
  };

  const handleFileButton = () => {
    fileInputRef.current.click();
  };

  const handleUploadWholePost = async () => {
    const images = await uploadImages();
    await postUploadAPI({
      post: {
        content: text,
        image: images,
      },
    });
    onClickNextPage();
  };

  const onClickNextPage = () => {
    navigate(`/profile`);
  };

  return (
    profileImage&&<PostUploadUI
      profileImage={profileImage}
      text={text}
      images={images}
      previewImages={previewImages}
      fileInputRef={fileInputRef}
      textRef={textRef}
      handleTextAreaHeight={handleTextAreaHeight}
      handleFileUpload={handleFileUpload}
      handleDeleteImage={handleDeleteImage}
      handleFileButton={handleFileButton}
      handleUploadWholePost={handleUploadWholePost}
      onClickNextPage={onClickNextPage}
      setText={setText}
    />
  );
};

export default PostUploadContainer;
