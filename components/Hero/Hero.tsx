import { Button } from "components/Button";
import { Page_Flexiblecontent_Blocks_Hero } from "graphql";
import { FeaturedImage } from "components/FeaturedImage";
import SideGraphic from "./Fragments/SideGraphic";
import DonateHero from "./Fragments/DonateHero";
export interface HeroProps extends Page_Flexiblecontent_Blocks_Hero {
  className?: string;
}

const Hero = ({
  className,
  title,
  subtitle,
  ctas,
  hasCtas,
  leftGraphic,
  rightGraphic,
  variant,
  oneTime,
  monthly,
  featuredImage,
}: HeroProps) => {
  const isBasic = variant === "basic";
  const isPrimary = variant === "primary";
  const isSecondary = variant === "secondary";
  const isDonate = variant === "donate";
  const isblogs = variant === "blogs";

  const isDogGroups =
    leftGraphic === "goldenGroup" ||
    leftGraphic === "terrierGroup" ||
    rightGraphic === "goldenGroup" ||
    rightGraphic === "terrierGroup";

  if (isDonate && monthly && oneTime) {
    return (
      <DonateHero
        title={title ? title : null}
        monthly={monthly}
        oneTime={oneTime}
      />
    );
  }

  let svgClassLeft;
  let sideGraphicLeft;
  if (isBasic) {
    svgClassLeft =
      "-left-8 xs:-left-20 h-full max-w-full xs:max-w-[60%] md:-left-28 lg:-left-8 2xl:left-0 basicSvg";
  } else if (isDogGroups) {
    svgClassLeft =
      "-left-4 h-full max-w-[50%] self-start sm:-left-12 md:-left-16 2xl:left-0 dogGrpSvg";
  } else {
    svgClassLeft =
      "-left-20 h-full max-w-[50%] self-start xs:-left-12 md:-left-16 2xl:left-0 allSvg";
  }
  if (isBasic) {
    sideGraphicLeft = "relative bottom-0 h-full max-h-full basicSvg";
  } else if (leftGraphic === "volunteerWalker") {
    sideGraphicLeft = "h-full max-h-[190px] md:max-h-[300px] volSvg";
  } else if (isDogGroups) {
    sideGraphicLeft =
      "absolute bottom-0 h-[250px] max-h-[35vw] xs:max-h-[30vw] md:max-h-[75%] lg:h-[300px] dogGrpSvg";
  } else {
    sideGraphicLeft =
      "absolute bottom-0 h-[160px] max-h-[47vw] sm:max-h-[42%] sm:h-[225px] md:max-h-[75%] lg:h-[300px] allSvg";
  }

  let svgClassRight;
  let sideGraphicRight;
  if (isBasic) {
    svgClassRight =
      "-right-20 h-full hidden xs:flex max-w-[60%] md:-right-28 md:justify-end lg:-right-8 2xl:right-0 basicSvg";
  } else if (isDogGroups) {
    svgClassRight =
      "-right-14 h-full max-w-[50%] justify-end self-end sm:-right-20 md:-right-16 2xl:right-0 dogGrpSvg";
  } else {
    svgClassRight =
      "-right-20 h-full max-w-[50%] justify-end self-end xs:-right-12 md:-right-16 2xl:right-0 allSvg";
  }
  if (isBasic) {
    sideGraphicRight =
      "relative bottom-0 h-full max-h-full -scale-x-100 basicSvg";
  } else if (rightGraphic === "volunteerWalker") {
    sideGraphicRight = "h-full max-h-[190px] md:max-h-[300px] volSvg";
  } else if (isDogGroups) {
    sideGraphicRight =
      "absolute bottom-0 h-[250px] max-h-[35vw] xs:max-h-[30vw] -scale-x-100 md:max-h-[75%] lg:h-[300px] dogGrpSvg";
  } else {
    sideGraphicRight =
      "absolute bottom-0 h-[160px] max-h-[47vw] sm:max-h-[42%] -scale-x-100 sm:h-[225px] md:max-h-[75%] lg:h-[300px] allSvg";
  }

  let rightGraphicValue;
  if (rightGraphic === "volunteerWalker") {
    rightGraphicValue = "volunteerWalkerRight";
  } else {
    rightGraphicValue = rightGraphic;
  }

  // blogs

  return (
    <div
      className={`${className ? className : ``} ${
        !isblogs ? `border-b-[29px] border-primary` : ``
      }`}
    >
      <div
        className={`${isPrimary ? `min-h-[400px] md:min-h-[450px]` : `h-fit`} ${
          isBasic ? "pb-0" : "pb-28 md:pb-40 lg:pb-0"
        } relative z-0 mx-auto flex max-w-screen-2xl flex-col ${
          !isblogs ? `items-center text-center md:flex-row` : ``
        }`}
      >
        {leftGraphic && !isblogs ? (
          <div
            className={`${svgClassLeft} absolute bottom-0 flex w-full justify-start`}
          >
            <SideGraphic
              className={`${sideGraphicLeft}`}
              graphic={isBasic ? "" : leftGraphic}
            />
          </div>
        ) : null}
        <div
          className={`${isBasic ? "mx-auto py-12" : "mx-auto py-20"} ${
            isblogs ? `mx-0 py-10` : ``
          } container z-10 w-full px-4 md:w-1/2`}
        >
          {title ? (
            <h1 className={`font-heading text-5xl leading-none text-dark`}>
              {title}
            </h1>
          ) : null}
          {subtitle ? (
            <div
              className={`font-heading text-2xl text-dark`}
              dangerouslySetInnerHTML={{ __html: subtitle }}
            />
          ) : null}
          {hasCtas ? (
            <div className="mt-8 flex flex-col items-center justify-center space-y-4 md:flex-row md:space-y-0 md:space-x-4">
              {ctas?.map(({ link, type }: any) => (
                <Button
                  key={link.title}
                  href={link?.url}
                  target={link?.target}
                  variant={type}
                >
                  {link?.title}
                </Button>
              ))}
            </div>
          ) : null}
        </div>
        {rightGraphic && !isblogs ? (
          <div className={`${svgClassRight} absolute bottom-0 flex w-full`}>
            <SideGraphic
              className={`${sideGraphicRight}`}
              graphic={`${isBasic ? "" : rightGraphicValue}`}
            />
          </div>
        ) : null}
        {featuredImage && isblogs ? (
          <FeaturedImage
            image={featuredImage}
            className={`w-full`}
            imgClassName="w-full pl-4"
          />
        ) : null}
      </div>
    </div>
  );
};

export default Hero;
