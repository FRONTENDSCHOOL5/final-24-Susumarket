import React, {useState} from 'react'
import UserInput from "../../../../components/commons/dataInput/UserInput"
import DataInput from "../../../../components/commons/dataInput/DataInput"
import ProfileEditTopHeader from "../../../../components/commons/topHeader/ProfileEditTopHeader" 
import defaultimg from "../../../../img/ProfileImg.svg"
import uploadfile from "../../../../img/upload-file.svg";
import {
  Container, Form ,  Img, ImgInput, ImgLabel, ImgContainer, ImgTopLabel
} from "./productUpload.style";
import { customAxios } from '../../../../library/customAxios'
export default function ProductUpload() {
  const [profileImage, setProfileImage] = useState(defaultimg);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setProfileImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
      setSelectedImage(file);
      uploadProfileImage(file);
    } else {
      setProfileImage(defaultimg);
      setSelectedImage(null);
    }
  };


  const uploadProfileImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await customAxios.post("image/uploadfile", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      console.log(response);
      setSelectedImage(response.data.filename);
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  return (
    <Container>
      <ProfileEditTopHeader />
      <ImgContainer>
      
      <ImgTopLabel htmlFor="file-input">이미지 등록</ImgTopLabel>
      <ImgLabel htmlFor="file-input">
          <Img 
          className="defaultlion" 
          src={profileImage} 
           />
          <Img 
          className="uploadbtn" 
          src={uploadfile} 
          alt="업로드 버튼" />
        </ImgLabel>

        <ImgInput
          type="file"
          id="file-input"
          accept="image/*"
          onChange={handleImageChange}
          ></ImgInput>
          </ImgContainer>

    <Form>       
      <UserInput label="상품명">
        <DataInput
         
          required> </DataInput>
      </UserInput>
      <UserInput label="가격">
        <DataInput
          
          required> </DataInput>
      </UserInput>
      <UserInput label="판매링크">
        <DataInput
          
          required> </DataInput>
      </UserInput>
      {/* <ErrorMsg >
      </ErrorMessage> */}

    
    </Form>
  </Container>

  )
}
