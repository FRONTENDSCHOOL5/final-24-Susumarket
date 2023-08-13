import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productDetailAPI } from "../../../../API/productAPI";
import ProductDetailPresenter from "./productDetail.presenter";
import iconHeart from "../../../../img/icon-heart.svg";
import iconHeartFill from "../../../../img/icon-heart-fill.svg";

export default function ProductDetail() {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [link, setLink] = useState("");
  const [itemImage, setItemImage] = useState("");
  const [name, setName] = useState("");
  const [profile, setProfile] = useState("");
  const [accountname, setAccountname] = useState("");
  const [heartFill, setHeartFill] = useState(iconHeart);
  const [isInValidPage, setIsInValidPage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const params = useParams();

  const clickHeart = useCallback(() => {
    setHeartFill((prevHeartFill) =>
      prevHeartFill === iconHeart ? iconHeartFill : iconHeart
    );
  }, []);

  const navigate = useNavigate();

  const newPrice = new Intl.NumberFormat().format(parseInt(price, 10));

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await productDetailAPI(params.productId);
        setItemImage(data.itemImage);
        setItemName(data.itemName);
        setPrice(data.price);
        setLink(data.link);
        setName(data.author.username);
        setProfile(data.author.image);
        setAccountname(data.author.accountname);
        setIsInValidPage(false);
        setIsLoading(false);
      } catch (error) {
        setIsInValidPage(true);
        console.error(error);
      }
    };

    loadData();
  }, [baseUrl, params]);

  return (
    <ProductDetailPresenter
      itemName={itemName}
      price={price}
      link={link}
      itemImage={itemImage}
      name={name}
      profile={profile}
      accountname={accountname}
      heartFill={heartFill}
      isInValidPage={isInValidPage}
      isLoading={isLoading}
      clickHeart={clickHeart}
      newPrice={newPrice}
      navigate={navigate}
    />
  );
}
