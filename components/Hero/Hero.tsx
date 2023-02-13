import { Button } from "components/Button";
import { Page_Flexiblecontent_Blocks_Hero } from "graphql";
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
}: HeroProps) => {
  const isBasic = variant === "basic";
  const isPrimary = variant === "primary";
  const isSecondary = variant === "secondary";
  const isDogGroups = (leftGraphic === "goldenGroup" || leftGraphic === "terrierGroup") || (rightGraphic === "goldenGroup" || rightGraphic === "terrierGroup");
  const isDonate = variant === "donate";

  if (isDonate) {
    return <DonateHero title={title ? title : null} />;
  }
  return (
    <div
      className={`${className ? className : ``} border-b-[29px] border-primary`}
    >
      <div
        className={`${isPrimary ? `min-h-[450px]` : `h-fit`} ${
          isBasic ? "pb-0" : "pb-28 md:pb-40 lg:pb-0"
        } relative z-0 mx-auto flex max-w-screen-2xl flex-col items-center text-center md:flex-row`}
      >
        {leftGraphic ? (
          <div
            className={`${
              isBasic
                ? "-left-8 xs:-left-20 h-full max-w-full xs:max-w-[60%] md:-left-28 lg:-left-8 2xl:left-0"
                : (isDogGroups
                ? "-left-12 h-full max-w-[50%] self-start xs:-left-12 sm:-left-20 md:-left-16 2xl:left-0"
                : "-left-20 h-full max-w-[50%] self-start xs:-left-12 md:-left-16 2xl:left-0")
            } absolute bottom-0 flex w-full justify-start`}
          >
            <SideGraphic
              className={`${
                isBasic
                  ? "relative bottom-0 h-full max-h-full"
                  : (leftGraphic === "volunteerWalker"
                  ? "h-full max-h-[190px] md:max-h-[300px]"
                  : (isDogGroups
                  ? "absolute bottom-0 h-[250px] max-h-[30%] sm:max-h-[40%] md:max-h-[75%] lg:h-[300px]"
                  : "absolute bottom-0 h-[160px] max-h-[35%] sm:h-[225px] md:max-h-[75%] lg:h-[300px]"))
              }`}
              graphic={isBasic ? "" : leftGraphic}
            />
          </div>
        ) : null}
        <div
          className={`${
            isBasic ? "mx-auto py-12" : "mx-auto py-20"
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
        {rightGraphic ? (
          <div
            className={`${
              isBasic
                ? "-right-20 h-full hidden xs:flex max-w-[60%] md:-right-28 md:justify-end lg:-right-8 2xl:right-0"
                : (isDogGroups
                ? "-right-[5.5rem] h-full max-w-[50%] justify-end self-end xs:-right-12 sm:-right-[7.5rem] md:-right-16 2xl:right-0"
                : "-right-20 h-full max-w-[50%] justify-end self-end xs:-right-12 md:-right-16 2xl:right-0")
            } absolute bottom-0 flex w-full`}
          >
            <SideGraphic
              className={`${
                isBasic
                  ? "relative bottom-0 h-full max-h-full -scale-x-100"
                  : (rightGraphic === "volunteerWalker"
                  ? "h-full max-h-[190px] md:max-h-[300px]"
                  : (isDogGroups
                  ? "absolute bottom-0 h-[250px] max-h-[30%] -scale-x-100 sm:max-h-[40%] md:max-h-[75%] lg:h-[300px]"
                  : "absolute bottom-0 h-[160px] max-h-[35%] -scale-x-100 sm:h-[225px] md:max-h-[75%] lg:h-[300px]"))
              }`}
              graphic={
                isBasic
                  ? ""
                  : (rightGraphic === "volunteerWalker"
                  ? "volunteerWalkerRight"
                  : rightGraphic)
              }
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Hero;
