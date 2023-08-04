export function detectWebpSupport() {
  const image = new Image();
  // 1px x 1px WebP 이미지
  const webpdata =
    "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=";
  const callback = (event) => {
    // if the event is from 'onload', check the see if the image's width is 1 pixel (which indicates support). otherwise, it fails
    const result = event?.type === "load" && image.width === 1;
    if (result) {
      document.body.classList.add("webp");
    } else {
      document.body.classList.remove("webp");
    }
  };
  image.onerror = callback;
  image.onload = callback;
  image.src = webpdata;
}

// 첫 번째 인자는 webp 이미지가 지원하는지 판별하는 변수
// 두 번째 인자는 webp 이미지 경로
// 세 번째 인자는 webp 이미지를 대신할 파일의 포맷

export const resolveWebp = (webpSupported, img, fallbackExt) => {
  const ext = img.split(".").pop();
  if (!webpSupported && ext === "") {
    return img.replace("/webp", "").replace(".webp", `.${fallbackExt}`);
  }
  return img;
};
