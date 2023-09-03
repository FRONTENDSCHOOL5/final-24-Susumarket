import React from "react";
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
  TopHedaerWrapper,
  UploadLabel,
} from "./darwing.style";
import NewTopHeader from "../../components/commons/newTopHeader/NewTopHeader";
import MenuBar from "../../components/commons/menuBar/MenuBar";
import PostModal from "../../components/commons/postModal/PostModal";

export default function DrawingUI({
  colorCode,
  colorData,
  text,
  lineWidth,
  isFilling,
  setIsOpenPostModal,
  canvasRef,
  onChangeText,
  onMove,
  startPainting,
  cancelPainting,
  onLineWidthChange,
  onColorChange,
  onColorClick,
  onModeClick,
  onCanvasClick,
  onDestroyClick,
  onEraserClick,
  onSaveClick,
  onDoubleClick,
  onFileChange,
  navigate,
}) {
  return (
    <>
      <TopHedaerWrapper style={{ width: "100%", minWidth: "1200px" }}>
        <NewTopHeader
          left={"back"}
          middle={"text"}
          text={"수수마켓 캔버스"}
          right={"more"}
          title={"캔버스"}
          onClickButton={() => {
            setIsOpenPostModal(true);
          }}
        />
      </TopHedaerWrapper>

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
                colors={color}
                onClick={() => onColorClick(color)}
              >
                <PalettColorSpan className="a11y-hidden">
                  {color + "색상"}
                </PalettColorSpan>
              </PalettColorBtn>
            );
          })}
        </PaletteWrapper>
        <DrawingCanvers
          ref={canvasRef}
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
      <PostModal
        menuList={[
          {
            name: "상품 등록 페이지로 이동",
            func: () => {
              setIsOpenPostModal(false);
              navigate("/product/upload");
            },
          },
        ]}
      />
    </>
  );
}
