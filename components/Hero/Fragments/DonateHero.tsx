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
      <div className="container relative z-0 mx-auto flex min-h-[450px] flex-col items-center text-center md:flex-row">
        <div className="absolute bottom-0 left-0 hidden h-full max-h-[85%] w-full justify-start md:flex">
          <SideGraphic className="" graphic={"donateShihTzu"} />
        </div>
        <div className="container z-10 mx-auto w-full px-4 py-20 md:w-1/2">
          {title ? (
            <h1 className={`font-heading text-5xl leading-none text-dark`}>
              {title}
            </h1>
          ) : null}
          {/* <GravityForm form={"Donate"} formId={1} /> */}
        </div>
        <div className="absolute bottom-0 right-0 flex h-fit w-full max-w-[60%] justify-end  md:h-full md:max-h-[85%]">
          <SideGraphic className="-scale-x-100" graphic={"donateAfghan"} />
        </div>
      </div>
    </div>
  );
};

export default DonateHero;
