import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../../../hook/useAuth";
import { productDetailAPI, productEditAPI } from "../../../../API/productAPI";
import { imgUploadAPI } from "../../../../API/imgUploadAPI";
import ProductEditPresenter from "./productEdit.presenter";
import { imgValidation } from "../../../../library/imgValidation";
import { uploadImgCompression } from "../../../../library/imgCompression";

export default function ProductEdit() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [link, setLink] = useState("");
  const [itemImage, setItemImage] = useState("");
  const [isItemName, setIsItemName] = useState(false);
  const [isPrice, setIsPrice] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [isItemImage, setIsItemImage] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [accountname, setAccountName] = useState("");
  const [itemNameMessage, setItemNameMessage] = useState("");
  const [priceMessage, setPriceMessage] = useState("");
  const [linkMessage, setLinkMessage] = useState("");
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
    const filename = await uploadProductImage(selectedImage);
    const product = {
      product: {
        itemName: itemName,
        price: priceNum,
        link: link,
        itemImage: `${baseUrl}/${filename}`,
      },
    };

    try {
      const data = await productEditAPI(params.productId, product);
      setItemName(data.itemName);
      setPrice(data.price);
      setLink(data.link);
      setItemImage(data.itemImage);
      navigate(`/profile`);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadProductImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const data = await imgUploadAPI(formData);
      return data;
    } catch (error) {
      if (error.response.status === 422) {
        console.error(error);
        console.log("오류 메시지:", error.response.data);
      }
    }
  };

  const handleImageChange = useCallback(async (e) => {
    const file = e.target.files[0];
    const valid = imgValidation(file);
    if (!valid) return;
    // 이미지 압축후 이미지 (압축한 blob이미지, 미리보기 이미지) 반환
    const { compressedFileBlob, preview } = await uploadImgCompression(file);
    // blob이미지 file 형식으로 변환
    const compressedFile = new File([compressedFileBlob], file.name, {
      type: file.type,
    });
    setItemImage(preview)
    if (file) {
      setSelectedImage(compressedFile);
      setIsItemImage(true);
    } else {
      setItemImage(null);
      setSelectedImage(null);
      setIsItemImage(false);
    }
  }, []);

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
      selectedImage={selectedImage}
      itemName={itemName}
      price={price}
      link={link}
      itemImage={itemImage}
      isItemName={isItemName}
      isPrice={isPrice}
      isLink={isLink}
      isItemImage={isItemImage}
      disabled={disabled}
      accountname={accountname}
      itemNameMessage={itemNameMessage}
      priceMessage={priceMessage}
      linkMessage={linkMessage}
      isInValidPage={isInValidPage}
      onClickButton={onClickButton}
      handleImageChange={handleImageChange}
      itemNameHandler={itemNameHandler}
      priceHandler={priceHandler}
      linkHandler={linkHandler}
    />
  );
}
