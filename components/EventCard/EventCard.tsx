import { Button } from "components/Button";
import { FeaturedImage } from "components/FeaturedImage";
import { Event } from "graphql";
import clsx from "clsx";

export interface EventCardProps extends Event {
  className?: string;
  variant?: "featured" | "related" | "default";
}
// Featured Classes
const featuredWrapperClasses = `w-full relative bg-primary-light border-t-[20px] border-primary`;
const featuredInnerClasses = `flex flex-col lg:flex-row xl:container xl:mx-auto`;
const featuredImageClasses = `w-full lg:min-w-1/2`;
const emptyFeaturedImageClasses = `w-full lg:w-1/2`;
const featuredContentClasses = `flex w-full flex-col justify-center gap-4 p-12 text-center lg:w-1/2 xl:gap-8`;
const featuredCtaClasses = `mx-auto w-fit`;
// Default Classes
const defaultWrapperClasses = `w-full relative p-8`;
const defaultInnerClasses = `flex flex-col lg:flex-row border-b-[1px] border-[#707070] pb-8 lg:gap-24`;
const defaultImageClasses = `w-full lg:w-1/3 rounded-lg overflow-hidden`;
const emptyDefaultImageClasses = `w-full lg:w-1/3 rounded-lg overflow-hidden`;
const defaultContentClasses = `flex flex-col w-full lg:w-2/3 lg:pl-8 gap-4`;
const defaultCtaClasses = ``;

const EventCard: React.FC<EventCardProps> = ({
  className,
  variant = "default",
  title,
  featuredImage,
  eventOptions,
  excerpt,
  uri,
  content,
}) => {
  // Event Options
  const { date } = eventOptions || {};
  // Variants
  const isFeatured = variant === "featured";
  const isRelated = variant === "related";
  const isDefault = variant === "default";
  // Image
  const hasImage = featuredImage?.node?.sourceUrl;
  // Date: 12/31/2021
  // Month 12 -> Dec
  const month = new Date(date ?? ``).toLocaleString("default", {
    month: "short",
  });
  // Classes for the wrapper
  const wrapperClasses = clsx(className, {
    [featuredWrapperClasses]: isFeatured,
    [defaultWrapperClasses]: isDefault,
  });
  // Classes for the inner wrapper
  const innerClasses = clsx({
    [featuredInnerClasses]: isFeatured,
    [defaultInnerClasses]: isDefault,
  });
  // Classes for the image
  const imageClasses = clsx(
    isFeatured && hasImage ? featuredImageClasses : emptyFeaturedImageClasses,
    isDefault && hasImage ? defaultImageClasses : emptyDefaultImageClasses
  );
  // Classes for the content
  const contentClasses = clsx({
    [featuredContentClasses]: isFeatured,
    [defaultContentClasses]: isDefault,
  });
  // cta variant
  const ctaVariant = isFeatured ? "primary" : "copy";
  // Classes for the cta
  const ctaClasses = clsx({
    [featuredCtaClasses]: isFeatured,
    [defaultCtaClasses]: isDefault,
  });
  // formatted date 12/31/2021 -> Decemeber 31, 2021
  const formattedDate = new Date(date ?? ``).toLocaleDateString("default", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const ctaLabel = isFeatured ? `View More Details` : `Learn More`;

  return (
    <div className={wrapperClasses}>
      <div className={innerClasses}>
        {hasImage ? (
          <div className={imageClasses}>
            <FeaturedImage
              image={featuredImage.node}
              className="w-full"
              imgClassName="w-full"
            />
          </div>
        ) : (
          <div className={imageClasses}>
            <div className={`h-64 w-full bg-primary-light`}>
              <p className={`text-center font-body text-4xl uppercase`}>
                {month}
              </p>
            </div>
          </div>
        )}
        <div className={contentClasses}>
          {/* Title */}
          {title ? <h2 className={`font-heading text-5xl`}>{title}</h2> : null}
          {/* Date */}
          {date ? (
            <p className={`font-body text-sm text-gray-600`}>{formattedDate}</p>
          ) : null}
          {content ? (
            <div
              className={`text-md mx-auto max-w-xl font-body`}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ) : null}
          <Button
            variant={ctaVariant}
            className={ctaClasses}
            href={uri ?? ``}
            aria-label={`View More Details for ${title}`}
          >
            {ctaLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
