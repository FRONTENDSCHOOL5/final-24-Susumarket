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
  const [disabled, setDisabled] = useState(true);
  const [data, setData] = useState(null);
  const { postId } = useParams();
  const myProfile = useAuth();

  // 이미지 내 X버튼 클릭 시 미리보기, API 전송 이미지 모두 삭제 처리
  const handleDeleteImage = useCallback(
    (id) => {
      setImgArray((prev) => prev.filter((_, index) => index !== id));
      setPostImages((prev) => prev.filter((_, index) => index !== id));
      setImgFiles((prev) => prev.filter((_, index) => index !== id));
    },
    [imgArray, postImages, imgFiles],
  );

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await postDetailAPI(postId);
        setData(postData);
        // 게시물의 텍스트 설정
        setPostContent(postData.content);
        setAccountname(postData.author.accountname);
        setProfileImage(postData.author.image);
        if (postData.image !== "") {
          setPostImages(postData.image.toString().split(","));
          setImgArray(postData.image.toString().split(","));
          // 기존 이미지 배열과 요소의 길이를 맞춰주기 위해 공백 문자 삽입
          setImgFiles(
            postData.image
              .toString()
              .split(",")
              .map((_) => ""),
          );
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

  useEffect(() => {
    if (!postContent && !imgArray.length) {
      setDisabled(true);
      return;
    }
    if (data) {
      const prevPostContent = data.content;
      const prevImgArray = data.image.toString().split(",");
      if (
        postContent !== prevPostContent ||
        JSON.stringify(imgArray) !==
          JSON.stringify(prevImgArray[0] === "" ? [] : prevImgArray)
      ) {
        setDisabled(false);
      } else if (
        postContent === prevPostContent &&
        JSON.stringify(imgArray) ===
          JSON.stringify(prevImgArray[0] === "" ? [] : prevImgArray)
      ) {
        setDisabled(true);
      }
    }
  }, [postContent, imgArray, data]);

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
    // 비어있는 이미지파일 제거
    for (const i in imgFiles) {
      if (imgFiles[i] === "") {
        imgFiles.splice(i, 1);
      }
    }

    try {
      const imageURLs = await mutiImgUploadAPI(imgFiles); // 이미지 업로드 함수 호출
      if (!imageURLs) return [...postImages];
      return [...postImages, imageURLs]; // 기존 postImages 배열에 업로드된 이미지 URL 추가하여 반환
    } catch (error) {
      console.error(error);
    }
  };

  // // 게시글 수정 api
  const handlePostEdit = async () => {
    const imgUrls = await uploadImages();
    await postEditAPI(postId, postContent, imgUrls);
    navigate("/profile");
  };

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
      imgArray={imgArray}
      textRef={textRef}
      fileInputRef={fileInputRef}
      handleTextAreaHeight={handleTextAreaHeight}
      handleDeleteImage={handleDeleteImage}
      handleImageChange={handleImageChange}
      handlePostEdit={handlePostEdit}
      handleFileButton={handleFileButton}
      setPostContent={setPostContent}
      disabled={disabled}
    />
  );
};

export default PostEditContainer;
