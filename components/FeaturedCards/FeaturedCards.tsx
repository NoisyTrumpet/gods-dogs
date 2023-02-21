import { Button } from "components/Button";
import Link from "next/link";
import { FeaturedImage } from "components/FeaturedImage";
import { Page_Flexiblecontent_Blocks_FeaturedCards } from "graphql";
import styles from "./FeaturedCards.module.css";

export interface CardProps extends Page_Flexiblecontent_Blocks_FeaturedCards {
  className?: string;
}

const FeaturedCards = ({
  className,
  backgroundColor,
  dividerLines,
  title,
  hasHeadingIcon,
  hasCtas,
  cardRepeater,
  ctaRepeater,
  headingIcon,
}: CardProps) => {
  const hasCards = cardRepeater && cardRepeater.length > 0;
  const dividerUnder = dividerLines && dividerLines === "under";
  const diverderBetween = dividerLines && dividerLines === "between";
  const noDivider = dividerLines && dividerLines === "none";

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
          className={`container relative mx-auto grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-3 md:flex-row md:px-4 xl:max-w-7xl`}
        >
          {cardRepeater.map((card, index) => {
            const {
              cardBackgroundColor,
              cardContent,
              cardHasLink,
              buttonType,
              cardLink,
              cardTitle,
              hasCardIcon,
              cardIcon,
              contentAligned,
            } = card ?? {};

            let iconType;
            let iconHover;
            let bgLinkStyles;
            let textLinkStyles;
            if (
              cardIcon?.mimeType === "image/png" ||
              cardIcon?.mimeType === "image/jpeg"
            ) {
              iconType = "max-w-[150px] rounded-lg overflow-hidden";
              iconHover = "hoverImg";
            } else if (cardIcon?.mimeType === "image/svg+xml") {
              iconType = "max-h-[3rem] w-fit";
              if (cardBackgroundColor !== "transparent") {
              } else {
              }
              if (cardBackgroundColor === "transparent") {
                iconHover = "hoverIcon";
              } else if (
                cardBackgroundColor === "primary" ||
                cardBackgroundColor === "secondary"
              ) {
                iconHover = "bgdarkHoverIcon";
              } else if (
                cardBackgroundColor === "primary-light" ||
                cardBackgroundColor === "secondary-light"
              ) {
                iconHover = "bglightHoverIcon";
              }
            }

            if (cardBackgroundColor === "transparent") {
              bgLinkStyles = "bg-transparent";
              textLinkStyles = "text-dark hover:text-secondary";
            } else if (cardBackgroundColor === "primary") {
              bgLinkStyles = "bg-primary hover:bg-primary-light";
              textLinkStyles = "text-white hover:text-dark";
            } else if (cardBackgroundColor === "primary-light") {
              bgLinkStyles = "bg-primary-light hover:bg-primary";
              textLinkStyles = "text-dark hover:text-white";
            } else if (cardBackgroundColor === "secondary") {
              bgLinkStyles = "bg-secondary hover:bg-[#D04F4F4a]";
              textLinkStyles = "text-white hover:text-dark";
            } else if (cardBackgroundColor === "secondary-light") {
              bgLinkStyles = "bg-[#D04F4F4a] hover:bg-secondary";
              textLinkStyles = "text-dark hover:text-white";
            }

            let linkHovers;
            if (cardHasLink) {
              linkHovers = `${bgLinkStyles} ${textLinkStyles} ${
                styles[`${iconHover}`]
              }`;
            } else {
              linkHovers = `bg-${cardBackgroundColor}`;
            }

            return (
              <div
                key={index}
                className={`relative h-full min-h-full w-full ${
                  diverderBetween
                    ? "border-b-2 border-dark last:border-b-0 md:border-b-0 md:border-r-2 md:last:border-r-0"
                    : ""
                }`}
              >
                {cardHasLink && cardLink && !cardContent ? (
                  <Link
                    role="button"
                    href={cardLink.url ?? "/"}
                    target={cardLink.target ? cardLink.target : "_self"}
                    className={`${
                      className ? className : ``
                    } flex ${bgLinkStyles} ${textLinkStyles} ${
                      contentAligned ? "text-left" : "items-center text-center"
                    } relative h-full w-full flex-col justify-start py-6 px-10 transition duration-300 ease-in-out ${
                      styles[`${iconHover}`]
                    }`}
                  >
                    {hasCardIcon ? (
                      <FeaturedImage
                        image={cardIcon}
                        className={`${iconType} ${
                          styles[`cardIcon`]
                        } transition duration-300 ease-in-out`}
                        imgClassName="w-full"
                      />
                    ) : null}
                    {cardTitle ? (
                      <h3 className="mt-4 font-heading text-4xl leading-none">
                        {cardTitle}
                      </h3>
                    ) : null}
                  </Link>
                ) : (
                  <div
                    className={`${className ? className : ``} ${linkHovers} ${
                      contentAligned ? "text-left" : "items-center text-center"
                    } relative flex h-full w-full flex-col justify-start py-6 px-10 transition duration-300 ease-in-out`}
                  >
                    {hasCardIcon ? (
                      <FeaturedImage
                        image={cardIcon}
                        className={`${iconType} ${
                          styles[`cardIcon`]
                        } transition duration-300 ease-in-out`}
                        imgClassName="w-full"
                      />
                    ) : null}
                    {cardTitle ? (
                      <h3
                        className={`mt-4 font-heading text-4xl leading-none ${
                          cardHasLink ? `` : `text-med-dark`
                        }`}
                      >
                        {cardTitle}
                      </h3>
                    ) : null}
                    {dividerUnder ? (
                      <span className={`my-8 w-full border-t-2 border-dark`}>
                        {" "}
                      </span>
                    ) : null}
                    {cardContent ? (
                      <>
                        <div
                          className={`${
                            contentAligned ? "text-left" : "text-center"
                          }  text-md mb-4 max-w-lg font-body ${
                            cardHasLink ? `` : `text-dark`
                          }`}
                          dangerouslySetInnerHTML={{ __html: cardContent }}
                        />
                        {cardHasLink && cardLink ? (
                          <>
                            {buttonType === "basic" ? (
                              <span
                                className={`uppercase italic underline hover:cursor-pointer`}
                              >
                                {cardLink.title}
                              </span>
                            ) : (
                              <Button
                                href={cardLink.url ?? "#"}
                                target={
                                  cardLink.target ? cardLink.target : "_self"
                                }
                                className={`w-fit`}
                                variant={buttonType as string}
                              >
                                {cardLink.title}
                              </Button>
                            )}
                          </>
                        ) : null}
                      </>
                    ) : null}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : null}
      {hasCtas && ctaRepeater ? (
        <div className="flex flex-col gap-4">
          {ctaRepeater.map((cta, index) => {
            const { title, url, target } = cta?.ctaLink ?? {};

            return (
              <Button
                key={index}
                href={url ?? "#"}
                target={target ?? "_self"}
                className={`w-fit`}
                variant={cta?.type as string}
              >
                {title}
              </Button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default FeaturedCards;
