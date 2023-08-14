import React from "react";
import NewTopHeader from "../../../../components/commons/newTopHeader/NewTopHeader";
import UserInput from "../../../../components/commons/dataInput/UserInput";
import DataInput from "../../../../components/commons/dataInput/DataInput";
import ErrorMessage from "../../../../components/commons/errorMessage/ErrorMessage";
import InvalidPage from "../../../../components/commons/inValidPage/InvaliPage";
import { Container, Img, ImgInput, ImgLabel, ImgContainer, ImgTopLabel } from "./productEdit.style.js";
import defaultimg from "../../../../img/webp/ProfileImg.webp";
import uploadfile from "../../../../img/webp/upload-file.webp";
import noImg from "../../../../img/no-image.png";

export default function ProductEditPresenter({
  profileImage,
  selectedImage,
  isLoading,
  itemName,
  price,
  link,
  productid,
  itemImage,
  isItemName,
  isPrice,
  isLink,
  isItemImage,
  BtnDisabled,
  disabled,
  accountname,
  itemNameMessage,
  priceMessage,
  linkMessage,
  itemImageMessage,
  isInValidPage,
  onClickButton,
  handleImageChange,
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
      />
      {isInValidPage ? (
        <InvalidPage text={"현재 판매중인 상품이 아닙니다."} size={"large"} />
      ) : (
        <>
          {" "}
          <ImgContainer>
            <ImgTopLabel>이미지 수정</ImgTopLabel>
            <Img
              className="default"
              src={itemImage.includes("Ellipse.png") ? noImg : itemImage}
              onError={(e) => (e.target.src = noImg)}
              alt="기본 이미지"
            />
            <ImgLabel htmlFor="file-input">
              <Img className="uploadbtn" src={uploadfile} alt="업로드 버튼" />
            </ImgLabel>
            <ImgInput
              type="file"
              id="file-input"
              accept="image/*"
              onChange={handleImageChange}
            />
            {itemImageMessage && (
              <ErrorMessage> {itemImageMessage} </ErrorMessage>
            )}
          </ImgContainer>
          <UserInput label="상품명 수정">
            <DataInput
              placeholder="2~15자 이내로 수정해주세요."
              value={itemName}
              min="2"
              max="15"
              onChange={itemNameHandler}
              required
            />
          </UserInput>
          {itemNameMessage && <ErrorMessage> {itemNameMessage} </ErrorMessage>}
          <UserInput label="상품설명 수정">
            <DataInput
              placeholder="URL을 입력하여 수정해주세요."
              value={link}
              onChange={linkHandler}
              required
            />
          </UserInput>
          {linkMessage && <ErrorMessage>{linkMessage}</ErrorMessage>}
          <UserInput label="가격 수정">
            <DataInput
              placeholder="숫자를 입력해 수정해주세요."
              min="1"
              max="20"
              value={price}
              onChange={priceHandler}
              required
            />
          </UserInput>
          {priceMessage && <ErrorMessage>{priceMessage}</ErrorMessage>}
        </>
      )}
    </Container>
  );
}
