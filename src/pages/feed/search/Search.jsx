import React, { useState, useEffect } from "react";
import { SearchWrapper } from "./search.style";
import SearchTopHeader from "../../../components/commons/topHeader/SearchTopHeader";
import SearchList from "./SearchList";
import { customAxios } from "../../../library/customAxios";

export default function Search() {
  const [inputValue, setInputValue] = useState("");
  const [userList, setUserList] = useState([]); // 유저정보객체

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    // console.log(inputValue);
  };
  useEffect(() => {
    console.log(inputValue);
    // 키 확인하기 api 호출
    const fetchData = async () => {
      try {
        // 키 확인하기 api 호출
        const response = await customAxios.get(
          `/user/searchuser/?keyword=${inputValue}`,
        );
        console.log("response.data", response.data);
        setUserList(response.data);
        // userData 저장
      } catch (error) {
        // 에러 처리
        console.error();
      }
    };
    if (inputValue === "") {
      setUserList([]);
    } else {
      fetchData();
    }

    // search페이지로 처음 이동할때도 검색하는 것 해결
    // if (inputValue !== "") {
    //   fetchData();
    // }
  }, [inputValue]);

  //   }
  //   customAxios
  //     .get(`/user/searchuser/?keyword=${inputValue}`)
  //     .then((response) => {
  //       // 요청에 대한 응답 처리
  //       console.log("response.data", response.data);
  //       setUserList(response.data);
  //       // userData 저장
  //     })
  //     .catch((error) => {
  //       // 에러 처리
  //       console.error();
  //     });
  // }, [handleInputChange]);

  return (
    <>
      {/* <input
        type="text"
        placeholder="계정검색"
        value={inputValue}
        onChange={handleInputChange}
      /> */}
      <SearchTopHeader
        value={inputValue}
        handleInputChange={handleInputChange}
      />
      <SearchWrapper>
        <SearchList inputValue={inputValue} userList={userList} />
      </SearchWrapper>
    </>
  );
}
