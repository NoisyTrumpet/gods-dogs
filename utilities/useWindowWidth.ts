import { useState, useEffect } from "react";

interface Size {
  width: number | undefined;
}

const useWindowWidth = (): Size => {
  const [windowSize, setWindowSize] = useState<Size>({
    width: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
      });
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

export default useWindowWidth;
