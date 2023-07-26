import React, { useRef, useCallback, useEffect, useState } from "react";
import NewTopHeader from "../../../../components/commons/newTopHeader/NewTopHeader";
import defaultImg from "../../../../img/ProfileImg.svg";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import profileImg from "../../../../img/ProfileImg.svg";
import noImg from "../../../../img/no-image.png";
import useAuth from "../../../../hook/useAuth";
import { imgValidation } from "../../../../library/imgValidation";
import InvalidPage from "../../../../components/commons/inValidPage/InvaliPage";
import Loading from "../../../../components/commons/loading/Loading";
import { postDetailAPI } from "../../../../API/postAPI";
import { postEditAPI } from "../../../../API/postAPI";
import {
  PostImgButton,
  UploadMain,
  ProfileImgLabel,
  ProfileImg,
  TextArea,
  PostImgLabel,
  PostImgInput,
  Delete,
  PostImg,
  UploadImgArea,
} from "./postEdit.style";
import { mutiImgUploadAPI } from "../../../../API/imgUploadAPI";

export default function PostEdit() {
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
    <>
      <NewTopHeader
        left="back"
        right="upload"
        // disabled
        onClickButton={handlePostEdit}
        title="수수마켓 게시글 수정"
      ></NewTopHeader>
      {isLoading ? (
        <Loading />
      ) : isInvalidPage ? (
        <InvalidPage text={"존재하지 않는 게시물입니다."} size={"large"} />
      ) : (
        <>
          <UploadMain>
            <ProfileImgLabel></ProfileImgLabel>
            <ProfileImg
              src={
                profileImage && profileImage.endsWith("Ellipse.png")
                  ? defaultImg
                  : profileImage
              }
              alt="프로필 사진"
              onError={(e) => {
                e.target.src = profileImg;
              }}
            />
            <TextArea
              placeholder="게시글 입력하기..."
              ref={textRef}
              value={postContent}
              onInput={handleTextAreaHeight}
              onChange={(e) => setPostContent(e.target.value)}
              rows="1"
            ></TextArea>
            <PostImgLabel htmlFor="input-file"></PostImgLabel>
            <PostImgInput
              type="file"
              multiple="multiple"
              id="input-file"
              ref={fileInputRef}
              onChange={handleImageChange}
            ></PostImgInput>
          </UploadMain>
          <h2 className="a11y-hidden">포스팅 이미지 섹션</h2>
          <UploadImgArea>
            {imgArray.map((image, index) => (
              <div key={index}>
                <PostImg
                  key={index}
                  src={image}
                  alt={`Image ${index}`}
                  onError={(e) => {
                    e.target.src = noImg;
                  }}
                />
                <Delete onClick={() => handleDeleteImage(index)}></Delete>
              </div>
            ))}
          </UploadImgArea>
          <PostImgButton onClick={handleFileButton}></PostImgButton>
        </>
      )}
    </>
  );
}
