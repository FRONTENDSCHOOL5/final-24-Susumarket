import React, { useRef, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../hook/useAuth";
import { imgValidation } from "../../../../library/imgValidation";
import { postDetailAPI } from "../../../../API/postAPI";
import { postEditAPI } from "../../../../API/postAPI";
import { mutiImgUploadAPI } from "../../../../API/imgUploadAPI";
import PostEditPresenter from "./PostEdit.presenter";

const PostEditContainer = () => {
  const textRef = useRef();
  const fileInputRef = useRef(null);

  // 사용자의 입력에 따른 textarea 자동 조절
  const handleTextAreaHeight = useCallback(() => {
    textRef.current.style.height = "auto";
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  }, []);
  const [isInvalidPage, setIsInValidPage] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [postContent, setPostContent] = useState("");
  const [accountname, setAccountname] = useState("");
  const [imgFiles, setImgFiles] = useState([]);
  const [postImages, setPostImages] = useState([]);
  const [imgArray, setImgArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { postId } = useParams();
  const myProfile = useAuth();

  // 이미지 내 X버튼 클릭 시 미리보기, API 전송 이미지 모두 삭제 처리
  const handleDeleteImage = useCallback(
    (id) => {
      const updatedImgArray = imgArray.filter((_, index) => index !== id);
      setImgArray(updatedImgArray);
      const updatedPostArray = postImages.filter((_, index) => index !== id);
      setPostImages(updatedPostArray);
      const updateFileImg = imgFiles.filter((_, index) => index !== id);
      setImgFiles(updateFileImg);
    },
    [imgArray, postImages, imgFiles],
  );

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await postDetailAPI(postId);

        // 게시물의 텍스트 설정
        setPostContent(postData.content);
        setAccountname(postData.author.accountname);
        setProfileImage(postData.author.image);
        if (postData.image !== "") {
          setPostImages(postData.image.toString().split(","));
          setImgArray(postData.image.toString().split(","));
        }
        setIsInValidPage(false);
        setIsLoading(false);
      } catch (error) {
        setIsInValidPage(true);
        console.error(error);
      }
    };

    if (myProfile) {
      fetchPost();
    }
  }, [postId, myProfile]);

  useEffect(() => {
    if (myProfile && myProfile.accountname !== accountname && accountname) {
      alert("잘못된 접근입니다!");
      navigate("/profile");
    }
  }, [accountname]);

  // 이미지 변경 사항 확인 후, 상태 변경
  const handleImageChange = useCallback(
    (e) => {
      if (imgArray.length > 2) {
        alert("이미지 파일은 3개 까지 등록 가능합니다!");
        return;
      }
      const file = e.target.files[0];
      const valid = imgValidation(file);
      if (!valid) return;
      const currentFileUrl = URL.createObjectURL(file);
      setImgArray((prev) => [...prev, currentFileUrl]);
      setImgFiles((prev) => [...prev, file]);
    },
    [imgArray],
  );

  const uploadImages = async () => {
    console.log(imgFiles);
    if (imgFiles.length === 0) return [...postImages];
    const formData = new FormData();

    for (let i = 0; i < imgFiles.length; i++) {
      formData.append("image", imgFiles[i]);
    }

    try {
      const imageURLs = await mutiImgUploadAPI(formData); // 이미지 업로드 함수 호출
      return [...postImages, imageURLs]; // 기존 postImages 배열에 업로드된 이미지 URL 추가하여 반환
    } catch (error) {
      console.error(error);
    }
  };

  // // 게시글 수정 api
  const handlePostEdit = useCallback(async () => {
    const imgUrls = await uploadImages();
    await postEditAPI(postId, postContent, imgUrls);
    navigate("/profile");
  }, [postId, postContent, uploadImages]);

  const handleFileButton = useCallback(() => {
    fileInputRef.current.click();
  }, []);

  const navigate = useNavigate();

  return (
    <PostEditPresenter
      isInvalidPage={isInvalidPage}
      isLoading={isLoading}
      profileImage={profileImage}
      postContent={postContent}
      accountname={accountname}
      imgArray={imgArray}
      textRef={textRef}
      fileInputRef={fileInputRef}
      handleTextAreaHeight={handleTextAreaHeight}
      handleDeleteImage={handleDeleteImage}
      handleImageChange={handleImageChange}
      handlePostEdit={handlePostEdit}
      handleFileButton={handleFileButton}
      setPostContent={setPostContent}
    />
  );
};

export default PostEditContainer;
