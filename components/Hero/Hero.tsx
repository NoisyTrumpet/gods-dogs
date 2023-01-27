import { Button } from "components/Button";
import { Page_Flexiblecontent_Blocks_Hero } from "graphql";
import SideGraphic from "./Fragments/SideGraphic";
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
  useDonationForm,
  variant,
}: HeroProps) => {
  const isBasic = variant === "basic";
  const isPrimary = variant === "primary";
  const isSecondary = variant === "secondary";

  return (
    <div
      className={`${className ? className : ``} ${
        isPrimary ? `min-h-[450px]` : `h-fit`
      } relative flex flex-col items-center border-b-[29px] border-primary text-center md:flex-row`}
    >
      {leftGraphic ? (
        <div className="absolute bottom-0 left-0 hidden h-full max-h-[70%] w-full justify-start md:flex">
          <SideGraphic className="" graphic={isBasic ? "" : leftGraphic} />
        </div>
      ) : null}
      <div className="container mx-auto w-full px-4 py-20 md:w-1/2">
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
          <div className="mt-8 flex flex-col items-center space-y-4">
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
        <div className="bottom-0 right-0 flex h-full max-h-[70%] w-full justify-center md:absolute md:justify-end">
          <SideGraphic
            className="-scale-x-100"
            graphic={isBasic ? "" : rightGraphic}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Hero;
