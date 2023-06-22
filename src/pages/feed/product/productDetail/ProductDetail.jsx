import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import UserInput from "../../../../components/commons/dataInput/UserInput"
import DataInput from "../../../../components/commons/dataInput/DataInput"
import defaultimg from "../../../../img/ProfileImg.svg"
import uploadfile from "../../../../img/upload-file.svg";
import NewTopHeader from '../../../../components/commons/newTopHeader/NewTopHeader';
import {
  Cont, Container, Form, Img, ImgInput, ImgLabel, ImgContainer, ImgTopLabel
} from "./productDetail.style.js";
import { customAxios } from '../../../../library/customAxios'
// import { useLocation } from "react-router-dom";

export default function ProductDetail() {
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [link, setLink] = useState('');
  const [itemImage, setItemImage] = useState('');
  const [images, setImages] = useState([]);

  const navigate = useNavigate();
  // const location = useLocation();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const params = useParams();


  // 이미지 로딩
  useEffect(() => {
    const loadProfileImage = async () => {
      const url = `${baseUrl}product/detail/${params.productId}`
      try {
        const response = await customAxios.get(url);
        setItemImage(response.data.product.itemImage);
        setItemName(response.data.product.itemName);
        setPrice(response.data.product.price);
        setLink(response.data.product.link);
        const data = response.data;
        console.log(data);

      } catch (error) {
        console.error(error);
      }
    };
    loadProfileImage();
  }, [baseUrl, params]);


  return (
    <Container>
      <NewTopHeader left={"back"} right={""} ></NewTopHeader>
      <ImgContainer>
        <ImgTopLabel>{itemName}</ImgTopLabel>
        <Img
          className="default"
          src={itemImage}
        // alt="기본 이미지"
        />
        <ImgInput
          type="file"
          id="file-input"
          accept="image/*"
        // onChange={handleImageChange}
        ></ImgInput>
      </ImgContainer>

      {/* <Form> */}
      <Cont>
        {/* <UserInput label="상품명"> </UserInput>
        <UserInput label={itemName}> </UserInput> */}

        <UserInput label="가격"> </UserInput>
        <UserInput label={price}> </UserInput>

        <UserInput label="판매링크"> </UserInput>
        <UserInput label={link}> </UserInput>
        {/* <ErrorMsg >
      </ErrorMessage> */}
      </Cont>

      {/* </Form> */}
    </Container>

  )
}

