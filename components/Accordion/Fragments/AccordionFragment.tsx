import { AnimatePresence, m, LazyMotion } from "framer-motion";
import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { AiOutlineMinus } from "react-icons/ai";

const loadFeatures = () =>
  import("utilities/framerFeatures.js").then((res) => res.default);

export interface AccordionProps {
  className?: string;
  title?: string | null;
  content?: string;
  i?: number;
  open?: boolean;
}

const AccordionFragment = ({
  className,
  title,
  content,
  i,
  open,
}: AccordionProps) => {
  const [expanded, setExpanded] = useState(false || open);

  return (
    <LazyMotion features={loadFeatures}>
      <m.li
        className={`${className} mx-4 flex cursor-pointer flex-col overflow-hidden rounded-xl bg-[#F4F4F4] p-4 transition-all duration-500 ease-in-out md:mx-auto md:max-w-4xl`}
        onClick={() => setExpanded(!expanded)}
      >
        {title ? (
          <m.header className={`flex items-center justify-between`}>
            <h2
              className={`max-w-[90%] font-heading text-lg text-dark md:text-2xl`}
            >
              {title}
            </h2>
            {expanded ? (
              <AiOutlineMinus className={`w-8 text-secondary`} />
            ) : (
              <BsPlusLg className={`w-8 text-secondary`} />
            )}
          </m.header>
        ) : null}
        <AnimatePresence initial={false}>
          {expanded && content ? (
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
              <m.div
                variants={{ collapsed: { scale: 0.9 }, open: { scale: 1 } }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className={`mt-4`}
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </m.div>
            </m.section>
          ) : null}
        </AnimatePresence>
      </m.li>
    </LazyMotion>
  );
};

export default AccordionFragment;
