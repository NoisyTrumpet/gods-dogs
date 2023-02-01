import SideGraphic from "./SideGraphic";
// import GravityForm from "components/GravityForm";

export interface DonateHeroProps {
  className?: string;
  title?: string | null;
}

const DonateHero = ({ className, title }: DonateHeroProps) => {
  return (
    <div
      className={`${className ? className : ``} border-b-[29px] border-primary`}
    >
      <div className="relative z-0 mx-auto flex min-h-[450px] max-w-screen-2xl flex-col items-center text-center md:flex-row">
        <div className="absolute bottom-0 -left-8 hidden h-full max-h-[90%] w-fit justify-start lg:flex 2xl:left-0">
          <SideGraphic
            className="absolute bottom-0 h-full max-h-[400px]"
            graphic={"donateShihTzu"}
          />
        </div>
        <div className="container z-10 mx-auto mb-56 w-full px-4 py-20 md:ml-4 md:mb-auto md:w-1/2 lg:mx-auto">
          {title ? (
            <h1 className={`font-heading text-5xl leading-none text-dark`}>
              {title}
            </h1>
          ) : null}
          {/* <GravityForm form={"Donate"} formId={1} /> */}
        </div>
        <div className="absolute bottom-0 -right-8 flex h-full w-fit max-w-[90%] justify-end md:h-full 2xl:right-0">
          <SideGraphic
            className="absolute bottom-0 h-full max-h-[400px] -scale-x-100"
            graphic={"donateAfghan"}
          />
        </div>
      </div>
    </div>
  );
};

export default DonateHero;
