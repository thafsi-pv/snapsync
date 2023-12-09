import { useEffect, useState } from "react";

function useDebounce(value, delay) {
  console.log("🚀 ~ file: useDebounce.jsx:4 ~ useDebounce ~ value:", value)
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
