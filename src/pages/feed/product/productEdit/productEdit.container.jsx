import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../../../hook/useAuth";
import { productDetailAPI, productEditAPI } from "../../../../API/productAPI";
import { imgUploadAPI } from "../../../../API/imgUploadAPI";
import ProductEditPresenter from "./productEdit.presenter";
import defaultimg from "../../../../img/webp/ProfileImg.webp";
import { imgValidation } from "../../../../library/imgValidation";

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

  useEffect(() => {
    const loadData = async () => {
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

  useEffect(() => {
    if (myProfile && myProfile.accountname !== accountname && accountname) {
      alert("잘못된 접근입니다.");
      navigate("/profile");
      return;
    }
  }, [accountname]);

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

  const uploadProfileImage = async (file) => {
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
  };

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
      setIsItemImage(true);
    } else {
      setItemImage(null);
      setSelectedImage(null);
      setIsItemImage(false);
    }
  }, [uploadProfileImage]);

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
  }, [price]);

  const linkHandler = useCallback((e) => {
    setLink(e.target.value);
    if (link.length > 101) {
      setLinkMessage("상품설명을 100자 이내로 기입하세요");
      setIsLink(false);
    } else {
      setLinkMessage("");
      setIsLink(true);
    }
  }, [link]);

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
    <ProductEditPresenter
      profileImage={profileImage}
      selectedImage={selectedImage}
      isLoading={isLoading}
      itemName={itemName}
      price={price}
      link={link}
      productid={productid}
      itemImage={itemImage}
      isItemName={isItemName}
      isPrice={isPrice}
      isLink={isLink}
      isItemImage={isItemImage}
      BtnDisabled={BtnDisabled}
      disabled={disabled}
      accountname={accountname}
      itemNameMessage={itemNameMessage}
      priceMessage={priceMessage}
      linkMessage={linkMessage}
      itemImageMessage={itemImageMessage}
      isInValidPage={isInValidPage}
      onClickButton={onClickButton}
      handleImageChange={handleImageChange}
      itemNameHandler={itemNameHandler}
      priceHandler={priceHandler}
      linkHandler={linkHandler}
    />
  );
}
