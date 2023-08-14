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
import iconHomeWebp from "../../../img/webp/icon-home.webp";
import iconHomeFillWebp from "../../../img/webp/icon-home-fill.webp";
import iconMessageWebp from "../../../img/webp/icon-message-circle.webp";
import iconMessageFillWebp from "../../../img/webp/icon-message-circle-fill.webp";
import iconEditWebp from "../../../img/webp/icon-edit.webp";
import iconEditFillWebp from "../../../img/webp/icon-edit-fill.webp";
import iconUserWebp from "../../../img/webp/icon-user.webp";
import iconUserFillWebp from "../../../img/webp/icon-user-fill.webp";
import iconPaletteWebp from "../../../img/webp/icon-palette.webp";
import iconPaletteFillWebp from "../../../img/webp/icon-palette-fill.webp";
import { resolveWebp } from "../../../library/checkWebpSupport";

import { useLocation } from "react-router-dom";
import {
  MenuBarWrapper,
  MenuBarUl,
  MenuBarLi,
  Img,
  LinkStyle,
} from "./MenuBarStyle";
import { isMobile } from "react-device-detect";
import { resolveWebp } from "../../../library/checkWebpSupport";

export default function MenuBar() {
  const location = useLocation();
  const pathname = location.pathname;
  // 아이콘 default, fill을 키값으로 한 객체생성.
  const IconHome = {
    default: resolveWebp(iconHomeWebp, iconHome),
    fill: resolveWebp(iconHomeFillWebp, iconHomeFill),
  };
  const IconMessage = {
    default: resolveWebp(iconMessageWebp, iconMessage),
    fill: resolveWebp(iconMessageFillWebp, iconMessageFill),
  };
  const IconEdit = {
    default: resolveWebp(iconEditWebp, iconEdit),
    fill: resolveWebp(iconEditFillWebp, iconEditFill),
  };
  const IconPalette = {
    default: resolveWebp(iconPaletteWebp, iconPalette),
    fill: resolveWebp(iconPaletteFillWebp, iconPaletteFill),
  };
  const IconUser = {
    default: resolveWebp(iconUserWebp, iconUser),
    fill: resolveWebp(iconUserFillWebp, iconUserFill),
  };

  return (
    <MenuBarWrapper>
      <MenuBarUl>
        <MenuBarLi>
          <LinkStyle to="/post">
            <>
              <Img
                aria-label="홈 버튼"
                // url이 잘 이동되었을 때 아이콘 활성화
                src={
                  pathname === "/post" || pathname === "/search"
                    ? resolveWebp(iconHomeFillWebp, IconHome.fill)
                    : resolveWebp(iconHomeWebp, IconHome.default)
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
                aria-label="채팅방 이동버튼"
                src={
                  pathname === "/chatList"
                    ? resolveWebp(iconMessageFillWebp, IconMessage.fill)
                    : resolveWebp(iconMessageWebp, IconMessage.default)
                }
                alt="채팅"
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
                aria-label="게시물 작성버튼"
                src={
                  pathname === "/post/upload"
                    ? resolveWebp(iconEditFillWebp, IconEdit.fill)
                    : resolveWebp(iconEditWebp, IconEdit.default)
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
        {!isMobile && (
          <MenuBarLi>
            <LinkStyle to={`/drawing`}>
              <>
                <Img
                  aria-label="캔버스 버튼"
                  src={
                    pathname === `/drawing`
                      ? resolveWebp(iconPaletteFillWebp, IconPalette.fill)
                      : resolveWebp(iconPaletteWebp, IconPalette.default)
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
          </MenuBarLi>
        )}
        <MenuBarLi>
          <LinkStyle to={`/profile`}>
            <>
              <Img
                aria-label="프로필 버튼"
                src={
                  pathname.includes("/profile")
                    ? resolveWebp(iconUserFillWebp, IconUser.fill)
                    : resolveWebp(iconUserWebp, IconUser.default)
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
