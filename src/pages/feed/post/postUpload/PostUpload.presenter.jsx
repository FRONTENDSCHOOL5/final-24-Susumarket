import React from "react";
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
import defaultImg from "../../../../img/ProfileImg.svg";

const UploadImgPreview = React.memo(({ image, id, handleDeleteImage }) => {
  return (
    <div>
      <PostImg src={image} alt={`${image}-${id}`} />
      <Delete onClick={() => handleDeleteImage(id)} />
    </div>
  );
});

const PostUpload = ({
  profileImageSrc,
  text,
  images,
  previewImages,
  fileInputRef,
  textRef,
  handleTextAreaHeight,
  handleFileUpload,
  handleDeleteImage,
  handleFileButton,
  handleUploadWholePost,
  UploadBtnDisable,
  onClickNextPage,
  setText,
}) => {
  return (
    <>
      <NewTopHeader
        left="back"
        right="upload"
        onClickButton={handleUploadWholePost}
        disabled={UploadBtnDisable}
        title="수수마켓 게시글 업로드"
      />
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
};

export default PostUpload;
