import React from "react";
import styled from "styled-components";
const DateTime = styled.time`
   font-size: 10px;
  line-height: 12px;
  color: #767676;
  font-weight: 500;
`

export default function DateFormat({dateString}) {
  // 서버에서 주는 시간을 인자로 받습니다.
  // 시간 포맷을 설정해주는 함수
  function setFormat() {
    const now = new Date();
    const dataTime = new Date(dateString);
    // 밀리초로 변환 1000으로 나눠줌
    // 자바스크립트의 기본적으로 밀리초를 사용하기 때문입니다.
    const diff = Math.floor((now - dataTime) / 1000);

    // 차이를 분으로 변환
    const minutes = Math.floor(diff / 60);
    // 차이를 시간으로 변환
    const hours = Math.floor(diff / (60 * 60));
    // 차이를 일로 변환
    const days = Math.floor(diff / (24 * 60 * 60));

    // 시간 차이가 1분이상 나지 않을때
    if (diff < 60) {
      return "방금 전";
      // 시간 차이가 1시간 이상 나지 않을 때
    } else if (diff < 60 * 60) {
      return `${minutes}분 전`;
      // 시간 차이가 하루 이상 나지 아닐때
    } else if (diff < 24 * 60 * 60) {
      return `${hours}시간 전`;
      // 시간 차이가 하루 이상 날때
    } else {
      return `${days}일 전`;
    }
  }

  return <DateTime dateTime={dateString.slice(0,10)}>{setFormat()}</DateTime>;
}
