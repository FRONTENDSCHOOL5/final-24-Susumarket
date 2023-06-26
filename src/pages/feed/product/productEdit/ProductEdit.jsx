import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import UserInput from "../../../../components/commons/dataInput/UserInput"
import DataInput from "../../../../components/commons/dataInput/DataInput"
import NewTopHeader from "../../../../components/commons/newTopHeader/NewTopHeader"
import defaultimg from "../../../../img/ProfileImg.svg"
import uploadfile from "../../../../img/upload-file.svg";
import {
  Container, Img, ImgInput, ImgLabel, ImgContainer, ImgTopLabel
} from "./productEdit.style.js";
import { customAxios } from '../../../../library/customAxios'
import ErrorMessage from '../../../../components/commons/errorMessage/ErrorMessage';
import noImg from "../../../../img/symbol-logo-404.svg";

export default function ProductEdit() {
  const [profileImage, setProfileImage] = useState(defaultimg);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [link, setLink] = useState('');

  const [itemImage, setItemImage] = useState('');
  const [isItemName, setIsItemName] = useState(false);
  const [isPrice, setIsPrice] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [isItemImage, setIsItemImage] = useState(false);
  const [BtnDisabled, setBtnDisabled] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [itemNameMessage, setItemNameMessage] = useState('');
  const [priceMessage, setPriceMessage] = useState('');
  const [linkMessage, setLinkMessage] = useState('');
  const [itemImageMessage, setItemImageMessage] = useState('');
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const params = useParams();


  useEffect(() => {
    const loadData = async () => {
      const url = `${baseUrl}product/detail/${params.productId}`
      try {
        const response = await customAxios.get(url);
        setItemImage(response.data.product.itemImage);
        setItemName(response.data.product.itemName);
        setPrice(response.data.product.price);
        setLink(response.data.product.link);

        const data = response.data;
        console.log(itemImage)
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, [baseUrl, params]);

  const onClickButton = async (e) => {
    e.preventDefault();
    const priceNum = parseInt(price.toString().replaceAll(',', ''), 10);
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const product = {
      product: {
        itemName: itemName,
        price: priceNum,
        link: link,
        itemImage: `${baseUrl}/${selectedImage}`,
      }
    }

    try {
      const response = await customAxios.put(`${baseUrl}product/${params.productId}`, product);
      const data = response.data.product;
      navigate(`/profile`)

    } catch (error) {
      console.log(error);
    }
  }
  const uploadProfileImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await customAxios.post("image/uploadfile", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        }
      });
      console.log(response);
      setSelectedImage(response.data.filename);
    } catch (error) {
      if (error.response.status === 422) {
        console.error(error);
        console.log('오류 메시지:', error.response.data);
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
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

  const itemNameHandler = (e) => {
    setItemName(e.target.value);
    if (itemName.length < 1 || itemName.length > 16) {
      setItemNameMessage('상품명은 2~15자 이내여야 합니다.');
      setIsItemName(false);

    } else {
      setItemNameMessage('');
      setIsItemName(true);
    }
  };

  const priceHandler = (e) => {
    const value = Number(e.target.value.toString().replaceAll(',', ''));
    if (Number.isNaN(value)) {
      alert('숫자를 입력하세요');
      return;
    }
    const numValue = new Intl.NumberFormat().format(parseInt(value, 10));
    setPrice(numValue);
    if (price.length < 2) {
      setPriceMessage('100원 이상의 값을 입력해주세요');
      setIsPrice(false);
    } else {
      setPriceMessage('');
      setIsPrice(true);

    }
  };
  const linkHandler = (e) => {

    setLink(e.target.value);
    if (link.length > 101) {
      setLinkMessage('상품설명을 100자 이내로 기입하세요');
      setIsLink(false);
    } else {
      setLinkMessage('');
      setIsLink(true);


    }
  };


  useEffect(() => {
    if (isItemImage === true || isItemName === true || isPrice === true || isLink === true) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [isItemImage, isItemName, isPrice, isLink]);

  return (
    <Container>
      <NewTopHeader left={"back"} right={"save"} disabled={disabled} onClickButton={onClickButton} ></NewTopHeader>
      <ImgContainer>
        <ImgTopLabel>이미지 수정</ImgTopLabel>
        <Img
          className="default"
          src={itemImage}
          onError={(e) => e.target.src = noImg}
          alt="기본 이미지"
        />
        <ImgLabel htmlFor="file-input">
          <Img
            className="uploadbtn"
            src={uploadfile}
            alt="업로드 버튼"
          />
        </ImgLabel>
        <ImgInput
          type="file"
          id="file-input"
          accept="image/*"
          onChange={handleImageChange}
        ></ImgInput>
        {itemImageMessage && <ErrorMessage> {itemImageMessage} </ErrorMessage>}
      </ImgContainer>
      {/* </div> */}
      <UserInput label="상품명 수정">
        <DataInput
          placeholder="2~15자 이내로 수정해주세요."
          value={itemName}
          min="2"
          max="15"
          onChange={itemNameHandler}
          required> </DataInput>
      </UserInput>
      {itemNameMessage && <ErrorMessage> {itemNameMessage} </ErrorMessage>}

      <UserInput label="상품설명 수정">
        <DataInput
          placeholder="URL을 입력하여 수정해주세요."
          value={link}
          onChange={linkHandler}
          required> </DataInput>
      </UserInput>
      {linkMessage && <ErrorMessage>
        {linkMessage}
      </ErrorMessage>}


      <UserInput label="가격 수정">
        <DataInput
          // type=""
          placeholder="숫자를 입력해 수정해주세요."
          min="1"
          max="20"
          value={price}
          onChange={priceHandler}
          required> </DataInput>
      </UserInput>
      {priceMessage && <ErrorMessage>
        {priceMessage}
      </ErrorMessage>}



    </Container>

  )
}
