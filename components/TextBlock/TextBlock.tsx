import { Button } from "components/Button";
import { FeaturedImage } from "components/FeaturedImage";
import { Page_Flexiblecontent_Blocks_TextBlock } from "graphql";

export interface TextBlockProps extends Page_Flexiblecontent_Blocks_TextBlock {
  className?: string;
}

const TextBlock = ({ className, paragraphs }: TextBlockProps) => {
  const hasParagraphs = paragraphs && paragraphs.length > 0;

  return (
    hasParagraphs &&
    paragraphs.map((paragraph, index) => {
      const {
        content,
        title,
        hasCtas,
        backgroundColor,
        contentAlignment,
        hasHeadingIcon,
        headingIcon,
        ctaRepeater,
      } = paragraph || {};

      return (
        <div
          className={`${className ? className : ``} py-16`}
          key={`text-block-${index} bg-${backgroundColor}`}
        >
          <div
            className={`container mx-auto flex max-w-5xl flex-col gap-6 text-${contentAlignment}`}
          >
            {hasHeadingIcon && headingIcon ? (
              <div className={`flex justify-${contentAlignment}`}>
                <FeaturedImage image={headingIcon} className="w-24" />
              </div>
            ) : null}
            {title ? (
              <h2 className={`font-heading text-5xl text-dark`}>{title}</h2>
            ) : null}
            {content ? (
              <div
                className={`mx-auto max-w-5xl font-body text-dark`}
                dangerouslySetInnerHTML={{ __html: content }}
              />
            ) : null}
            {hasCtas && ctaRepeater ? (
              <div className={`flex flex-col gap-4 items-${contentAlignment}`}>
                {ctaRepeater.map((cta, index) => {
                  const { ctaLink, type } = cta || {};
                  const { url, title } = ctaLink || {};
                  return (
                    <Button
                      key={`cta-${index}`}
                      className={`w-fit`}
                      variant={type ?? `primary`}
                      href={url ?? ``}
                    >
                      {title}
                    </Button>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      );
    })
  );
};

export default TextBlock;
