import {
  SearchListUl,
  SearchListLi,
  SearchListLink,
  SearchListImg,
  UserWrapper,
  UserName,
  UserId,
} from "./searchList.style.js";

export default function SearchList({ userList }) {
  return (
    <>
      <SearchListUl>
        {userList.map((user) => (
          <SearchListLi key={user.id}>
            <SearchListLink>
              <SearchListImg />
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
