import { useState, useEffect } from "react";
// debounce hook, 입력 후 설정된 delay 후에 값을 전달하는 함수
export const useDebounce = (value, delay = 700) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounceValue;
};
