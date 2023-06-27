import React, { useState, useEffect } from "react";
import { UserContext } from "../../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import UserInput from "../../../../components/commons/dataInput/UserInput";
import DataInput from "../../../../components/commons/dataInput/DataInput";
import NewTopHeader from "../../../../components/commons/newTopHeader/NewTopHeader";
import defaultimg from "../../../../img/ProfileImg.svg";
import uploadfile from "../../../../img/upload-file.svg";
import {
  Container,
  Img,
  ImgInput,
  ImgLabel,
  ImgContainer,
  ImgTopLabel,
} from "./productUpload.style";
import { customAxios } from "../../../../library/customAxios";
import ErrorMessage from "../../../../components/commons/errorMessage/ErrorMessage";
import { imgValidation } from "../../../../library/imgValidation";

export default function ProductUpload() {
  // API 정보들
  const [profileImage, setProfileImage] = useState(defaultimg);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [link, setLink] = useState("");
  const [itemImage, setItemImage] = useState("");

  // 세가지 요소 중 하나라도 안들어가면 버튼 disabled시키기 위해 input 상태의 변화를 감지
  const [isItemName, setIsItemName] = useState(false);
  const [isPrice, setIsPrice] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [isItemImage, setIsItemImage] = useState(false);
  const [BtnDisabled, setBtnDisabled] = useState(false);
  const [disabled, setDisabled] = useState(false);

  //유효성 검사 메세지
  const [itemNameMessage, setItemNameMessage] = useState("");
  const [priceMessage, setPriceMessage] = useState("");
  const [linkMessage, setLinkMessage] = useState("");
  const [itemImageMessage, setItemImageMessage] = useState("");
  const navigate = useNavigate();

  // input 값 유효성 체크 후 버튼 isDisabled 값 변경
  useEffect(() => {
    if (isItemName === true && isPrice === true && isLink === true) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [isItemName, isPrice, isLink]);

  // 이미지 넣을 때 미리보기 + 유효성 검사
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const valid = imgValidation(file);
    if (!valid) return;
    const reader = new FileReader();
    reader.onload = () => {
      setItemImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
      setSelectedImage(file);
      uploadProfileImage(file);
    } else {
      setItemImage(null);
      setSelectedImage(null);
    }
  };

  // 저장 버튼 누를 때 상품등록 POST API로 정보를 넘겨줍니다.
  const onClickButton = async (e) => {
    e.preventDefault();
    const priceNum = parseInt(price.replaceAll(",", ""), 10);
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const product = {
      product: {
        itemName: itemName,
        price: priceNum,
        link: link,
        itemImage: `${baseUrl}/${selectedImage}`,
      },
    };

    try {
      const response = await customAxios.post(`product`, product);
      const data = response.data.product;
      navigate(`/profile`);
    } catch (error) {
      console.log(error);
    }
  };

  // 이미지를 올릴 시, 이미지 POST API로 이미지를 넘겨줍니다.
  const uploadProfileImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await customAxios.post("image/uploadfile", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      setSelectedImage(response.data.filename);
    } catch (error) {
      if (error.response.status === 422) {
        console.error(error);
        console.log("오류 메시지:", error.response.data);
      }
    }
  };

  // 상품명 유효성 검사
  const itemNameHandler = (e) => {
    setItemName(e.target.value);
    if (itemName.length < 1 || itemName.length > 16) {
      setItemNameMessage("상품명은 2~15자 이내여야 합니다.");
      setIsItemName(false);
    } else {
      setItemNameMessage("");
      setIsItemName(true);
    }
  };

  // 가격 유효성 검사

  const priceHandler = (e) => {
    const value = Number(e.target.value.replaceAll(",", ""));
    if (Number.isNaN(value)) {
      alert("숫자를 입력하세요");
      return;
    }
    const numValue = new Intl.NumberFormat().format(parseInt(value, 10));
    setPrice(numValue);
    if (price.length < 2) {
      setPriceMessage("100원 이상의 값을 입력해주세요");
      setIsPrice(false);
    } else {
      setPriceMessage("");
      setIsPrice(true);
    }
  };

  // 상품설명 유효성 검사
  const linkHandler = (e) => {
    setLink(e.target.value);
    if (link.length > 101) {
      setLinkMessage("상품명은 100자 이내여야 합니다.");
      setIsLink(false);
    } else {
      setLinkMessage("");
      setIsLink(true);
    }
  };

  return (
    <Container>
      <NewTopHeader
        left={"back"}
        right={"save"}
        disabled={disabled}
        onClickButton={onClickButton}
        title={"상품 업로드"}
      ></NewTopHeader>

      <ImgContainer>
        <ImgTopLabel>이미지 등록</ImgTopLabel>
        <Img className="default" src={itemImage} alt="" />
        <ImgLabel htmlFor="file-input">
          <Img className="uploadbtn" src={uploadfile} alt="업로드 버튼" />
        </ImgLabel>
        <ImgInput
          type="file"
          id="file-input"
          accept="image/*"
          onChange={handleImageChange}
        ></ImgInput>
      </ImgContainer>

      <UserInput label="상품명">
        <DataInput
          placeholder="2~15자 이내여야 합니다."
          value={itemName}
          min="2"
          max="15"
          onChange={itemNameHandler}
          required
        ></DataInput>
      </UserInput>
      {itemNameMessage && <ErrorMessage>{itemNameMessage}</ErrorMessage>}

      <UserInput label="상품설명">
        <DataInput
          placeholder="100자 이내로 적어주세요."
          max="100"
          value={link}
          onChange={linkHandler}
          required
        ></DataInput>
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
        ></DataInput>
      </UserInput>
      {priceMessage && <ErrorMessage>{priceMessage}</ErrorMessage>}
    </Container>
  );
}
