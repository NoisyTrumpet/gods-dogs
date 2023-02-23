import { domAnimation, LazyMotion, m } from "framer-motion";
import useIsVisible from "hooks/useIsVisible";
import { usePrevious } from "hooks/usePrevious";
import { useEffect, useRef, useState } from "react";
import styles from "scss/components/Impact.module.scss";

function formatForDisplay(number: any) {
  const float = Math.max(number, 0).toString();
  return parseFloat(float).toFixed(0).split("").reverse();
}

function NumberColumn({ digit, delta, isBig }) {
  const [position, setPosition] = useState(0);
  const [animationClass, setAnimationClass] = useState(null);
  const previousDigit = usePrevious(digit);
  const columnContainer = useRef<HTMLDivElement>();

  const setColumnToNumber = (number: any | null) => {
    const { clientHeight } = columnContainer?.current;
    setPosition(clientHeight * parseInt(number, 10));
  };

  useEffect(
    () => setAnimationClass(previousDigit !== digit ? delta : ""),
    [digit, delta, previousDigit]
  );

  useEffect(() => setColumnToNumber(digit), [digit]);
  return (
    <div
      className={`${
        styles[`ticker-column-container`]
      } bg-color-white color-primary`}
      ref={columnContainer}
    >
      <LazyMotion features={domAnimation}>
        <m.div
          animate={{ y: position }}
          className={`${styles[`ticker-column`]} ${animationClass}`}
          onAnimationComplete={() => setAnimationClass("")}
        >
          {[9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((num) => (
            <div key={num} className={styles[`ticker-digit`]}>
              <span>{isBig ? `K` : num}</span>
            </div>
          ))}
        </m.div>
      </LazyMotion>

      <span className={styles[`number-placeholder`]}>{0}</span>
    </div>
  );
}

export default function AnimatedNumber({ value }) {
  const numArray = formatForDisplay(value);
  const previousNumber = usePrevious(value);

  let delta = null;
  if (value > previousNumber) delta = "increase";
  if (value < previousNumber) delta = "decrease";
  const elemRef = useRef<HTMLElement>();
  const isVisible = useIsVisible(elemRef);
  const isBig = numArray.length > 3;
  // If numArray .length > 3, trim the array to 3, remove last three entries
  if (numArray.length > 3) {
    numArray.splice(0, numArray.length - 3);
  }

  return (
    <section
      ref={elemRef}
      style={{
        width: `100%`,
        position: `relative`,
        display: `grid`,
        placeItems: `center`,
      }}
    >
      {isVisible ? (
        <LazyMotion features={domAnimation}>
          <m.div layout className={styles[`ticker-view`]}>
            {isBig && <NumberColumn isBig={true} digit={`K`} delta={`K`} />}
            {numArray &&
              numArray.map((number, index) =>
                number === "." ? null : (
                  <NumberColumn
                    isBig={false}
                    key={index}
                    digit={number}
                    delta={delta}
                  />
                )
              )}
          </m.div>
        </LazyMotion>
      ) : null}
    </section>
  );
}
