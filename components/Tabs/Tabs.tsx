import { Button } from "components/Button";
import { ReactNode, useState } from "react";
import clsx from "clsx";

export interface TabsProps {
  className?: string;
  tabs: [
    {
      name: string;
      content: ReactNode;
      slug: string;
    }
  ];
  activeTab?: number;
  variant?: "primary" | "secondary";
}

const Tabs = ({ className, tabs, activeTab, variant }: TabsProps) => {
  const [active, setActive] = useState(activeTab ? activeTab : 0);
  const isPrimary = variant === "primary";
  const isSecondary = variant === "secondary";
  const tabsLength = tabs.length;

  return (
    <div
      className={`${
        className ? className : ``
      } mx-auto flex max-w-4xl flex-col py-12`}
    >
      <div
        className={`relative grid ${
          isPrimary ? `grid-cols-3` : `grid-cols-2`
        } justify-center gap-6 `}
      >
        {isPrimary
          ? tabs.map(({ name, slug }) => {
              return (
                <button
                  key={slug}
                  className={`border-[1px] border-primary font-heading text-2xl ${
                    tabs.findIndex((tab) => tab.slug === slug) === active
                      ? `rounded-t-xl bg-primary px-4 py-2 text-white`
                      : `rounded-t-xl bg-primary-light px-4 py-2 text-black`
                  }`}
                  onClick={() =>
                    setActive(tabs.findIndex((tab) => tab.slug === slug))
                  }
                >
                  {name}
                </button>
              );
            })
          : tabs.map(({ name, slug }, i) => {
              return (
                <Button
                  variant={i === active ? "secondary" : "secondary-outline"}
                  className={`mx-auto w-fit`}
                  onClick={() =>
                    setActive(tabs.findIndex((tab) => tab.slug === slug))
                  }
                >
                  {name}
                </Button>
              );
            })}
      </div>
      <div className={`flex flex-col`}>
        {tabs.map(({ content, slug }) => {
          if (tabs.findIndex((tab) => tab.slug === slug) === active) {
            return content;
          }
        })}
      </div>
    </div>
  );
};

export default Tabs;
