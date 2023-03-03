import { useState, useMemo } from "react";
import {
  Page_Flexiblecontent_Blocks_Hero_OneTime,
  Page_Flexiblecontent_Blocks_Hero_Monthly,
} from "graphql";
import { AnimatePresence, motion, useIsPresent } from "framer-motion";
import DonationOption from "./Fragments/DonationOption";
import { Button } from "components/Button";
import SubmitIcon from "public/icons/submit-icon.svg";

interface DonationFormProps {
  variant?: string;
  oneTime?: Page_Flexiblecontent_Blocks_Hero_OneTime;
  monthly?: Page_Flexiblecontent_Blocks_Hero_Monthly;
}

const DonationForm: React.FC<DonationFormProps> = ({
  variant,
  oneTime,
  monthly,
}) => {
  const [selectedOption, setSelectedOption] = useState(
    oneTime && oneTime.oneTimeOptions ? oneTime.oneTimeOptions[0] : null
  );
  const [activeTab, setActiveTab] = useState<"one-time" | "monthly">(
    "one-time"
  );

  const handleOptionClick = (option: any) => {
    setSelectedOption(option);
  };

  const handleTabClick = (tab: "one-time" | "monthly") => {
    setActiveTab(tab);
  };

  const options = useMemo(() => {
    return activeTab === "one-time"
      ? oneTime?.oneTimeOptions || []
      : monthly?.monthlyOptions || [];
  }, [activeTab, oneTime, monthly]);

  let isPresent = useIsPresent();

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col">
      {/* Tabs */}
      <div className="flex w-full flex-col justify-center gap-6 overflow-hidden">
        <div className={`overflow-hidden rounded-full font-body font-bold`}>
          <button
            className={`${
              activeTab === "one-time"
                ? "bg-primary text-white"
                : "bg-white text-primary"
            } w-1/2 rounded-tl-full rounded-bl-full border border-primary px-4 py-4 transition-all duration-200 ease-in-out hover:underline`}
            onClick={() => handleTabClick("one-time")}
          >
            One Time
          </button>
          <button
            className={`${
              activeTab === "monthly"
                ? "bg-primary text-white"
                : "bg-white text-primary"
            } w-1/2 rounded-tr-full rounded-br-full border border-primary px-4 py-4 transition-all duration-200 ease-in-out hover:underline`}
            onClick={() => handleTabClick("monthly")}
          >
            Monthly
          </button>
        </div>
        <form
          action="/api/stripe/donation"
          className={`flex flex-col items-center gap-4`}
        >
          <input type="hidden" name="type" value={activeTab} />
          <div className={`grid h-fit grid-cols-2 gap-4 overflow-hidden`}>
            {options.map((option, index) => (
              <motion.div
                key={option?.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  opacity: { duration: 0.5 },
                }}
                style={{
                  position: isPresent ? "relative" : "absolute",
                  top: isPresent ? 0 : -100,
                  left: isPresent ? 0 : -100,
                  originX: 0,
                }}
              >
                <DonationOption
                  key={index}
                  option={option}
                  isActive={selectedOption?.id === option?.id}
                  onClick={() => handleOptionClick(option)}
                />
              </motion.div>
            ))}
          </div>
          <Button
            variant="secondary-outline"
            type="submit"
            className="group relative flex w-full max-w-md items-center justify-center py-4"
            disabled={!selectedOption}
          >
            <span>Submit</span>
            <SubmitIcon className="absolute right-2" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default DonationForm;
