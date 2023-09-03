import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ProductUploadPresenter from "./productUpload.presenter";
import { uploadProductAPI } from "../../../../API/productAPI";
import { imgUploadAPI } from "../../../../API/imgUploadAPI";
import { imgValidation } from "../../../../library/imgValidation";
import { uploadImgCompression } from "../../../../library/imgCompression";
import { sweetToast } from "../../../../library/sweetAlert/sweetAlert";

export default function ProductUpload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [link, setLink] = useState("");
  const [itemImage, setItemImage] = useState("");
  const [isItemName, setIsItemName] = useState(false);
  const [isPrice, setIsPrice] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [itemNameMessage, setItemNameMessage] = useState("");
  const [priceMessage, setPriceMessage] = useState("");
  const [linkMessage, setLinkMessage] = useState("");
  const navigate = useNavigate();

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
    setItemImage(preview);
    if (file) {
      setSelectedImage(compressedFile);
    } else {
      setItemImage(null);
      setSelectedImage(null);
    }
  }, []);

  const onClickButton = useCallback(
    async (e) => {
      e.preventDefault();
      const priceNum = parseInt(price.replaceAll(",", ""), 10);
      const baseUrl = process.env.REACT_APP_BASE_URL;
      const filename = await uploadProductImage(selectedImage);
      const product = {
        product: {
          itemName: itemName,
          price: priceNum,
          link: link,
          itemImage: `${baseUrl}${filename}`,
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
    },
    [price, itemName, link, selectedImage, uploadProductAPI, navigate],
  );

  const uploadProductImage = useCallback(
    async (file) => {
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
    },
    [],
  );

  const itemNameHandler = useCallback(
    (e) => {
      setItemName(e.target.value);
      if (itemName.length < 1 || itemName.length > 16) {
        setItemNameMessage("상품명은 2~15자 이내여야 합니다.");
        setIsItemName(false);
      } else {
        setItemNameMessage("");
        setIsItemName(true);
      }
    },
    [itemName],
  );

  const priceHandler = useCallback(
    (e) => {
      const value = Number(e.target.value.replaceAll(",", ""));
      if (Number.isNaN(value)) {
        sweetToast("숫자를 입력하세요", "warning");
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
    },
    [price],
  );

  const linkHandler = useCallback(
    (e) => {
      setLink(e.target.value);
      if (link.length > 101) {
        setLinkMessage("상품명은 100자 이내여야 합니다.");
        setIsLink(false);
      } else {
        setLinkMessage("");
        setIsLink(true);
      }
    },
    [link],
  );

  useEffect(() => {
    if (isItemName === true && isPrice === true && isLink === true) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [isItemName, isPrice, isLink]);

  return (
    <ProductUploadPresenter
      selectedImage={selectedImage}
      itemName={itemName}
      price={price}
      link={link}
      itemImage={itemImage}
      isItemName={isItemName}
      isPrice={isPrice}
      isLink={isLink}
      disabled={disabled}
      itemNameMessage={itemNameMessage}
      priceMessage={priceMessage}
      linkMessage={linkMessage}
      navigate={navigate}
      handleImageChange={handleImageChange}
      onClickButton={onClickButton}
      itemNameHandler={itemNameHandler}
      priceHandler={priceHandler}
      linkHandler={linkHandler}
    />
  );
}
