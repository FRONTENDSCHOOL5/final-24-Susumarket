import React from "react";
import UserInput from "../../../../components/commons/dataInput/UserInput";
import DataInput from "../../../../components/commons/dataInput/DataInput";
import NewTopHeader from "../../../../components/commons/newTopHeader/NewTopHeader";
import uploadfile from "../../../../img/upload-file.svg";
import uploadfileWebp from "../../../../img/webp/upload-file.webp";
import ErrorMessage from "../../../../components/commons/errorMessage/ErrorMessage";
import {
  Container,
  Img,
  ImgInput,
  ImgLabel,
  ImgContainer,
  ImgTopLabel,
} from "./productUpload.style";
import { resolveWebp } from "../../../../library/checkWebpSupport";

export default function ProductUploadPresenter({
  itemName,
  price,
  link,
  itemImage,
  disabled,
  itemNameMessage,
  priceMessage,
  linkMessage,
  handleImageChange,
  onClickButton,
  itemNameHandler,
  priceHandler,
  linkHandler,
}) {
  return (
    <Container>
      <NewTopHeader
        left={"back"}
        right={"save"}
        disabled={disabled}
        onClickButton={onClickButton}
        title={"상품 업로드"}
      />

      <ImgContainer>
        <ImgTopLabel>이미지 등록</ImgTopLabel>
        <Img className="default" src={itemImage} alt="" />
        <ImgLabel htmlFor="file-input">
          <Img className="uploadbtn" src={resolveWebp(uploadfileWebp, uploadfile)} alt="업로드 버튼" />
        </ImgLabel>
        <ImgInput
          type="file"
          id="file-input"
          accept="image/*"
          onChange={handleImageChange}
        />
      </ImgContainer>

      <UserInput label="상품명">
        <DataInput
          placeholder="2~15자 이내여야 합니다."
          value={itemName}
          min="2"
          max="15"
          onChange={itemNameHandler}
          required
        />
      </UserInput>
      {itemNameMessage && <ErrorMessage>{itemNameMessage}</ErrorMessage>}

      <UserInput label="상품설명">
        <DataInput
          placeholder="100자 이내로 적어주세요."
          max="100"
          value={link}
          onChange={linkHandler}
          required
        />
      </UserInput>
      {linkMessage && <ErrorMessage>{linkMessage}</ErrorMessage>}

      <UserInput label="가격">
        <DataInput
          placeholder="숫자만 입력 가능합니다."
          min="1"
          max="20"
          value={price}
          onChange={priceHandler}
          required
        />
      </UserInput>
      {priceMessage && <ErrorMessage>{priceMessage}</ErrorMessage>}
    </Container>
  );
}
