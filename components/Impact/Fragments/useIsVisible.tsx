import { useEffect, useState } from "react";

const OPTIONS = {
  root: null,
  rootMargin: "20px 0px 20px 0px",
  threshold: 0.8,
};

const useIsVisible = (elementRef: any) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (elementRef?.current) {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(elementRef.current);
          }
        });
      }, OPTIONS);
      observer.observe(elementRef.current);
    }
  }, [elementRef]);

  return isVisible;
};

export default useIsVisible;
