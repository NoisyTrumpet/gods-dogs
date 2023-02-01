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
        } relative z-0 mx-auto flex max-w-screen-2xl flex-col items-center text-center md:flex-row`}
      >
        {leftGraphic ? (
          <div
            className={`${
              isBasic
                ? "-left-96 md:-left-12 md:flex lg:-left-8 2xl:left-0"
                : "-left-16 hidden lg:flex 2xl:left-0"
            } absolute bottom-0 h-full w-full max-w-[60vw] justify-start md:max-h-[80%]`}
          >
            <SideGraphic
              className={`${
                isBasic
                  ? "absolute bottom-0 h-[300px] max-h-full"
                  : "absolute bottom-0 h-[300px] max-h-[80%]"
              }`}
              graphic={isBasic ? "" : leftGraphic}
            />
          </div>
        ) : null}
        <div
          className={`${
            isBasic ? "mx-auto" : "mx-auto md:ml-4 lg:mx-auto"
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
                ? "absolute -right-[25vw] h-full md:-right-12 lg:-right-8 2xl:right-0"
                : "relative -right-16 -mt-32 h-[250px] self-end md:absolute md:mt-auto md:h-full 2xl:right-0"
            } bottom-0 w-full max-w-[65%] justify-end md:flex md:max-h-[80%]`}
          >
            <SideGraphic
              className={`${
                isBasic
                  ? "absolute bottom-0 h-[300px] max-h-full -scale-x-100"
                  : rightGraphic === "volunteerWalker"
                  ? "h-full max-h-[300px]"
                  : "absolute bottom-0 h-[300px] max-h-[80%] -scale-x-100"
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
