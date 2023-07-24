import React, { useState, useRef, useEffect, useCallback } from "react";
import defaultImg from "../../../../img/ProfileImg.svg";
import { useNavigate } from "react-router-dom";
import NewTopHeader from "../../../../components/commons/newTopHeader/NewTopHeader";
import { imgValidation } from "../../../../library/imgValidation";
import { postUploadAPI } from "../../../../API/postAPI";
import { mutiImgUploadAPI } from "../../../../API/imgUploadAPI";
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
  UploadImgAreaTitle,
} from "./postUpload.style";
import { loadProfileImageAPI } from "../../../../API/profileAPI";

export default function PostUpload() {
  const [profileImage, setProfileImage] = useState(null);
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const fileInputRef = useRef();
  const textRef = useRef();

  // 게시글 사용자 입력 글자수에 따른 textarea 줄 바꿈 처리
  const handleTextAreaHeight = useCallback(() => {
    textRef.current.style.height = "auto";
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  }, []);

  // 나의 프로필 사진 API에서 가져오기
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
    const formData = new FormData();

    for (let i = 0; i < images.length; i++) {
      formData.append("image", images[i]);
    }

    try {
      const imageURLs = await mutiImgUploadAPI(formData); // 이미지 업로드 함수 호출
      return imageURLs;
    } catch (error) {
      console.error(error);
    }
  };

  //탑헤더 업로드 버튼 클릭 시, 이미지 업로드 후 이미지와 게시글을 전체 업로드, 다음 페이지로 넘어가도록 연결
  const handleUploadWholePost = async () => {
    const images = await uploadImages();
    // await uploadPost(images); - 삭제 o
    await postUploadAPI({
      post: {
        content: text,
        image: images,
      },
    });
    onClickNextPage();
  };

  // 이미지 UI 화면에서 미리보기 설정
  const handleFileUpload = (e) => {
    const files = e.target.files[0];

    const valid = imgValidation(files);
    if (!valid) return;
    const currentFileUrl = URL.createObjectURL(files);
    setPreviewImages((prev) => [...prev, currentFileUrl]); //덮어씌워지지 않게 하기 위해 prev 사용
    setImages((prev) => [...prev, files]);
    console.log(files);
  };

  // 이미지 내 X버튼 클릭 시 미리보기 이미지 및 실제 API 전송 위한 이미지 모두 삭제됨
  const handleDeleteImage = (id) => {
    setImages(images.filter((_, index) => index !== id));
    setPreviewImages((prevPreviewImages) =>
      prevPreviewImages.filter((_, index) => index !== id),
    );
  };

  // 이미지 업로드 버튼
  const handleFileButton = () => {
    fileInputRef.current.click();
  };

  // 게시글과 이미지가 모두 없는 경우 탑헤더 업로드 버튼 disable 처리
  const UploadBtnDisable = () => {
    if (text === "" && images.length === 0) {
      return true;
    }
    return false;
  };

  // 탑헤더 업로드 버튼 클릭 시 프로필 페이지로 이동
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
        title="수수마켓 게시글 업로드"
      ></NewTopHeader>
      <UploadMain>
        <ProfileImgLabel></ProfileImgLabel>
        <ProfileImg
          src={
            profileImage && profileImage.endsWith("Ellipse.png")
              ? defaultImg
              : profileImage
          }
          alt="프로필 사진"
          onError={(e) => (e.target.src = defaultImg)}
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
        <UploadImgAreaTitle className="a11y-hidden">
          이미지 업로드
        </UploadImgAreaTitle>
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