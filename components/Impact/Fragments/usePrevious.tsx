import { useRef, useEffect } from "react";

export function usePrevious(value: undefined) {
  const ref = useRef<HTMLElement>();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}
