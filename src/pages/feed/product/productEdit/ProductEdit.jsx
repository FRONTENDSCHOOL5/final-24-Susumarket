import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import UserInput from "../../../../components/commons/dataInput/UserInput"
import DataInput from "../../../../components/commons/dataInput/DataInput"
import NewTopHeader from "../../../../components/commons/newTopHeader/NewTopHeader"
import defaultimg from "../../../../img/ProfileImg.svg"
import uploadfile from "../../../../img/upload-file.svg";
import {
  Container, Form, Img, ImgInput, ImgLabel, ImgContainer, ImgTopLabel
} from "./productEdit.style.js";
import { customAxios } from '../../../../library/customAxios'
import { UserContext } from '../../../../context/UserContext';
// import { useLocation } from "react-router-dom";
import ErrorMessage from '../../../../components/commons/errorMessage/ErrorMessage';

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
  // const location = useLocation();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const params = useParams();
  const UserData = useContext(UserContext);

  
  // 저장되어있던 데이터 로딩
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
        console.log(data);
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
      console.log(data);
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
      // return null;
    }
  };

  // onChange
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
    if (itemName.length < 1  || itemName.length > 16) {
      setItemNameMessage('상품명은 2~15자 이내여야 합니다.');
      setIsItemName(false);

    } else {
      setItemNameMessage('');
      setIsItemName(true);
      // setItemName(e.target.value);

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
    // setPrice(numValue);

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
    {/* <div onChange={imgHandler}> */}
      <ImgContainer>
        <ImgTopLabel>이미지 수정</ImgTopLabel>
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

      <UserInput label="판매링크 수정">
        <DataInput
          placeholder="URL을 입력하여 수정해주세요."
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
