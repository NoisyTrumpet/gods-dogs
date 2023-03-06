import { AnimatePresence, LazyMotion, m } from "framer-motion";
import { useState } from "react";
const loadFeatures = () =>
  import("utilities/framerFeatures.js").then((res) => res.default);

export interface FilterAccordionProps {
  className?: string;
  title?: string | null;
  content?: string;
  i?: number;
  open?: boolean;
  children?: React.ReactNode;
}

const FilterAccordion = ({
  className,
  title,
  content,
  i,
  open,
  children,
}: FilterAccordionProps) => {
  const [expanded, setExpanded] = useState(false || open);

  return (
    <LazyMotion features={loadFeatures}>
      <m.li
        className={`${className} flex w-full cursor-pointer flex-col overflow-hidden border-b border-gray-300 py-2 transition-all duration-500 ease-in-out`}
      >
        {title ? (
          <m.header className={`flex items-center justify-between`}>
            <h2 className={`max-w-[90%] text-lg text-dark md:text-2xl`}>
              {title}
            </h2>
            <button
              type="button"
              aria-label={`
                ${expanded ? `Collapse` : `Expand`}
            `}
              className={`px-4 py-2 font-body text-2xl`}
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? `-` : `+`}
            </button>
          </m.header>
        ) : null}
        <AnimatePresence initial={false}>
          {expanded ? (
            <m.section
              className={`font-body text-lg text-gray-800`}
              key="content"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: "auto" },
                collapsed: { opacity: 0, height: 0 },
              }}
              transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
            >
              {children}
            </m.section>
          ) : null}
        </AnimatePresence>
      </m.li>
    </LazyMotion>
  );
};

export default FilterAccordion;
