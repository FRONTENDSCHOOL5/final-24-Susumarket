import styled from "styled-components";

export const TopHedaerWrapper = styled.div`
  width: 100%;
  min-width: 1200px;
`
export const DrawingWrapper = styled.main`
  display: flex;
  height: 100vh;
  gap: 20px;
  justify-content: center;
  align-items: center;
  background-color: gainsboro;
  min-width: 1200px;
  min-height: 1000px;
`;

export const PaletteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

export const PaletteTitle = styled.h2``;

export const PalettColorBtn = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  cursor: pointer;
  border: 5px solid white;
  background-color: ${(props) => props.colors};
  transition: transform ease-in-out 0.1s;
  :hover {
    transform: scale(1.2);
  }
`;

export const PalettColorSpan = styled.span``;
export const DrawingCanvers = styled.canvas`
  width: 800px;
  height: 800px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
`;

export const DrawingBtns = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const InputColor = styled.input`
  cursor: pointer;
`;

export const InputText = styled.input`
  padding: 10px 0px;
  font-weight: 500;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  border: none;
`;
export const InputLineWidth = styled.input``;
export const InputLabel = styled.label``;
export const DrawingBtn = styled.button`
  padding: 10px 0px;
  text-align: center;
  background-color: var(--color-sub);
  color: white;
  font-weight: 500;
  cursor: pointer;
  border-radius: 10px;
  transform: opacity linear 0.1s;
`;

export const UploadLabel = styled.label`
  padding: 10px 0px;
  text-align: center;
  background-color: var(--color-sub);
  color: white;
  font-weight: 500;
  cursor: pointer;
  border-radius: 10px;
  font-size: 14px;
  transform: opacity linear 0.1s;
`;

export const InputUpload = styled.input`
  display: none;
`;

export const BtnSaveImg = styled.button``;

