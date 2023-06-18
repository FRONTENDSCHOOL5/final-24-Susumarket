import styled from "styled-components";
// dataInput->DataInput으로 파일명 변경
import { DataInputStyle } from "./InputStyle.js";

export default function DataInput(props) {
  return (
    <DataInputStyle
      type={props.type}
      placeholder={props.placeholder}
      value={props.value} // value prop 추가
      onChange={props.onChange}
    ></DataInputStyle>
  );
}

