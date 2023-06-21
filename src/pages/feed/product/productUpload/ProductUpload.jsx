import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserInput from "../../../../components/commons/dataInput/UserInput"
import DataInput from "../../../../components/commons/dataInput/DataInput"
import ProfileEditTopHeader from "../../../../components/commons/topHeader/ProfileEditTopHeader"
import defaultimg from "../../../../img/ProfileImg.svg"
import uploadfile from "../../../../img/upload-file.svg";
import {
  Container, Form, Img, ImgInput, ImgLabel, ImgContainer, ImgTopLabel
} from "./productUpload.style";
import { customAxios } from '../../../../library/customAxios'

export default function ProductUpload() {
  const [profileImage, setProfileImage] = useState(defaultimg);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [link, setLink] = useState('');
  const [itemImage, setItemImage] = useState('');
  const [BtnDisabled, setBtnDisabled] = useState(true);
  const navigate = useNavigate();
  // 버튼 활성화
  useEffect(() => {
    if (itemName && price && link && itemImage) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [itemName, price, link, itemImage]);




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


  const onClickSave = async (e) => {
    e.preventDefault();
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const product = {
      product: {
        itemName: itemName,
        price: price,
        link: link,
        itemImage: `${baseUrl}/${selectedImage}`,
      },
    };

    try {
      const response = await customAxios.post(`product`, product);
      const data = response.data;
      console.log(data);
      navigate('../../../profile/userProfile');
    } catch (error) {
      console.log(error);
    }
  }



  const uploadProfileImage = async (file) => {
    // image api
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

  const handleItemName = (e) => {
    const itemNameSubmit = e.target.value; //현재 input값
    setItemName(itemNameSubmit); //itemname input값 useState 통해 emailValue로 전달
  }
  // 비밀번호 input 유효성 검사
  const handlePrice = (e) => {
    const priceSubmit = e.target.value; //현재 input값
    setPrice(parseInt(priceSubmit));//price input값 useState 통해 passwordValue로 전달
  }
  const handleLink = (e) => {
    const linkSubmit = e.target.value; //현재 input값
    setLink(linkSubmit);//link input값 useState 통해 passwordValue로 전달
  }


  return (
    <Container>
      <ProfileEditTopHeader></ProfileEditTopHeader>
      <button onClick={onClickSave}>저장</button>

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


      {/* <Form> */}
      <UserInput label="상품명">
        <DataInput
          placeholder="상품명을 입력해주세요"
          value={itemName}
          onChange={handleItemName}
          required> </DataInput>
      </UserInput>

      <UserInput label="가격">
        <DataInput
          placeholder="가격을 입력해주세요"
          value={price}
          onChange={handlePrice}
          required> </DataInput>
      </UserInput>

      <UserInput label="판매링크">
        <DataInput
          placeholder="판매링크를 입력해주세요"
          value={link}
          onChange={handleLink}
          required> </DataInput>
      </UserInput>
      {/* <ErrorMsg >
      </ErrorMessage> */}


      {/* </Form> */}
    </Container>

  )
}
