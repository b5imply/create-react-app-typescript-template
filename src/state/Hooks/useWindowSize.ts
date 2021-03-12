import { useState, useEffect } from 'react';

type UseWindowSize = () => [number, number];
const useWindowSize: UseWindowSize = () => {
  const [windowSize, setWindowSize] = useState<[number, number]>([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const resize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return windowSize;
};

export default useWindowSize;
