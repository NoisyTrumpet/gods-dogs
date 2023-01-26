import { Page_Flexiblecontent_Blocks_Hero } from "graphql";
import BasicGraphic from "public/hero-assets/paw-hero-asset.svg";
import styles from "./Hero.module.css";
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

  return (
    <div
      className={`${
        className ? className : ``
      } relative mb-8 border-b-[29px] border-primary text-center`}
    >
      {isBasic ? (
        <div className="absolute top-0 left-0 hidden h-full w-full xl:flex">
          <BasicGraphic className="justify-start" />
        </div>
      ) : null}
      <div className="container mx-auto px-4 py-20">
        {title ? (
          <h1 className={`font-heading text-5xl leading-none text-dark`}>
            {title}
          </h1>
        ) : null}
        {subtitle ? (
          <p className={`font-body text-xl text-dark`}>{subtitle}</p>
        ) : null}
      </div>
      {isBasic ? (
        <div className="top-0 right-0 flex h-full w-full justify-center xl:absolute xl:justify-end">
          <BasicGraphic
            className={`${styles[`hero-svg-basic`]} w-full xl:w-auto`}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Hero;
