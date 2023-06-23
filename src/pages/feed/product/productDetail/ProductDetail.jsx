import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import UserInput from "../../../../components/commons/dataInput/UserInput"
import DataInput from "../../../../components/commons/dataInput/DataInput"
import defaultimg from "../../../../img/ProfileImg.svg"
import uploadfile from "../../../../img/upload-file.svg";
import NewTopHeader from '../../../../components/commons/newTopHeader/NewTopHeader';
import {
  txtContainer, Cont, Container, Form, Img, ImgInput, ImgLabel, ImgContainer, ImgTopLabel, txt
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
      <Cont>
        <ImgContainer>
          <ImgTopLabel>{itemName}</ImgTopLabel>
          <Img
            className="default"
            src={itemImage}
          />
          <ImgInput
            type="file"
            id="file-input"
            accept="image/*"
          // onChange={handleImageChange}
          ></ImgInput>
        </ImgContainer>

        <txtContainer>
          {/* <UserInput labe/>l="가격"></UserInput> */}
          <txt> 가격:</txt>
          <txt> {price}</txt>
        </txtContainer>

        <txtContainer>
          {/* <UserInput label="판매링크"> </UserInput> */}
          <txt> 판매링크: </txt>
          <txt> {link}</txt>
        </txtContainer>

      </Cont>
    </Container >

  )
}

