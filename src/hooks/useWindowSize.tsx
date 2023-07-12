import { useState, useEffect } from "react";

interface WindowSizeData {
  width: number | undefined;
  height: number | undefined;
}

const useWindowSize = (): WindowSizeData => {
  const [windowSize, setWindowSize] = useState<WindowSizeData>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
};

export default useWindowSize;
