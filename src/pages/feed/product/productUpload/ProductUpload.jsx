import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import UserInput from "../../../../components/commons/dataInput/UserInput"
import DataInput from "../../../../components/commons/dataInput/DataInput"
import NewTopHeader from "../../../../components/commons/newTopHeader/NewTopHeader"
import defaultimg from "../../../../img/ProfileImg.svg"
import uploadfile from "../../../../img/upload-file.svg";
import {
  Container, Form, Img, ImgInput, ImgLabel, ImgContainer, ImgTopLabel
} from "./productUpload.style";
import { customAxios } from '../../../../library/customAxios'
// import { useLocation } from "react-router-dom";
import ErrorMessage from '../../../../components/commons/errorMessage/ErrorMessage';
import axios from 'axios';

export default function ProductUpload() {
  const [profileImage, setProfileImage] = useState(defaultimg);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [link, setLink] = useState('');
  const [itemImage, setItemImage] = useState('');
  const [description, setDescription] = useState('');

  const [isDescription, setIsDescription] = useState(false);
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
  const [descriptionMessage, setDescriptionMessage] = useState('');
  const navigate = useNavigate();
  // const location = useLocation();
  const UserData = useContext(UserContext);
  // 버튼 활성화
  useEffect(() => {
    if (isItemName === true && isPrice === true && isLink === true) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [isItemName, isPrice, isLink]);



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
    } else {
      setItemImage(null);
      setSelectedImage(null);
    }
  };


  const onClickButton = async (e) => {
    e.preventDefault();
    const priceNum = parseInt(price.replaceAll(',', ''), 10);
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
      console.log(data);
      // navigate(`/product/${data.id}`);
      navigate(`/profile/${UserData.account}`)
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


  // const uploadProfileImage = async (file) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("image", file);

  //     const response = await customAxios.post("image/uploadfile", formData, {
  //       headers: {
  //         "Content-type": "multipart/form-data",
  //       }
  //     });
  //     console.log(response);
  //     setSelectedImage(response.data.filename);
  //   } catch (error) {
  //     if (error.response.status === 422) {
  //       console.error(error);
  //       console.log('오류 메시지:', error.response.data);
  //     }
  //   }
  // };

  const itemNameHandler = (e) => {
    setItemName(e.target.value);
    if (itemName.length < 1 || itemName.length > 16) {
      setItemNameMessage('상품명은 2~15자 이내여야 합니다.');
      setIsItemName(false);

    } else {
      setItemNameMessage('');
      setIsItemName(true);
      // setItemName(e.target.value);
    }
  };


  const priceHandler = (e) => {
    const value = Number(e.target.value.replaceAll(',', ''));
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
    const linkRegex =
      /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    setLink(e.target.value);
    if (!linkRegex.test(link) || link.length < 1) {
      setLinkMessage('사이트 주소를 정확하게 입력해주세요.');
      setIsLink(false);
    } else {
      setLinkMessage('');
      setIsLink(true);
      // setLink(e.target.value);


    }
  };

  // const imgHandler = (e) => {
  //   const correctForm = /(.*?)\.(jpg|gif|png|jpeg|bmp|tif|heic|)$/;
  //   if (e.target.files[0].size > 5 * 1024 * 1024) {
  //     setItemImageMessage('파일 사이즈는 5MB까지만 가능합니다.');
  //     setIsItemImage(false);
  //   } else if (!e.target.files[0].name.match(correctForm)) {
  //     setItemImageMessage('이미지 파일만 업로드 가능합니다.');
  //     setIsItemImage(false);
  //   } else {
  //     setItemImageMessage('');
  //     setIsItemImage(true);
  //   }
  // };

  return (
    <Container>
      <NewTopHeader left={"back"} right={"save"} disabled={disabled} onClickButton={onClickButton} ></NewTopHeader>

      <ImgContainer>
        <ImgTopLabel>이미지 등록</ImgTopLabel>
        <Img
          className="default"
          src={itemImage}
        // alt="기본 이미지"
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
      </ImgContainer>

      <UserInput label="상품명">
        <DataInput
          placeholder="2~15자 이내여야 합니다."
          value={itemName}
          min="2"
          max="15"
          onChange={itemNameHandler}
          required> </DataInput>
      </UserInput>
      {itemNameMessage && <ErrorMessage>
        {itemNameMessage}
      </ErrorMessage>}

      <UserInput label="가격">
        <DataInput
          // type=""
          placeholder="숫자만 입력 가능합니다."
          min="1"
          max="20"
          value={price}
          onChange={priceHandler}
          required> </DataInput>
      </UserInput>
      {priceMessage && <ErrorMessage>
        {priceMessage}
      </ErrorMessage>}

        

      <UserInput label="판매링크">
        <DataInput
          placeholder="URL을 입력해 주세요."
          value={link}
          onChange={linkHandler}
          required> </DataInput>
      </UserInput>
      {linkMessage && <ErrorMessage>
        {linkMessage}
      </ErrorMessage>}


    </Container>

  )
}
