export async function detectWebpSupport() {
  // webp 이미지가 로딩 될 때까지 기다리기 위해 비동기 처리
  return new Promise((resolve) => {
    const image = new Image();
    // 1px x 1px WebP 이미지
    const webpdata =
      "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=";

    const callback = (event) => {
      // event.type이 "load"인 경우와 이미지의 너비(image.width)가 1 픽셀인 경우를 검사하여 브라우저가 WebP 이미지를 지원하는지 여부를 판별
      const result = event?.type === "load" && image.width === 1;
      if (result) {
        document.body.classList.add("webp");
        resolve(true); // WebP 지원됨
      } else {
        document.body.classList.add("no-webp");
        resolve(false); // WebP 지원되지 않음
      }
    };

    image.onerror = callback;
    image.onload = callback;
    image.src = webpdata;
  });
}
// webpSupported: webp 지원 유무, img: webp 이미지 경로, fallbackExt: webp 이미지 대체 이미지 형식
export const resolveWebp = (img, fallbackImg) => {
  const webpSupported = document.body.classList.contains("webp");
  // 이미지 포맷
  const ext = img.split(".").pop();
  // webpSupported false, ext가 webp인 경우
  if (!webpSupported && ext === "webp") {
    return fallbackImg
  }
  return img;
};
