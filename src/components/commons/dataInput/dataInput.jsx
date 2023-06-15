import styled from "styled-components";

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