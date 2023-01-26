import { Button } from "components/Button";
import { FeaturedImage } from "components/FeaturedImage";
import { Page_Flexiblecontent_Blocks_TextImage } from "graphql";
import Paws from "public/text-image-assets/paws.svg";
export interface TextImageProps extends Page_Flexiblecontent_Blocks_TextImage {
  className?: string;
}

const TextImage = ({ className, textImageRepeater }: TextImageProps) => {
  const hasSections = textImageRepeater && textImageRepeater.length > 0;

  return (
    hasSections &&
    textImageRepeater.map((section, index) => {
      const {
        backgroundColor,
        content,
        ctaRepeater,
        hasCtas,
        hasSidePawsIcon,
        imageSide,
        pawsIconPostion,
        sectionImage,
        paddingBottom,
        paddingTop,
        title,
      } = section ?? {};

      const pTop = paddingTop ? `pt-20` : ``;
      const pBottom = paddingBottom ? `pb-20` : ``;
      const pawsClasses =
        pawsIconPostion === `top-left`
          ? `-top-8 -left-24`
          : `-top-8 -right-24 `;

      return (
        <div
          key={index}
          className={`${
            className ? className : ``
          } flex bg-${backgroundColor}-light relative`}
        >
          <div
            className={`container relative mx-auto flex flex-col px-4 md:flex-row ${pTop} ${pBottom}`}
          >
            {hasSidePawsIcon ? (
              <div className={`absolute ${pawsClasses}`}>
                <Paws />
              </div>
            ) : null}
            <div
              className={`align-center flex flex-col justify-center gap-6 px-12  py-8 md:w-1/2 ${
                imageSide ? `order-last md:order-first` : `order-last`
              }`}
            >
              {title ? (
                <h2 className="font-heading text-5xl leading-none text-dark">
                  {title}
                </h2>
              ) : null}
              {content ? (
                <div
                  className="text-md max-w-lg font-body text-dark"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
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
            <div
              className={`flex flex-col gap-6 md:w-1/2
            ${
              imageSide
                ? `order-last md:order-last`
                : `order-last md:order-first`
            }
          `}
            >
              {sectionImage ? (
                <FeaturedImage
                  image={sectionImage}
                  className={`w-full`}
                  imgClassName="w-full"
                />
              ) : null}
            </div>
          </div>
        </div>
      );
    })
  );
};

export default TextImage;
