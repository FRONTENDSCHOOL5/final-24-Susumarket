import {
  SearchListUl,
  SearchListLi,
  SearchListLink,
  UserWrapper,
  UserId,
  UserAccount,
} from "./searchList.style.js";
import DefaultImg from "../../../img/basic-profile.svg";

const defaultImage = DefaultImg;
const word = "https";

export default function SearchList({ userList, inputValue }) {
  // 검색어와 같은 단어에 하이라이트 시키는 함수
  // text는 원본 텍스트, query는 강조할 대상을 나타내는 문자열
  const highlightText = (text, query) => {
    const regex = new RegExp(`(${query})`, "g");
    // 첫 번째 일치하는 부분을 찾기위한 변수
    let isFirstMatch = true;
    return text.split(regex).map((part, index) => {
      if (part === query && isFirstMatch) {
        isFirstMatch = false;
        return (
          <span key={index} style={{ color: "#B51215" }}>
            {part}
          </span>
        );
      } else {
        return part;
      }
    });
  };

  return (
    <>
      <SearchListUl>
        {userList.map((user, index) => (
          <SearchListLi key={index}>
            {/* 유저 리스트 클릭시 유저 프로필 페이지로 이동 */}
            <SearchListLink to={`/profile/${user.accountname}`}>
              <img
                src={
                  // http로 시작하는 경우, .png로 끝나지 않는 이미지 경로 디폴트 이미지 처리
                  (user.image.endsWith(".png") ||
                    user.image.endsWith(".jpg") ||
                    user.image.endsWith(".jpeg") ||
                    user.image.endsWith(".gif")) &&
                  user.image.includes(word) &&
                  !user.image.endsWith("Ellipse.png")
                    ? user.image
                    : defaultImage
                }
                alt="프로필 이미지"
                style={{
                  objectFit: "cover",
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                }}
              />
              <UserWrapper>
                <UserId>{highlightText(user.username, inputValue)}</UserId>
                <UserAccount>{user.accountname}</UserAccount>
              </UserWrapper>
            </SearchListLink>
          </SearchListLi>
        ))}
      </SearchListUl>
    </>
  );
}
