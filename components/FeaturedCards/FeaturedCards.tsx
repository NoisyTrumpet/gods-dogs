import { Button } from "components/Button";
import Link from "next/link";
import { FeaturedImage } from "components/FeaturedImage";
import { Page_Flexiblecontent_Blocks_FeaturedCards } from "graphql";

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
          className={`w-full max-w-[12rem]`}
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
          className={`container relative mx-auto flex h-fit flex-col items-start justify-center gap-4 md:flex-row md:px-4 xl:max-w-7xl`}
        >
          {cardRepeater.map((card, index) => {
            const {
              cardBackgroundColor,
              cardContent,
              cardHasLink,
              cardLink,
              cardTitle,
              hasCardIcon,
              cardIcon,
              contentAligned,
            } = card ?? {};

            return (
              <div
                key={index}
                className={`relative h-full min-h-full w-full px-2 ${
                  diverderBetween
                    ? "border-b-2 last:border-b-0 md:border-b-0 md:border-r-2 border-dark md:last:border-r-0"
                    : ""
                }`}
              >
                {cardHasLink && cardLink ? (
                  <Link
                    role="button"
                    href={cardLink.url}
                    target={cardLink.target ? cardLink.target : "_self"}
                    className={`${
                      className ? className : ``
                    } flex bg-${cardBackgroundColor} ${
                      contentAligned ? "text-left" : "items-center text-center"
                    } relative h-full w-full flex-col justify-center p-3 transition duration-300 ease-in-out`}
                  >
                    {hasCardIcon ? (
                      <FeaturedImage
                        image={cardIcon}
                        className={`max-h-16 w-fit `}
                        imgClassName="w-full"
                      />
                    ) : null}
                    {cardTitle ? (
                      <h3 className="my-4 font-heading text-4xl leading-none text-med-dark">
                        {cardTitle}
                      </h3>
                    ) : null}
                    {cardContent ? (
                      <>
                        <div
                          className={`${
                            contentAligned ? "text-left" : "text-center"
                          } ${
                            dividerUnder ? "border-t-2 border-dark" : ""
                          } text-md max-w-lg py-2 font-body text-dark`}
                          dangerouslySetInnerHTML={{ __html: cardContent }}
                        />
                        <span
                          className={`uppercase italic underline transition duration-300 ease-in-out hover:text-secondary`}
                        >
                          {cardLink.title}
                        </span>
                      </>
                    ) : null}
                  </Link>
                ) : (
                  <div
                    className={`${
                      className ? className : ``
                    } flex bg-${cardBackgroundColor} ${
                      contentAligned ? "text-left" : "items-center text-center"
                    } relative h-full w-full flex-col justify-center p-3`}
                  >
                    {hasCardIcon ? (
                      <FeaturedImage
                        image={cardIcon}
                        className={`w-full max-w-[3rem]`}
                        imgClassName="w-full"
                      />
                    ) : null}
                    {cardTitle ? (
                      <h3 className="my-4 font-heading text-4xl leading-none text-med-dark">
                        {cardTitle}
                      </h3>
                    ) : null}
                    {cardContent ? (
                      <div
                        className={`${
                          contentAligned ? "text-left" : "text-center"
                        } ${
                          dividerUnder ? "border-t-2 border-dark" : ""
                        } text-md mt-4 max-w-lg pt-8 font-body text-dark`}
                        dangerouslySetInnerHTML={{ __html: cardContent }}
                      />
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
