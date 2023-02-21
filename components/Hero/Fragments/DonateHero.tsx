import {
  Page_Flexiblecontent_Blocks_Hero_Monthly,
  Page_Flexiblecontent_Blocks_Hero_OneTime,
} from "graphql";
import SideGraphic from "./SideGraphic";
import DonationForm from "features/DonationForm/DonationForm";

export interface DonateHeroProps {
  className?: string;
  title?: string | null;
  oneTime: Page_Flexiblecontent_Blocks_Hero_OneTime;
  monthly: Page_Flexiblecontent_Blocks_Hero_Monthly;
}

const DonateHero = ({
  className,
  title,
  monthly,
  oneTime,
}: DonateHeroProps) => {
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
        <div className="container z-10 mx-auto mb-56 flex w-full flex-col gap-8 px-4 py-20 md:ml-4 md:mb-auto md:w-1/2 lg:mx-auto">
          {title ? (
            <h1 className={`font-heading text-5xl leading-none text-dark`}>
              {title}
            </h1>
          ) : null}
          <DonationForm variant="hero" oneTime={oneTime} monthly={monthly} />
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
