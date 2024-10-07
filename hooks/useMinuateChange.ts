import { useEffect, useState } from "react";

export function useMinuteChangeEffect(callback: () => void) {
  const [currentMinute, setCurrentMinute] = useState(new Date().getMinutes());

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const newMinute = now.getMinutes();
  
      // if (newMinute !== currentMinute) {
        setCurrentMinute(newMinute);
        callback();
      // }
    }, 1000); // 1초마다 현재 시간을 확인

    return () => clearInterval(interval);  // 컴포넌트 언마운트 시 인터벌 정리
  }, [currentMinute, callback]);

  return currentMinute;
}
