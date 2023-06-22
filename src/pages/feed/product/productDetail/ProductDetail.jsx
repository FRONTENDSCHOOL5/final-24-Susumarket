import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import UserInput from "../../../../components/commons/dataInput/UserInput"
import DataInput from "../../../../components/commons/dataInput/DataInput"
import defaultimg from "../../../../img/ProfileImg.svg"
import uploadfile from "../../../../img/upload-file.svg";
import {
  Cont, Container, Form, Img, ImgInput, ImgLabel, ImgContainer, ImgTopLabel
} from "./productDetail.style.js";
import { customAxios } from '../../../../library/customAxios'
import ProductDetailHeader from '../../../../components/commons/topHeader/ProductDetailHeader';
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

  // 버튼 활성화
  // useEffect(() => {
  //   if (itemName && price && link && itemImage) {
  //     setBtnDisabled(false);
  //   } else {
  //     setBtnDisabled(true);
  //   }
  // }, [itemName, price, link, itemImage]);


  // 사진받아옴
  useEffect(() => {
    const getInfo = async () => {
      const url = `${baseUrl}product/detail/${params.productId}`
      try {
        const response = await customAxios.get(url);
        const data = response.data;
        console.log(data);
      } catch (error) {
        console.log(error);
      };
    };
    getInfo();
  }, [baseUrl, params])

  // useEffect(() => {
  //   if (!post) return;
  //   const postImages = post.image ? post.image.split(",").map((image) => `https://api.mandarin.weniv.co.kr/${image}`)
  //     : "";
  //   const getImageFiles = async () => {
  //     const imageFiles = await Promise.all(postImages.map((url) => convertURLtoFile(url)));
  //     setImages(imageFiles);
  //   };
  //   if (postImages) getImageFiles();

  //   const postText = post.content;
  //   textareaRef.current.value = postText;
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <Container>
      <ProductDetailHeader></ProductDetailHeader>
      <ImgContainer>
        <Img
          className="default"
          src={itemImage}
        />
        <ImgInput></ImgInput>
      </ImgContainer>
      {/* <Form> */}
      <Cont>
        <UserInput label="상품명"> </UserInput>
        <UserInput label={itemName}> </UserInput>

        <UserInput label="가격"> </UserInput>
        <UserInput label={itemName}> </UserInput>

        <UserInput label="판매링크"> </UserInput>
        <UserInput label={itemName}> </UserInput>
        {/* <ErrorMsg >
      </ErrorMessage> */}
      </Cont>

      {/* </Form> */}
    </Container>

  )
}

