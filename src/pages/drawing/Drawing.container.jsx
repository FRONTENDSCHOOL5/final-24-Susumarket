import { isMobile } from "react-device-detect";
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { ModalContext } from "../../context/ModalContext";
import DrawingUI from "./Drawing.presenter";
import { sweetToast } from "../../library/sweetAlert/sweetAlert";
const colorData = [
  "#ff0000",
  "#ff8c00",
  "#ffff00",
  "#008000",
  "#0000ff",
  "#4b0082",
  "#800080",
  "#B51215",
  "#000000",
  "#eeeeee",
];
export default function Drawing() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  const [isPainting, setIsPainting] = useState(false);
  const [isFilling, setIsFilling] = useState(false);
  const [ctx, setCtx] = useState(null);
  const [colorCode, setColorCode] = useState("#000000");
  const [text, setText] = useState("");
  const [lineWidth, setLineWidth] = useState("5");
  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 800;
  const { setIsOpenPostModal } = useContext(ModalContext);

  useEffect(() => {
    if (isMobile) {
      sweetToast(
        "모바일에서는 캔버스를 이용할 수 없습니다!\nPC환경에서 이용해 주세요!",
        "warning",
      );
      navigate(-1);
    }
    canvasRef.current.width = CANVAS_WIDTH;
    canvasRef.current.height = CANVAS_HEIGHT;
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineWidth = 5;
    ctx.strokeStyle = "black";
    setCtx(ctx);
    ctx.lineCap = "round"; // 선을 둥글게
  }, []);

  const onChangeText = ((e) => {
    setText(e.target.value);
  });

  ////// 캔버스에 마우스로 그림그리기 ////////
  const onMove = (
    ({ nativeEvent }) => {
      const { offsetX, offsetY } = nativeEvent;
      if (ctx) {
        if (isPainting && !isFilling) {
          ctx.lineTo(offsetX, offsetY);
          ctx.stroke();
          return;
        }
        // 이전 선과 새로운 선의 연결 끊어주기
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
      }
    }
  );

  // 마우스 클릭이 있는 경우 그림을 그리게 해줌
  const startPainting = () => {
    setIsPainting(true);
  };

  // 마우스 클릭 떼는 경우 연필을 움직이게끔만
  const cancelPainting = () => {
    setIsPainting(false);
  };

  //////// 그림 그리는 선 굵기 조절 //////
  const onLineWidthChange = (e) => {
    setLineWidth(e.target.value);
    ctx.lineWidth = e.target.value;
  };

  /////// 선 색상 직접 선택해 조절 /////////
  const onColorChange = (e) => {
    setColorCode(e.target.value);
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
  };

  /////// 선 색상 정해진 색상 중 클릭해서 조절 //////////
  const onColorClick = (colorValue) => {
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    setColorCode(colorValue);
  };

  /////// 채우기인지 그리기인지
  const onModeClick = () => {
    // 그리기 모드
    if (isFilling) {
      setIsFilling(false);
    }
    // 채우기 모드
    else {
      setIsFilling(true);
    }
  };

  const onCanvasClick = () => {
    if (isFilling) {
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
  };

  const onDestroyClick = () => {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = colorCode;
  };

  const onEraserClick = () => {
    ctx.strokeStyle = "white";
    setIsFilling(false);
    setColorCode("#FFFFFF");
  };

  const onSaveClick = () => {
    // 이미지 데이터 url 불러오기
    const url = canvasRef.current.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
  };

  const onDoubleClick = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    if (text !== "") {
      ctx.save();
      ctx.lineWidth = 1;
      ctx.font = "48px serif";
      ctx.fillText(text, offsetX, offsetY);
      ctx.restore();
    }
  };

  const onFileChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image(); //html의 <img src=""/>와 동일
    image.src = url;
    image.onload = function () {
      ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    };
  };

  return (
    <DrawingUI
      colorCode={colorCode}
      colorData={colorData}
      text={text}
      lineWidth={lineWidth}
      isFilling={isFilling}
      canvasRef={canvasRef}
      setIsOpenPostModal={setIsOpenPostModal}
      onChangeText={onChangeText}
      onMove={onMove}
      startPainting={startPainting}
      cancelPainting={cancelPainting}
      onLineWidthChange={onLineWidthChange}
      onColorChange={onColorChange}
      onColorClick={onColorClick}
      onModeClick={onModeClick}
      onCanvasClick={onCanvasClick}
      onDestroyClick={onDestroyClick}
      onEraserClick={onEraserClick}
      onSaveClick={onSaveClick}
      onDoubleClick={onDoubleClick}
      onFileChange={onFileChange}
      navigate={navigate}
    />
  );
}
