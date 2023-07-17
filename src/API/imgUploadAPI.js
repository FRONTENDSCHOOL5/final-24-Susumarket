// 이미지 업로드 API 이미지 이름을 리턴
export const imgUploadAPI = async (formData) => {
  try {
    const imgUrlRes = await customAxios.post("image/uploadfile", formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });
    const imgURLResult = imgUrlRes.data;
    return imgURLResult.filname;
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};

// 다중 이미지 업로드 API 여러 이미지 이름 합쳐서 리턴
export const mutiImgUploadAPI = async (formData) => {
  try {
    const imgUrlRes = await customAxios.post("image/uploadfiles", formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });
    let filenames = [];
    for (let i = 0; i < imgUrlRes.length; i++) {
      filenames.push(
        `${process.env.REACT_APP_BASE_URL}/${imgUrlRes[i].filename}`
      );
    }
    return filenames.join(",");
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};
