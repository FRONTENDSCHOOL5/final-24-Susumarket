import React, { useRef, useCallback, useEffect, useState } from "react";
import NewTopHeader from "../../../../components/commons/newTopHeader/NewTopHeader";
import styled from "styled-components";
import imgUploadBtn from "../../../../img/upload-file.svg";
import { customAxios } from "../../../../library/customAxios";
import defaultImg from "../../../../img/ProfileImg.svg";
import { useParams } from "react-router-dom";
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
`;

const ProfileImgLabel = styled.label``;

const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  background-color: var(--color-sub);
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

const UploadImgArea = styled.section`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 30px;
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

export default function PostEdit() {
  const textRef = useRef();
  const fileInputRef = useRef(null);

  const baseUrl = process.env.REACT_APP_BASE_URL;

  // const params = useParams();
  // const accountname = params.userId;

  // 텍스트 사용자의 입력에 따른 자동 조절
  const handleTextAreaHeight = useCallback(() => {
    textRef.current.style.height = "auto";
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  }, []);

  const [profileImage, setProfileImage] = useState(null);
  const [postContent, setPostContent] = useState("");
  const [imgFiles, setImgFiles] = useState([]);
  const [postImages, setPostImages] = useState([]);
  const [imgArray, setImgArray] = useState([]);

  const { postId } = useParams();

  // 프로필 이미지 불러오기
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

  useEffect(() => {
    const fetchPostList = async () => {
      const accountname = localStorage.getItem("account");
      console.log(accountname);
      try {
        const response = await customAxios.get(`post/${accountname}/userpost`);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPostList();
  }, []);

  const handleDeleteImage = (id) => {
    // setPostImages(postImages.filter((_, index) => index !== id));
    // setImgArray((prevPreviewImages) =>
    //   prevPreviewImages.filter((_, index) => index !== id),
    // );
    const updatedImgArray = imgArray.filter((_, index) => index !== id);
    setImgArray(updatedImgArray);
    const updatedPostArray = postImages.filter((_, index) => index !== id);
    setPostImages(updatedPostArray);
  };

  // 게시글 불러오기
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await customAxios.get(`post/${postId}`);
        const postData = response.data;
        console.log(postData);

        // 게시물의 텍스트 설정
        setPostContent(postData.post.content);
        if (postData.post.image !== "") {
          setPostImages(response.data.post.image.toString().split(","));
          setImgArray(response.data.post.image.toString().split(","));
        }

        console.log(response.data.post.image.toString().split(","));
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const currentFileUrl = URL.createObjectURL(file);
    setImgArray((prev) => [...prev, currentFileUrl]);
    setImgFiles((prev) => [...prev, file]);
  };

  // 다중 이미지 업로드
  const uploadImages = async () => {
    if (imgFiles.length === 0) return [...postImages];
    console.log("이미지 파일 : ", imgFiles);
    const formData = new FormData();

    for (let i = 0; i < imgFiles.length; i++) {
      formData.append("image", imgFiles[i]);
    }

    try {
      const response = await customAxios.post("image/uploadfiles", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      console.log("업로드한 이미지 : ", response.data);
      let filenames = [];
      for (let i = 0; i < response.data.length; i++) {
        filenames.push(
          `${process.env.REACT_APP_BASE_URL}/${response.data[i].filename}`,
        );
      }
      console.log("업로드한 이미지 파일명 : ", filenames);
      // setPostImages((prev) => [...prev, filenames.join(",")]);
      return [...postImages, filenames.join(",")];
      // onClickNextPage();
    } catch (error) {
      console.error(error);
    }
  };

  const uploadPostEdit = async (imgUrls) => {
    try {
      const response = await customAxios.put(`post/${postId}`, {
        post: {
          content: postContent,
          image: imgUrls.join(","),
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // // 게시글 수정 api
  const handlePostEdit = async () => {
    const imgUrls = await uploadImages();
    console.log("업로드 포스트 이미지 : ", postImages);
    await uploadPostEdit(imgUrls);
    navigate("/profile");
  };

  const handleFileButton = () => {
    fileInputRef.current.click();
  };

  const navigate = useNavigate();

  return (
    <>
      <NewTopHeader
        left="back"
        right="upload"
        // disabled
        onClickButton={handlePostEdit}
      ></NewTopHeader>
      <UploadMain>
        <ProfileImgLabel></ProfileImgLabel>
        <ProfileImg src={profileImage || defaultImg} alt="프로필 사진" />
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
            <PostImg key={index} src={image} alt={`Image ${index}`} />
            <Delete onClick={() => handleDeleteImage(index)}></Delete>
          </div>
        ))}
      </UploadImgArea>
      <PostImgButton onClick={handleFileButton}></PostImgButton>
    </>
  );
}
