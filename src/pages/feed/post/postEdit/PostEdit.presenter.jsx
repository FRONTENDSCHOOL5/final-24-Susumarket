import React from "react";
import NewTopHeader from "../../../../components/commons/newTopHeader/NewTopHeader";
import defaultImg from "../../../../img/ProfileImg.svg";
import noImg from "../../../../img/no-image.svg";
import defaultImgWebp from "../../../../img/webp/ProfileImg.webp";
import noImgWebp from "../../../../img/webp/no-image.webp";
import InvalidPage from "../../../../components/commons/inValidPage/InvaliPage";
import Loading from "../../../../components/commons/loading/Loading";
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
import { resolveWebp } from "../../../../library/checkWebpSupport";

const PostEditPresenter = ({
  isInvalidPage,
  isLoading,
  profileImage,
  postContent,
  disabled,
  imgArray,
  textRef,
  fileInputRef,
  handleTextAreaHeight,
  handleDeleteImage,
  handleImageChange,
  handlePostEdit,
  handleFileButton,
  setPostContent,
}) => {
  return (
    <>
      <NewTopHeader
        left="back"
        right="upload"
        onClickButton={handlePostEdit}
        title="수수마켓 게시글 수정"
        disabled={disabled}
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
                  ? resolveWebp(defaultImgWebp, defaultImg)
                  : profileImage
              }
              alt="프로필 사진"
              onError={(e) => {
                e.target.src = resolveWebp(defaultImgWebp, defaultImg);
              }}
            />
            <TextArea
              placeholder="게시글 입력하기..."
              ref={textRef}
              value={postContent}
              onInput={handleTextAreaHeight}
              onChange={(e) => setPostContent(e.target.value)}
              rows="1"
              aria-label = "게시글 입력칸"
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
                    e.target.src = resolveWebp(noImgWebp, noImg);
                  }}
                />
                <Delete onClick={() => handleDeleteImage(index)}></Delete>
              </div>
            ))}
          </UploadImgArea>
          <PostImgButton onClick={handleFileButton} aria-label = "이미지 선택 버튼"></PostImgButton>
        </>
      )}
    </>
  );
};

export default PostEditPresenter;
