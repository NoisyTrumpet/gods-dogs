import { Button } from "components/Button";
import { Page_Flexiblecontent_Blocks_Hero } from "graphql";
import SideGraphic from "./Fragments/SideGraphic";
import styles from "./Hero.module.css";

// import BasicGraphic from "public/hero-assets/paw-hero-asset.svg";
// import DogGroup1 from "public/hero-assets/dog-group-1.svg";
// import DogGroup2 from "public/hero-assets/dog-group-2.svg";

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
      className={`${
        className ? className : ``
      } ${isPrimary ? `min-h-[450px]` : `h-fit`} relative mb-8 border-b-[29px] border-primary text-center flex flex-col md:flex-row items-center`}
    >
      {leftGraphic ? (
        <div className="absolute bottom-0 left-0 hidden h-full w-full md:flex justify-start max-h-[70%]">
          <SideGraphic className="" graphic={isBasic ? "" : leftGraphic} />
        </div>
      ) : null}
      <div className="container mx-auto px-4 py-20 w-full md:w-1/2">
        {title ? (
          <h1 className={`font-heading text-5xl leading-none text-dark`}>
            {title}
          </h1>
        ) : null}
        {subtitle ? (
          <p className={`font-heading text-2xl text-dark`}>{subtitle}</p>
        ) : null}
        {hasCtas ? (
          <div className="flex flex-col items-center mt-8 space-y-4">
            {ctas?.map(({link, type}: any) => (
              <Button
                key={link.title}
                href={link?.url}
                target={link?.target}
                type={type}
              >
                {link?.title}
              </Button>
            ))}
          </div>
        ) : null}
      </div>
      {rightGraphic ? (
        <div className="bottom-0 right-0 flex h-full w-full justify-center md:absolute md:justify-end max-h-[70%]">
          <SideGraphic className="-scale-x-100"  graphic={isBasic ? "" : rightGraphic} />
        </div>
      ) : null}
    </div>
  );
};

export default Hero;
