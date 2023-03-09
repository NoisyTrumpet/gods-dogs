import { Button } from "components/Button";
import { FeaturedImage } from "components/FeaturedImage";
import { Page_Flexiblecontent_Blocks_SplitText } from "graphql";
import Paws from "public/text-image-assets/paws.svg";
export interface SplitTextProps extends Page_Flexiblecontent_Blocks_SplitText {
  className?: string;
}

const SplitText = ({
  className,
  variant,
  title,
  hasPawIcon,
  pawIconPosition,
  cardRepeater,
}: SplitTextProps) => {
  //   const hasSections = SplitTextRepeater && SplitTextRepeater.length > 0;

  let variantContainer;
  if (variant === "masonry") {
    variantContainer = "w-full columns-1 md:w-50 md:columns-2 gap-4";
  } else if (variant === "basic") {
    variantContainer = "grid grid-cols-1 md:grid-cols-2 gap-4";
  }

  let pawPosition;
  if (pawIconPosition === "top-left") {
    pawPosition = `${pawIconPosition} -top-10 -left-24`;
  } else if (pawIconPosition === "top-right") {
    pawPosition = `${pawIconPosition} -top-10 -right-24 -scale-x-100`;
  }

  return (
    <div className={`my-10`}>
      <div className={`container mx-auto xl:max-w-[90rem]`}>
        {title ? (
          <h2 className="my-8 text-center font-heading text-5xl leading-none text-dark">
            {title}
          </h2>
        ) : null}
        {cardRepeater ? (
          <div className={`${variantContainer} relative`}>
            {hasPawIcon ? (
              <div className={`absolute ${pawPosition} z-20`}>
                <Paws />
              </div>
            ) : null}
            {cardRepeater.map((card, index) => {
              const { title, url, target } = card?.link ?? {};
              const cardTitle = card?.title;
              const cardContent = card?.content;
              const cardLinkType = card?.linkType;

              let variantCard;
              if (variant === "masonry") {
                variantCard = "w-full mb-4 break-inside-avoid";
              } else if (variant === "basic") {
                variantCard = "w-full";
              }

              return (
                <div
                  key={index}
                  className={`${variantCard} bg-primary-light py-6 px-8`}
                >
                  <div className={`text-center`}>
                    {cardTitle ? (
                      <>
                        <h2 className="font-heading text-5xl leading-none text-dark">
                          {cardTitle}
                        </h2>
                        <span
                          className={`content-[' '] my-8 block h-[2px] w-full bg-med-dark`}
                        ></span>
                      </>
                    ) : null}
                    {cardContent ? (
                      <div
                        className="text-md mb-4 max-w-full font-body text-dark"
                        dangerouslySetInnerHTML={{ __html: cardContent }}
                      />
                    ) : null}
                    {title ? (
                      <Button
                        href={url ?? "#"}
                        target={target ?? "_self"}
                        className={`w-fit`}
                        variant={cardLinkType as string}
                      >
                        {title}
                      </Button>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SplitText;
