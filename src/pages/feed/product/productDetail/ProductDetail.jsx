import React, { useState, useEffect } from "react";
import NewTopHeader from "../../../../components/commons/newTopHeader/NewTopHeader";
import { useParams } from "react-router-dom";
import noImg from "../../../../img/no-image.png";
import { customAxios } from "../../../../library/customAxios";
import styled from "styled-components";
import iconHeart from "../../../../img/icon-heart.svg"
import iconHeartFill from "../../../../img/icon-heart-fill.svg"
import Button from "../../../../components/commons/button/Button";
import { useNavigate } from 'react-router-dom';
import { ProfileDiv, ContentDiv, Btn, Bottom, Title, Div, Image, Nickname, Icon, HeartIcon, Profile, Price, Contents, Account } from './productDetail.style.js'

export default function ProductDetail() {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [link, setLink] = useState("");
  const [itemImage, setItemImage] = useState("");
  const [name, setName] = useState("");
  const [profile, setProfile] = useState("");
  const [accountname, setAccountname] = useState("");
  const [heartFill, setHeartFill] = useState(iconHeart);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const params = useParams();
  const clickHeart = () => {
    heartFill === iconHeart ? setHeartFill(iconHeartFill) : setHeartFill(iconHeart);
  }
  const Navigate = useNavigate();
  const newPrice = new Intl.NumberFormat().format(parseInt(price, 10));

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
        setName(response.data.product.author.username);
        setProfile(response.data.product.author.image);
        setAccountname(response.data.product.author.accountname)
        const data = response.data;
      } catch (error) {
        console.error(error);
      }
    };

    loadProfileImage();
  }, [baseUrl, params]);

  return (
    <>
      <NewTopHeader left={"back"} right={""}></NewTopHeader>
      <Div>
        <Image src={itemImage}></Image>
        <Profile >
          <Icon src={profile}></Icon>
          <ContentDiv >
            <ProfileDiv>
              <Nickname>{name}</Nickname>
              <Account>@{accountname}  </Account>
            </ProfileDiv>
            <Title>{itemName}</Title>
            <Contents>{link}</Contents>
          </ContentDiv>
        </Profile>
        <Bottom>
          <HeartIcon src={heartFill} onClick={clickHeart}>
          </HeartIcon>
          <span style={{ fontSize: "31px", marginRight: "15px", marginLeft: "15px", color: "#CDCDCD" }}>|</span>
          <Price>
            {newPrice}원
          </Price>
          <Btn className="ms"
            onClick={() => {
              Navigate("/chatList/1")
            }}
          >
            채팅하기
          </Btn>
        </Bottom>

      </Div>
    </>
  )

};