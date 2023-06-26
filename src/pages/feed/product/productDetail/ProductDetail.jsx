import React, { useState, useEffect } from "react";
import NewTopHeader from "../../../../components/commons/newTopHeader/NewTopHeader";
import { useParams } from "react-router-dom";
import noImg from "../../../../img/symbol-logo-404.svg";
import { customAxios } from "../../../../library/customAxios";
import styled from "styled-components";
import iconHeart from "../../../../img/icon-heart.svg"
import iconHeartFill from "../../../../img/icon-heart-fill.svg"
import Button from "../../../../components/commons/button/Button";
import { useNavigate } from 'react-router-dom';

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
  const Div = styled.div`
    padding-bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px auto;
    max-width: 500px;
    box-shadow: 4px 4px 8px 8px #CDCDCD;

  `;

  const Image = styled.img`
    max-width: 100%;
    width: 500px;
    height: 400px;
    margin: 0 auto;
    border: 0px solid transparent;
  `;

  const Nickname = styled.div`
    width: 500px;
    margin: 0px auto;
    font-size: 18px;
    font-weight: 900;
    display: flex;
    align-items: flex-start;
    margin-top: 6px;
    margin-bottom: 6px;
  `;

  const Icon = styled.img`
    width: 50px;
    height: 50px;
    -o-object-fit: cover;
    object-fit: cover;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    display: flex;
    justify-content: flex-start;
    margin-right: 10px;
    border-bottom: 1px solid #e9ecef;
   
  `;
  const HeartIcon = styled.img`
    cursor: pointer;
    width: 25px;
    height: 25px;
    margin-top: 4px;
    -o-object-fit: cover;
    object-fit: cover;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    display: flex;
    justify-content: flex-start;
    
  `;
  const Profile = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 470px;
    margin: 20px 10px 0px 10px;
    border-bottom: 1px solid #e9ecef;
  `;

  const Title = styled.div`
    width: 500px;
    font-size: 20px;
    font-weight: 900;
    display: flex;
    align-items: flex-start;
    margin-top: 20px;
  `;



  const Price = styled.div`
  display: flex;
  align-items: center;
    margin: 0px auto;
    width: 400px;
    font-weight: 900;
    font-size: 18px;
  `;

  const Contents = styled.div`
    margin-top: 7px;
    margin-bottom: 20px;
    margin-right: 10px;
    width: max-content;
    max-width: 390px;
    word-break: break-all;
    font-size: 18px;
    line-height: 1.8;
    letter-spacing: -0.6px;
    font-weight: 500;
    
  `;

  const Poststyle = styled.div`
    width: 980px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin: 0px auto;
  `;
  const Account = styled.div`
    font-size: 15px; 
    color: #CDCDCD;
    margin-top: 2px;
    `;

   const Container = styled.main`
    width: 87%;
    max-width: 500px;
    margin: 0 auto;
    `;
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
        console.log(data);
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
          <div >
            <div>
              <Nickname>{name}</Nickname>
              <Account>@{accountname}  </Account>
              </div>
            <Title>{itemName}</Title>
            <Contents>{link}</Contents>
          </div>


        </Profile>

        {/* <Price>{price}</Price> */}

        <div
          style={{
            display: "flex",
            width: "450px",
            marginTop: "30px",
            marginBottom: "30px",
            marginLeft: "10px"

          }}
        >
          <HeartIcon src={heartFill} onClick={clickHeart}>
          </HeartIcon>

          <span style={{ fontSize: "31px", marginRight: "15px", marginLeft: "15px", color: "#CDCDCD" }}>|</span>
          <Price style={{ fontSize: "26px", fontWeight: "400" }}>
            {price}원
          </Price>
          {/* <div class="heart"></div> */}

          <Button className="ms"
            style={{ color: "white", fontSize: "15px", fontWeight: "500" }}
            onClick={() => {
              Navigate("/chatList/1")
            }}
          >
            채팅하기
          </Button>
        </div>

      </Div>
    </>
  )

};