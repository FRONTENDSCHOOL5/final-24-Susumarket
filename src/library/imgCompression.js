import imageCompression from "browser-image-compression";

export const uploadImgCompression = async (file) => {
  const options = {
    maxSizeMB: 10,
    maxWidthOrHeight: 304,
    useWebWorker:true,
  }
  const compressedFileBlob = await imageCompression(file, options);
  const preview = await imageCompression.getDataUrlFromFile(compressedFileBlob);
  return {compressedFileBlob, preview}
}

export const profileImgCompression = async (file) => {
  const options = {
    maxSizeMB: 10,
    maxWidthOrHeight: 220,
    useWebWorker:true,
  }
  const compressedFileBlob = await imageCompression(file, options);
  const preview = await imageCompression.getDataUrlFromFile(compressedFileBlob);
  return {compressedFileBlob, preview}
}