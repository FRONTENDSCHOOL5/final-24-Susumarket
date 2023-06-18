import { DataInputStyle } from "./InputStyle.js";

export default function DataInput(props) {
  return (
    <DataInputStyle
      type={props.type}
      id={props.id}
      placeholder={props.placeholder}
      value={props.value} // value prop 추가
      onChange={props.onChange} // onChange prop 추가
      onBlur={props.onBlur}
    ></DataInputStyle>
  );
}
