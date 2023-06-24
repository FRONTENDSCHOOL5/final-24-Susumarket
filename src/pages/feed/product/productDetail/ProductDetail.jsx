import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NewTopHeader from "../../../../components/commons/newTopHeader/NewTopHeader";
import {
  Cont,
  Container,
  Img,
  ImgInput,
  ImgContainer,
  ImgTopLabel,
} from "./productDetail.style.js";
import noImg from "../../../../img/symbol-logo-404.svg";
import { customAxios } from "../../../../library/customAxios";


export default function ProductDetail() {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [link, setLink] = useState("");
  const [itemImage, setItemImage] = useState("");

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const params = useParams();

  // 이미지 로딩
  useEffect(() => {
    const loadProfileImage = async () => {
      const url = `${baseUrl}product/detail/${params.productId}`;
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
      <NewTopHeader left={"back"} right={""}></NewTopHeader>
      <Cont>
        <ImgContainer>
          <ImgTopLabel>{itemName}</ImgTopLabel>
          <Img
            className="default"
            src={itemImage}
            onError={(e) => (e.target.src = noImg)}
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
    </Container>
  );
}
