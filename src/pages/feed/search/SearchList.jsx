// import { useState } from "react";
// import {
//   SearchListUl,
//   SearchListLi,
//   SearchListLink,
//   SearchListImg,
//   UserWrapper,
//   UserName,
//   UserId,
// } from "./searchList.style.js";
// import sampleImg from "../../../img/basic-profile.svg";

// const defaultImage = sampleImg;

// export default function SearchList({ userList, inputValue }) {
//   return (
//     <>
//       <SearchListUl>
//         {userList.map((user, index) => (
//           <SearchListLi key={index}>
//             {/* 유저 리스트 클릭시 유저 프로필 페이지로 이동 */}
//             {/* <SearchListLink to={`/profile/${user.accountname}`}>
//               <img
//                 style={{
//                   backgroundImage: `url(${user.image})`,
//                   backgroundPosition: "top center",
//                   backgroundSize: "cover",
//                   width: "50px",
//                   height: "50px",
//                   borderRadius: "50%",
//                 }}
//               /> */}
//             <SearchListLink to={`/profile/${user.accountname}`}>
//               <img
//                 style={{
//                   backgroundImage: `url(${
//                     user.image.endsWith(".png") ? user.image : defaultImage
//                   })`,
//                   backgroundPosition: "top center",
//                   backgroundSize: "cover",
//                   width: "50px",
//                   height: "50px",
//                   borderRadius: "50%",
//                 }}
//               />

//               <UserWrapper>
//                 <UserName>{user.username}</UserName>
//                 <UserId>{user.accountname}</UserId>
//               </UserWrapper>
//             </SearchListLink>
//           </SearchListLi>
//         ))}
//       </SearchListUl>
//     </>
//   );
// }
import { useState } from "react";
import {
  SearchListUl,
  SearchListLi,
  SearchListLink,
  SearchListImg,
  UserWrapper,
  UserName,
  UserId,
} from "./searchList.style.js";
import sampleImg from "../../../img/basic-profile.svg";

const defaultImage = sampleImg;
const word = "https";

export default function SearchList({ userList, inputValue }) {
  return (
    <>
      <SearchListUl>
        {userList.map((user, index) => (
          <SearchListLi key={index}>
            {/* 유저 리스트 클릭시 유저 프로필 페이지로 이동 */}
            <SearchListLink to={`/profile/${user.accountname}`}>
              <img
                src={
                  (user.image.endsWith(".png") ||
                    user.image.endsWith(".jpg") ||
                    user.image.endsWith(".jpeg") ||
                    user.image.endsWith(".gif")) &&
                  user.image.includes(word) // http로 시작하는 경우, .png로 끝나지 않는 이미지 경로 디폴트 이미지 처리
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
                <UserName>{user.username}</UserName>
                <UserId>{user.accountname}</UserId>
              </UserWrapper>
            </SearchListLink>
          </SearchListLi>
        ))}
      </SearchListUl>
    </>
  );
}
