import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  memo,
} from "react";
import defaultImg from "../../../../img/ProfileImg.svg";
import { imgValidation } from "../../../../library/imgValidation";
import { postUploadAPI } from "../../../../API/postAPI";
import { mutiImgUploadAPI } from "../../../../API/imgUploadAPI";
import { loadProfileImageAPI } from "../../../../API/profileAPI";
import { useNavigate } from "react-router-dom";
import NewTopHeader from "../../../../components/commons/newTopHeader/NewTopHeader";

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

const UploadImgPreview = memo(({ image, id, handleDeleteImage }) => {
  return (
    <div>
      <PostImg src={image} alt={`${image}-${id}`} />
      <Delete onClick={() => handleDeleteImage(id)} />
    </div>
  );
});

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
        const response = await loadProfileImageAPI();
        setProfileImage(response);
      } catch (error) {
        console.error(error);
      }
    };
    loadProfileImage();
  }, []);

  const uploadImages = useCallback(async () => {
    const formData = new FormData();

    for (let i = 0; i < images.length; i++) {
      formData.append("image", images[i]);
    }

    try {
      const imageURLs = await mutiImgUploadAPI(formData);
      return imageURLs;
    } catch (error) {
      console.error(error);
    }
  }, [images]);

  const handleFileUpload = useCallback((e) => {
    const files = e.target.files[0];

    const valid = imgValidation(files);
    if (!valid) return;
    const currentFileUrl = URL.createObjectURL(files);
    setPreviewImages((prev) => [...prev, currentFileUrl]);
    setImages((prev) => [...prev, files]);
  }, []);

  const handleDeleteImage = useCallback((id) => {
    setImages((prevImages) => prevImages.filter((_, index) => index !== id));
    setPreviewImages((prevPreviewImages) =>
      prevPreviewImages.filter((_, index) => index !== id),
    );
  }, []);

  const handleFileButton = useCallback(() => {
    fileInputRef.current.click();
  }, []);

  const handleUploadWholePost = useCallback(async () => {
    const images = await uploadImages();
    await postUploadAPI({
      post: {
        content: text,
        image: images,
      },
    });
    onClickNextPage();
  }, [uploadImages, text]);

  const UploadBtnDisable = useMemo(() => {
    return text === "" && images.length === 0;
  }, [text, images]);

  const profileImageSrc = useMemo(() => {
    return (
      (profileImage && profileImage.endsWith("Ellipse.png") && defaultImg) ||
      profileImage
    );
  }, [profileImage]);

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
        disabled={UploadBtnDisable}
        title="수수마켓 게시글 업로드"
      ></NewTopHeader>
      <UploadMain>
        <ProfileImgLabel></ProfileImgLabel>
        <ProfileImg
          src={profileImageSrc}
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
          <UploadImgPreview
            key={id}
            image={image}
            id={id}
            handleDeleteImage={handleDeleteImage}
          />
        ))}
      </UploadImgArea>
      <PostImgButton onClick={handleFileButton}></PostImgButton>
    </>
  );
}