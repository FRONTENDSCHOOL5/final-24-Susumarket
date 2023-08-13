import { sweetToast } from "./sweetAlert/sweetAlert";

export const imgValidation = (file) => {
  const reg = /(.*?)\.(jpg|jpeg|png|gif|bmp|tif|heic)$/;
  // 파일 확인
  if (!file) {
    return false;
  }
  // 파일 사이즈 확인
  if (file.size > 1024 * 1024 * 10) {
    sweetToast("이미지 파일의 크기를 초과하였습니다.(최대 10MB)", "warning");
    return false;
  }
  // 이미지 지원 형식 확인
  if (!reg.test(file.name)) {
    sweetToast(
      "이미지 형식을 확인해 주세요!\n(지원형식 : .jpg,.gif, .png,.jpeg, .bmp,.tif, *.heic)",
      "warning",
    );
    return false;
  }
  // 모두 만족 한다면 true 반환
  return true;
};
