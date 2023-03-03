import {
  animate,
  useTransform,
  useMotionValue,
  motion,
  useInView,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { Button } from "components/Button";
import { FeaturedImage } from "components/FeaturedImage";
import { Page_Flexiblecontent_Blocks_Impact } from "graphql";

export interface ImpactProps extends Page_Flexiblecontent_Blocks_Impact {
  className?: string;
}

const Impact = ({
  className,
  variant,
  backgroundColor,
  hasHeadingIcon,
  title,
  headingIcon,
  impactItems,
}: ImpactProps) => {
  const hasCards = impactItems && impactItems.length > 0;

  return (
    <div
      className={`${
        className ? className : ``
      } flex bg-${backgroundColor} relative flex flex-col items-center justify-center py-4 px-2`}
    >
      {hasHeadingIcon ? (
        <FeaturedImage
          image={headingIcon}
          className={`mt-6 w-full max-w-[12rem] ${title ? "" : "mb-8"}`}
          imgClassName="w-full"
        />
      ) : null}
      {title ? (
        <h2 className="my-4 font-heading text-5xl leading-none text-dark">
          {title}
        </h2>
      ) : null}
      {hasCards ? (
        <div
          className={`container relative mx-auto md:px-4 xl:max-w-7xl ${
            variant === "cards"
              ? `grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-3`
              : `column flex items-center justify-center`
          }`}
        >
          {impactItems.map((card: any, index: number) => {
            const {
              impactIcon,
              impactNumber,
              isDollarAmount,
              isAbbreviated,
              subtext,
            } = card ?? {};

            function Counter() {
              const count = useMotionValue(0);
              const rounded = useTransform(count, (latest) =>
                Math.round(latest)
              );
              const ref = useRef(null);
              const isInView = useInView(ref);

              const str = impactNumber.toString();
              const numArray = str.split("");
              const isBig = numArray.length > 3;
              const num = str.slice(0, -3);

              useEffect(() => {
                if (isAbbreviated) {
                  if (isInView) {
                    animate(count, parseInt(num));
                  } else {
                    animate(count, 0);
                  }
                } else {
                  if (isInView) {
                    animate(count, impactNumber);
                  } else {
                    animate(count, 0);
                  }
                }
              }, [isInView]);

              return <motion.div ref={ref}>{rounded}</motion.div>;
            }

            return (
              <div
                key={index}
                className={`relative h-full w-full flex-col justify-start py-6 px-10 transition duration-300 ease-in-out`}
              >
                <div
                  className={`${
                    className ? className : ``
                  } relative mx-auto flex h-full w-fit flex-col items-center justify-start text-center`}
                >
                  {impactIcon ? (
                    <FeaturedImage
                      image={impactIcon}
                      className={`w-full max-w-[3rem]`}
                      imgClassName="w-full"
                    />
                  ) : null}
                  {impactNumber ? (
                    <p
                      className={`mb-2 mt-6 flex flex-row font-body text-8xl ${
                        variant === "cards" ? "font-heading text-secondary" : ""
                      }`}
                    >
                      {isDollarAmount ? `$` : null}
                      <Counter />
                      {isAbbreviated ? `k` : null}
                    </p>
                  ) : null}
                  {subtext ? <p className="font-body">{subtext}</p> : null}
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default Impact;
