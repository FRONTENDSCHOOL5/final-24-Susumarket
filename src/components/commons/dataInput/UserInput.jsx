import styled from "styled-components";
//
import { Cont, InpLabel } from "./InputStyle.js";

export default function UserInput(props) {
  return (
    <Cont>
      <InpLabel htmlFor={props.inputId}>{props.label}</InpLabel>
      {props.children}
    </Cont>
  );
}
