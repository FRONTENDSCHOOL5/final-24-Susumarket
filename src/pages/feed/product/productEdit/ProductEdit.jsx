import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
} from "./productEdit.style.js";
import ErrorMessage from "../../../../components/commons/errorMessage/ErrorMessage";
import noImg from "../../../../img/no-image.png";
import { imgValidation } from "../../../../library/imgValidation";
import useAuth from "../../../../hook/useAuth";
import InvalidPage from "../../../../components/commons/inValidPage/InvaliPage";
import { productDetailAPI, productEditAPI } from "../../../../API/productAPI";
import { mutiImgUploadAPI } from "../../../../API/imgUploadAPI";

export default function ProductEdit() {
  const [profileImage, setProfileImage] = useState(defaultimg);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [link, setLink] = useState("");
  const [productid, setProductid] = useState("");

  const [itemImage, setItemImage] = useState("");
  const [isItemName, setIsItemName] = useState(false);
  const [isPrice, setIsPrice] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [isItemImage, setIsItemImage] = useState(false);
  const [BtnDisabled, setBtnDisabled] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [accountname, setAccountName] = useState("");

  const [itemNameMessage, setItemNameMessage] = useState("");
  const [priceMessage, setPriceMessage] = useState("");
  const [linkMessage, setLinkMessage] = useState("");
  const [itemImageMessage, setItemImageMessage] = useState("");

  const [isInValidPage, setIsInValidPage] = useState(false);

  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const params = useParams();
  const myProfile = useAuth();
  // input 값 유효성 체크 후 버튼 isDisabled 값 변경
  useEffect(() => {
    const loadData = async () => {
      // const url = `${baseUrl}product/detail/${params.productId}`;
      try {
        const data = await productDetailAPI(params.productId);
        setItemImage(data.itemImage);
        setItemName(data.itemName);
        setPrice(data.price);
        setLink(data.link);
        setAccountName(data.accountname);
        setIsInValidPage(false);
      } catch (error) {
        setIsInValidPage(true);
        console.error(error);
      }
    };
    if (myProfile) loadData();
  }, [baseUrl, params, myProfile]);

  // 다른 유저 상품 수정으로 들어왔을 경우 예외 처리

  useEffect(() => {
    if (myProfile && myProfile.accountname !== accountname && accountname) {
      alert("잘못된 접근입니다.");
      navigate("/profile");
      return;
    }
  }, [accountname]);

  // 저장 버튼 누를 때 상품수정 PUT API로 정보를 넘겨줍니다.
  const onClickButton = async (e) => {
    e.preventDefault();
    const priceNum = parseInt(price.toString().replaceAll(",", ""), 10);
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
      const data = await productEditAPI(params.productId, product);
      console.log(data);
      setItemName(data.itemName);
      setPrice(data.price);
      setLink(data.link);
      setItemImage(data.itemImage);
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
      const data = await mutiImgUploadAPI(file);

      setSelectedImage(data);
    } catch (error) {
      if (error.response.status === 422) {
        console.error(error);
        console.log("오류 메시지:", error.response.data);
      }
    }
  };

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
      setIsItemImage(true);
    } else {
      setItemImage(null);
      setSelectedImage(null);
      setIsItemImage(false);
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

  const priceHandler = (e) => {
    const value = Number(e.target.value.toString().replaceAll(",", ""));
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

  // 가격 유효성 검사
  const linkHandler = (e) => {
    setLink(e.target.value);
    if (link.length > 101) {
      setLinkMessage("상품설명을 100자 이내로 기입하세요");
      setIsLink(false);
    } else {
      setLinkMessage("");
      setIsLink(true);
    }
  };

  // input 값 유효성 체크 후 버튼 isDisabled 값 변경
  useEffect(() => {
    if (
      isItemImage === true ||
      isItemName === true ||
      isPrice === true ||
      isLink === true
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [isItemImage, isItemName, isPrice, isLink]);

  return (
    <Container>
      <NewTopHeader
        left={"back"}
        right={"save"}
        disabled={disabled}
        onClickButton={onClickButton}
      ></NewTopHeader>
      {isInValidPage ? (
        <InvalidPage text={"현재 판매중인 상품이 아닙니다."} size={"large"}/>
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
            ></ImgInput>
            {itemImageMessage && (
              <ErrorMessage> {itemImageMessage} </ErrorMessage>
            )}
          </ImgContainer>
          {/* </div> */}
          <UserInput label="상품명 수정">
            <DataInput
              placeholder="2~15자 이내로 수정해주세요."
              value={itemName}
              min="2"
              max="15"
              onChange={itemNameHandler}
              required
            >
            </DataInput>
          </UserInput>
          {itemNameMessage && <ErrorMessage> {itemNameMessage} </ErrorMessage>}
          <UserInput label="상품설명 수정">
            <DataInput
              placeholder="URL을 입력하여 수정해주세요."
              value={link}
              onChange={linkHandler}
              required
            >
            </DataInput>
          </UserInput>
          {linkMessage && <ErrorMessage>{linkMessage}</ErrorMessage>}
          <UserInput label="가격 수정">
            <DataInput
              // type=""
              placeholder="숫자를 입력해 수정해주세요."
              min="1"
              max="20"
              value={price}
              onChange={priceHandler}
              required
            >
            </DataInput>
          </UserInput>
          {priceMessage && <ErrorMessage>{priceMessage}</ErrorMessage>}
        </>
      )}
    </Container>
  );
}
