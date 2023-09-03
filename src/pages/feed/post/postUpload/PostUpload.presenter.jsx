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
import defaultImgWebp from "../../../../img/webp/ProfileImg.webp";
import { resolveWebp } from "../../../../library/checkWebpSupport";

const UploadImgPreview = React.memo(({ image, id, handleDeleteImage }) => {
  return (
    <div>
      <PostImg src={image} alt={`${image}-${id}`} />
      <Delete onClick={() => handleDeleteImage(id)} />
    </div>
  );
});

const PostUploadUI = ({
  profileImage,
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
  setText,
}) => {
  return (
    <>
      <NewTopHeader
        left="back"
        right="upload"
        onClickButton={handleUploadWholePost}
        disabled={text === "" && images.length === 0}
        title="수수마켓 게시글 업로드"
      />
      <UploadMain>
        <ProfileImgLabel></ProfileImgLabel>
        <ProfileImg
          src={
            profileImage && profileImage.endsWith("Ellipse.png")
              ? resolveWebp(defaultImgWebp, defaultImg)
              : profileImage
          }
          alt="프로필 사진"
          onError={(e) =>
            (e.target.src = resolveWebp(defaultImgWebp, defaultImg))
          }
        />
        <TextArea
          ref={textRef}
          placeholder="게시글 입력하기..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onInput={handleTextAreaHeight}
          rows="1"
          aria-label="게시글 입력칸"
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
      <UploadImgArea aria-label="선택된 이미지 프리뷰칸">
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

export default PostUploadUI;
