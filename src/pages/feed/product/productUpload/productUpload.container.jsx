import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ProductUploadPresenter from "./productUpload.presenter";
import { uploadProductAPI } from "../../../../API/productAPI";
import { imgUploadAPI } from "../../../../API/imgUploadAPI";
import { imgValidation } from "../../../../library/imgValidation";
import defaultimg from "../../../../img/ProfileImg.svg";

export default function ProductUpload() {
  const [profileImage, setProfileImage] = useState(defaultimg);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [link, setLink] = useState("");
  const [itemImage, setItemImage] = useState("");
  const [isItemName, setIsItemName] = useState(false);
  const [isPrice, setIsPrice] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [isItemImage, setIsItemImage] = useState(false);
  const [BtnDisabled, setBtnDisabled] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [itemNameMessage, setItemNameMessage] = useState("");
  const [priceMessage, setPriceMessage] = useState("");
  const [linkMessage, setLinkMessage] = useState("");
  const [itemImageMessage, setItemImageMessage] = useState("");
  const navigate = useNavigate();

  const handleImageChange = useCallback((e) => {
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
  }, [uploadProfileImage]);

  const onClickButton = useCallback(async (e) => {
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
      const data = await uploadProductAPI(product);
      setItemName(data.itemName);
      setPrice(data.price);
      setLink(data.link);
      setItemImage(data.itemImage);
      navigate(`/profile`);
    } catch (error) {
      console.log(error);
    }
  }, [price, itemName, link, selectedImage, uploadProductAPI, navigate]);

  const uploadProfileImage = useCallback(async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const data = await imgUploadAPI(formData);
      setSelectedImage(data);
    } catch (error) {
      if (error.response.status === 422) {
        console.error(error);
        console.log("오류 메시지:", error.response.data);
      }
    }
  }, [imgUploadAPI]);

  const itemNameHandler = useCallback((e) => {
    setItemName(e.target.value);
    if (itemName.length < 1 || itemName.length > 16) {
      setItemNameMessage("상품명은 2~15자 이내여야 합니다.");
      setIsItemName(false);
    } else {
      setItemNameMessage("");
      setIsItemName(true);
    }
  }, [itemName]);

  const priceHandler = useCallback((e) => {
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
  }, [price]);

  const linkHandler = useCallback((e) => {
    setLink(e.target.value);
    if (link.length > 101) {
      setLinkMessage("상품명은 100자 이내여야 합니다.");
      setIsLink(false);
    } else {
      setLinkMessage("");
      setIsLink(true);
    }
  }, [link]);

  useEffect(() => {
    if (isItemName === true && isPrice === true && isLink === true) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [isItemName, isPrice, isLink]);

  return (
    <ProductUploadPresenter
      profileImage={profileImage}
      selectedImage={selectedImage}
      isLoading={isLoading}
      itemName={itemName}
      price={price}
      link={link}
      itemImage={itemImage}
      isItemName={isItemName}
      isPrice={isPrice}
      isLink={isLink}
      isItemImage={isItemImage}
      BtnDisabled={BtnDisabled}
      disabled={disabled}
      itemNameMessage={itemNameMessage}
      priceMessage={priceMessage}
      linkMessage={linkMessage}
      itemImageMessage={itemImageMessage}
      navigate={navigate}
      handleImageChange={handleImageChange}
      onClickButton={onClickButton}
      itemNameHandler={itemNameHandler}
      priceHandler={priceHandler}
      linkHandler={linkHandler}
    />
  );
}
