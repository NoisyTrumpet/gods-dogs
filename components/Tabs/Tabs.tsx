import { ReactNode, useState } from "react";

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
}

const Tabs = ({ className, tabs, activeTab }: TabsProps) => {
  const [active, setActive] = useState(activeTab ? activeTab : 0);

  return (
    <div
      className={`${
        className ? className : ``
      } mx-auto flex max-w-4xl flex-col`}
    >
      <div className={`relative grid grid-cols-3 justify-center gap-6 `}>
        {tabs.map(({ name, slug }) => {
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
