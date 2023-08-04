import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import defaultImg from "../../../../img/ProfileImg.svg";
import { imgValidation } from "../../../../library/imgValidation";
import { postUploadAPI } from "../../../../API/postAPI";
import { mutiImgUploadAPI } from "../../../../API/imgUploadAPI";
import { loadProfileImageAPI } from "../../../../API/profileAPI";
import { useNavigate } from "react-router-dom";
import PostUploadUI from "./PostUpload.presenter";

const PostUploadContainer = () => {
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
    <PostUploadUI
      profileImageSrc={profileImageSrc}
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
      UploadBtnDisable={UploadBtnDisable}
      onClickNextPage={onClickNextPage}
      setText={setText}
    />
  );
};

export default PostUploadContainer;