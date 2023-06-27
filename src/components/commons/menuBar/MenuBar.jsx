import React from "react";
import iconHome from "../../../img/icon-home.svg";
import iconHomeFill from "../../../img/icon-home-fill.svg";
import iconMessage from "../../../img/icon-message-circle.svg";
import iconMessageFill from "../../../img/icon-message-circle-fill.svg";
import iconEdit from "../../../img/icon-edit.svg";
import iconEditFill from "../../../img/icon-edit-fill.svg";
import iconUser from "../../../img/icon-user.svg";
import iconUserFill from "../../../img/icon-user-fill.svg";
import iconPalette from "../../../img/icon-palette.svg";
import iconPaletteFill from "../../../img/icon-palette-fill.svg";
import { useLocation } from "react-router-dom";
import {
  MenuBarWrapper,
  MenuBarUl,
  MenuBarLi,
  Img,
  LinkStyle,
} from "./MenuBarStyle";
import { isMobile } from "react-device-detect";

export default function MenuBar() {
  const location = useLocation();
  const pathname = location.pathname;
  // 아이콘 default, fill을 키값으로 한 객체생성.
  const IconHome = {
    default: iconHome,
    fill: iconHomeFill,
  };
  const IconMessage = {
    default: iconMessage,
    fill: iconMessageFill,
  };
  const IconEdit = {
    default: iconEdit,
    fill: iconEditFill,
  };
  const IconPalette = {
    default: iconPalette,
    fill: iconPaletteFill,
  };
  const IconUser = {
    default: iconUser,
    fill: iconUserFill,
  };

  return (
    <MenuBarWrapper>
      <MenuBarUl>
        <MenuBarLi>
          <LinkStyle to="/post">
            <>
              <Img
                // url이 잘 이동되었을 때 아이콘 활성화
                src={
                  pathname === "/post" || pathname === "/search"
                    ? IconHome.fill
                    : IconHome.default
                }
                alt="홈"
              />
              <p
                style={{
                  // #B51215 색을 css변수로 바꾸어줘야 함.
                  color: pathname === "/post" ? "#B51215" : "#767676",
                }}
              >
                홈
              </p>
            </>
          </LinkStyle>
        </MenuBarLi>
        <MenuBarLi>
          <LinkStyle to="/chatList">
            <>
              <Img
                src={
                  pathname === "/chatList"
                    ? IconMessage.fill
                    : IconMessage.default
                }
                alt="메세지"
              />
              <p
                style={{
                  color: pathname === "/chatList" ? "#B51215" : "#767676",
                }}
              >
                채팅
              </p>
            </>
          </LinkStyle>
        </MenuBarLi>
        <MenuBarLi>
          <LinkStyle to="/post/upload">
            <>
              <Img
                src={
                  pathname === "/post/upload" ? IconEdit.fill : IconEdit.default
                }
                alt="게시물 작성"
              />
              <p
                style={{
                  color: pathname === "/post/upload" ? "#B51215" : "#767676",
                }}
              >
                게시물 작성
              </p>
            </>
          </LinkStyle>
        </MenuBarLi>
        {!isMobile&&<MenuBarLi>
          <LinkStyle to={`/drawing`}>
            <>
              <Img
                src={
                  pathname === `/drawing`
                    ? IconPalette.fill
                    : IconPalette.default
                }
                alt="캔버스"
              />
              <p
                style={{
                  color: pathname === `/drawing` ? "#B51215" : "#767676",
                }}
              >
                캔버스
              </p>
            </>
          </LinkStyle>
        </MenuBarLi>}
        <MenuBarLi>
          <LinkStyle to={`/profile`}>
            <>
              <Img
                src={
                  pathname.includes("/profile")
                    ? IconUser.fill
                    : IconUser.default
                }
                alt="프로필"
              />
              <p
                style={{
                  color: pathname.includes("/profile") ? "#B51215" : "#767676",
                }}
              >
                프로필
              </p>
            </>
          </LinkStyle>
        </MenuBarLi>
      </MenuBarUl>
    </MenuBarWrapper>
  );
}
