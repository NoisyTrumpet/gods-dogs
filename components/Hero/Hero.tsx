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
  const isDonate = variant === "donate";

  if (isDonate) {
    return <DonateHero title={title ? title : null} />;
  }
  return (
    <div
      className={`${className ? className : ``} border-b-[29px] border-primary`}
    >
      <div
        className={`${
          isPrimary ? `min-h-[450px]` : `h-fit`
        } relative z-0 mx-auto flex max-w-screen-2xl flex-col items-center pb-28 text-center md:flex-row md:pb-0`}
      >
        {leftGraphic ? (
          <div
            className={`${
              isBasic
                ? "-left-96 h-full md:-left-28 lg:-left-8 2xl:left-0 "
                : "-left-20 h-[250px] self-start xs:-left-12 md:-left-16 md:h-full 2xl:left-0"
            } absolute bottom-0 flex w-full max-w-[50%] justify-start md:max-h-[80%]`}
          >
            <SideGraphic
              className={`${
                isBasic
                  ? "absolute bottom-0 h-[250px] max-h-full md:h-[300px] "
                  : "absolute bottom-0 h-[250px] max-h-[80%] md:h-[300px]"
              }`}
              graphic={isBasic ? "" : leftGraphic}
            />
          </div>
        ) : null}
        <div
          className={`${
            isBasic ? "mx-auto" : "mx-auto"
          } container z-10 w-full px-4 py-20 md:w-1/2`}
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
                ? "-right-[14%] h-full md:-right-28 md:justify-end lg:-right-8 2xl:right-0"
                : "-right-24 h-[250px] justify-end self-end xs:-right-12 md:-right-16 md:h-full 2xl:right-0"
            } absolute bottom-0 flex w-full max-w-[50%] md:max-h-[80%]`}
          >
            <SideGraphic
              className={`${
                isBasic
                  ? "absolute bottom-0 h-[250px] max-h-full -scale-x-100 md:h-[300px]"
                  : rightGraphic === "volunteerWalker"
                  ? "h-full max-h-[300px]"
                  : "absolute bottom-0 h-[250px] max-h-[80%] -scale-x-100 md:h-[300px]"
              }`}
              graphic={
                isBasic
                  ? ""
                  : rightGraphic === "volunteerWalker"
                  ? "volunteerWalkerRight"
                  : rightGraphic
              }
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Hero;
