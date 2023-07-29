import React, { useState, useCallback, useEffect } from "react";
import { debounce } from "lodash";
import { SearchWrapper } from "./search.style";
import SearchList from "./SearchList";
import MenuBar from "../../../components/commons/menuBar/MenuBar";
import TopButton from "../../../components/commons/topButton/TopButton";
import { searchAPI } from "../../../API/searchAPI";
import NewTopHeader from "../../../components/commons/newTopHeader/NewTopHeader";
import { useInView } from "react-intersection-observer";

export default function Search() {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInputValue(value);
    if (value.trim() === "") {
      setUserList([]);
    } else {
      setPageNumber(1); // 새로운 검색어 입력 시 페이지 번호를 초기화
      handleSearch(value, 1);
    }
  };

  // debounce패턴 적용한 유저 검색 함수
  const handleSearch = useCallback(
    debounce(async (value, page) => {
      try {
        setIsLoading(true);
        const data = await searchAPI(value, page); // searchAPI 함수를 호출하여 검색 결과를 가져옵니다.
        if (page === 1) {
          // 첫 번째 페이지일 경우 기존 유저 리스트를 대체
          setUserList(data);
        } else {
          // 첫 번째 페이지가 아닐 경우 중복 데이터를 필터링하여 새로운 결과를 기존 유저 리스트에 추가
          setUserList((prevUserList) => {
            const uniqueData = data.filter(
              (user) =>
                !prevUserList.some((prevUser) => prevUser.id === user.id),
            );
            return [...prevUserList, ...uniqueData];
          });
        }
        setHasMore(data.length > 0); // 가져온 데이터가 있으면 더 많은 데이터가 있는 것으로 간주
      } catch (error) {
        console.error(error);
      }
    }, 500),
    [userList],
  );

  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    rootMargin: "200px 0px", // 디자인 및 사용 사례에 맞게 rootMargin 값 조정
  });

  const handleScroll = useCallback(() => {
    if (inView && !isLoading && hasMore) {
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
      handleSearch(searchInputValue, pageNumber + 1);
    }
  }, [inView, isLoading, searchInputValue, pageNumber, handleSearch, hasMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
      <NewTopHeader
        title={"SearchPage"}
        left={"back"}
        right={"searchInput"}
        searchInputValue={searchInputValue}
        onChangeKeyword={handleInputChange}
      />
      <SearchWrapper>
        <SearchList inputValue={searchInputValue} userList={userList} />
        {/* {isLoading && <div>로딩 중...</div>} */}
        {hasMore && <div ref={inViewRef} />}
      </SearchWrapper>
      <TopButton />
      <MenuBar />
    </>
  );
}
