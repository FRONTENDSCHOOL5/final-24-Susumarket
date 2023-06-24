import { isMobile } from "react-device-detect";
import React, { useEffect, useRef, useState } from "react";
import {
  DrawingBtn,
  DrawingBtns,
  DrawingCanvers,
  DrawingWrapper,
  InputColor,
  InputLabel,
  InputLineWidth,
  InputText,
  InputUpload,
  PalettColorBtn,
  PalettColorSpan,
  PaletteTitle,
  PaletteWrapper,
  StyleNewTopHeader,
  UploadLabel,
} from "./darwing.styles";
import Button from "../../components/commons/button/Button";
import { useNavigate } from "react-router-dom";
import MenuBar from "../../components/commons/menuBar/MenuBar";
const colorData = [
  "#1abc9c",
  "#3498db",
  "#34495e",
  "#27ae60",
  "#8e44ad",
  "#f1c40f",
  "#e74c3c",
  "#d35400",
  "#2ecc71",
  "#e67e22",
];
export default function Drawing() {
  const navigate = useNavigate();
  const canversRef = useRef(null);

  const [isPainting, setIsPainting] = useState(false);
  const [isFilling, setIsFilling] = useState(false);
  const [ctx, setCtx] = useState(null);
  const [colorCode, setColorCode] = useState("#000000");
  const [text, setText] = useState("");
  const [lineWidth, setLineWidth] = useState("5");
  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 800;

  useEffect(() => {
    if (isMobile) {
      alert(
        "모바일에서는 캔버스를 이용할 수 없습니다! PC환경에서 이용해 주세요!",
      );
      navigate(-1);
    }
    canversRef.current.width = 800;
    canversRef.current.height = 800;
    const ctx = canversRef.current.getContext("2d");
    ctx.lineWidth = 5;
    ctx.strokeStyle = "black";
    setCtx(ctx);
    ctx.lineCap = "round"; // 선을 둥글게
  }, []);

  function onChangeText(e) {
    setText(e.target.value);
  }

  ////// 캔버스에 마우스로 그림그리기 ////////
  function onMove({ nativeEvent }) {
    const { offsetX, offsetY } = nativeEvent;
    if (ctx) {
      if (isPainting) {
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
        return;
      }
      // 이전 선과 새로운 선의 연결 끊어주기
      ctx.beginPath();
      ctx.moveTo(offsetX, offsetY);
    }
  }
  // 마우스 클릭이 있는 경우 그림을 그리게 해줌
  function startPainting() {
    setIsPainting(true);
  }
  // 마우스 클릭 떼는 경우 연필을 움직이게끔만
  function cancelPainting() {
    setIsPainting(false);
  }

  //////// 그림 그리는 선 굵기 조절 //////
  function onLineWidthChange(e) {
    setLineWidth(e.target.value);
    ctx.lineWidth = e.target.value;
  }

  /////// 선 색상 직접 선택해 조절 /////////
  function onColorChange(e) {
    setColorCode(e.target.value);
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
  }

  /////// 선 색상 정해진 색상 중 클릭해서 조절 //////////
  function onColorClick(colorValue) {
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    setColorCode(colorValue);
  }

  /////// 채우기인지 그리기인지
  function onModeClick() {
    // 그리기 모드
    if (isFilling) {
      setIsFilling(false);
    }
    // 채우기 모드
    else {
      setIsFilling(true);
    }
  }
  function onCanvasClick() {
    if (isFilling) {
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
  }

  function onDestroyClick() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = colorCode;
  }

  function onEraserClick() {
    ctx.strokeStyle = "white";
    setIsFilling(false);
  }

  function onSaveClick() {
    // 이미지 데이터 url 불러오기
    const url = canversRef.current.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
  }

  function onDoubleClick({ nativeEvent }) {
    const { offsetX, offsetY } = nativeEvent;
    if (text !== "") {
      ctx.save();
      ctx.lineWidth = 1;
      ctx.font = "48px serif";
      ctx.fillText(text, offsetX, offsetY);
      ctx.restore();
    }
  }

  function onFileChange(event) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image(); //html의 <img src=""/>와 동일
    image.src = url;
    image.onload = function () {
      ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    };
  }

  return (
    <>
      <StyleNewTopHeader
        left={"back"}
        middle={"text"}
        text={"수수마켓 캔버스"}
        right={"more"}
      ></StyleNewTopHeader>
      <DrawingWrapper>
        <PaletteWrapper>
          <PaletteTitle className="a11y-hidden">팔레트</PaletteTitle>
          <InputLabel htmlFor="input-color" className="a11y-hidden">
            색상 선택
          </InputLabel>
          <InputColor
            type="color"
            value={colorCode}
            onChange={onColorChange}
            id="input-color"
          />
          {colorData.map((color) => {
            return (
              <PalettColorBtn
                key={color}
                color={color}
                onClick={() => onColorClick(color)}
              >
                <PalettColorSpan className="a11y-hidden">
                  {color}
                </PalettColorSpan>
              </PalettColorBtn>
            );
          })}
        </PaletteWrapper>
        <DrawingCanvers
          ref={canversRef}
          onMouseMove={onMove}
          onMouseDown={startPainting}
          onMouseUp={cancelPainting}
          onMouseLeave={cancelPainting}
          onClick={onCanvasClick}
          onDoubleClick={onDoubleClick}
        ></DrawingCanvers>
        <DrawingBtns>
          <InputLabel htmlFor="input-lineWidth" className="a11y-hidden">
            선 넓이
          </InputLabel>
          <InputLineWidth
            id="input-lineWidth"
            type="range"
            onChange={onLineWidthChange}
            min="1"
            max="10"
            value={lineWidth}
            step="0.1"
          />
          <DrawingBtn
            type="button"
            className="medium"
            active={true}
            onClick={onModeClick}
          >
            {isFilling ? "Draw" : "Fill"}
          </DrawingBtn>
          <DrawingBtn
            type="button"
            className="medium"
            active={true}
            onClick={onDestroyClick}
          >
            Destroy
          </DrawingBtn>
          <DrawingBtn
            type="button"
            className="medium"
            active={true}
            onClick={onEraserClick}
          >
            Erase
          </DrawingBtn>
          <DrawingBtn
            type="button"
            className="medium"
            active={true}
            onClick={onSaveClick}
          >
            Save image
          </DrawingBtn>
          <InputText
            value={text}
            onChange={onChangeText}
            placeholder="Add Text"
          />
          <UploadLabel className="medium" active={true} htmlFor="input-file">
            Add Photo
          </UploadLabel>
          <InputUpload
            type="file"
            accept="image/*"
            id="input-file"
            onChange={onFileChange}
          />
        </DrawingBtns>
      </DrawingWrapper>
      <MenuBar />
    </>
  );
}
