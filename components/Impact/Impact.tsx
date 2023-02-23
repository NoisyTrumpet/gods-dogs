import { animate, useTransform, useMotionValue, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Button } from "components/Button";
import { FeaturedImage } from "components/FeaturedImage";

interface ImpactProps {
  className?: string;
  variant?: string;
  backgroundColor?: string;
  hasHeadingIcon?: boolean;
  title?: string;
  headingIcon?: any;
  impactItems?: any;
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
            {impactItems.map((card, index) => {
                const {
                    impactIcon,
                    impactNumber,
                    isDollarAmount,
                    isAbbreviated,
                    subtext,
                } = card ?? {};

                function Counter() {
                    const count = useMotionValue(0);
                    const rounded = useTransform(count, latest => Math.round(latest));
                    useEffect(() => {
                    const controls = animate(count, impactNumber)
                        return (controls.stop);
                    }, []);

                    return <motion.div>{rounded}</motion.div>
                  }

            return (
                <div key={index} className={`relative h-full w-full flex-col justify-start py-6 px-10 transition duration-300 ease-in-out`}>
                    <div className={`${
                      className ? className : ``
                    } flex relative h-full w-fit mx-auto text-center flex-col justify-start`}>
                    {impactNumber ? (
                      <p className="my-2 font-body text-2xl">
                        {isDollarAmount ? `$` : null}
                        {impactNumber}
                        <Counter />
                      </p>
                    ) : null}
                    {subtext ? (
                      <p className="my-2 font-body">
                        {subtext}
                      </p>
                    ) : null}
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
