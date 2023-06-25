import React, { useRef, useCallback, useEffect, useState } from "react";
import NewTopHeader from "../../../../components/commons/newTopHeader/NewTopHeader";
import styled from "styled-components";
import imgUploadBtn from "../../../../img/upload-file.svg";
import { customAxios } from "../../../../library/customAxios";
import defaultImg from "../../../../img/ProfileImg.svg";
import { useParams } from "react-router-dom";
import xbutton from "../../../../img/x.svg";
import { useNavigate } from "react-router-dom";
import profileImg from "../../../../img/ProfileImg.svg";
import noImg from "../../../../img/symbol-logo-404.svg";

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

  // 사용자의 입력에 따른 textarea 자동 조절
  const handleTextAreaHeight = useCallback(() => {
    textRef.current.style.height = "auto";
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  }, []);

  const [profileImage, setProfileImage] = useState(null);
  const [postContent, setPostContent] = useState("");
  const [accountname, setAccountname] = useState("");
  const [imgFiles, setImgFiles] = useState([]);
  const [postImages, setPostImages] = useState([]);
  const [imgArray, setImgArray] = useState([]);

  const { postId } = useParams();

  // 게시글 목록 불러오기
  useEffect(() => {
    const fetchPostList = async () => {
      try {
        await customAxios.get(`post/${accountname}/userpost`);
      } catch (error) {
        console.error(error);
      }
    };
    if (accountname) {
      fetchPostList();
    }
  }, [accountname]);

  // 이미지 내 X버튼 클릭 시 미리보기, API 전송 이미지 모두 삭제 처리
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

  // 선택한 게시글 불러오기
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await customAxios.get(`post/${postId}`);
        const postData = response.data;

        // 게시물의 텍스트 설정
        setPostContent(postData.post.content);
        setAccountname(postData.post.author.accountname);
        setProfileImage(postData.post.author.image);
        if (postData.post.image !== "") {
          setPostImages(response.data.post.image.toString().split(","));
          setImgArray(response.data.post.image.toString().split(","));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  }, [postId]);

  // 이미지 변경 사항 확인 후, 상태 변경
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const currentFileUrl = URL.createObjectURL(file);
    setImgArray((prev) => [...prev, currentFileUrl]);
    setImgFiles((prev) => [...prev, file]);
  };

  // 다중 이미지 업로드
  const uploadImages = async () => {
    if (imgFiles.length === 0) return [...postImages];
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
      let filenames = [];
      for (let i = 0; i < response.data.length; i++) {
        filenames.push(
          `${process.env.REACT_APP_BASE_URL}/${response.data[i].filename}`,
        );
      }
      // setPostImages((prev) => [...prev, filenames.join(",")]);
      return [...postImages, filenames.join(",")];
      // onClickNextPage();
    } catch (error) {
      console.error(error);
    }
  };

  // 게시글 수정 API
  const uploadPostEdit = async (imgUrls) => {
    try {
      await customAxios.put(`post/${postId}`, {
        post: {
          content: postContent,
          image: imgUrls.join(","),
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  // // 게시글 수정 api
  const handlePostEdit = async () => {
    const imgUrls = await uploadImages();
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
        title = "수수마켓 게시글 수정"
      ></NewTopHeader>
      <UploadMain>
        <ProfileImgLabel></ProfileImgLabel>
        <ProfileImg
          src={profileImage || defaultImg}
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
  );
}
