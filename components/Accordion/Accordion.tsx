import {
  Page_Flexiblecontent_Blocks_Accordion,
  Page_Flexiblecontent_Blocks_Accordion_ItemRepeater,
} from "graphql";
import AccordionFragment from "./Fragments/AccordionFragment";
import { FeaturedImage } from "components/FeaturedImage";

interface AccordionProps extends Page_Flexiblecontent_Blocks_Accordion {
  className?: string;
}

const Accordion = ({
  className,
  title,
  sectionCopy,
  itemRepeater,
  headingIcon,
  hasHeadingIcon,
}: AccordionProps) => {
  const hasItems  = itemRepeater && itemRepeater.length > 0;

  return (
    <section className={`${className} w-full`}>
      <div className={`${className} container mx-auto flex flex-col gap-6`}>
        {hasHeadingIcon ? (
          <div className={`flex justify-center`}>
            <FeaturedImage image={headingIcon} className={`w-24`} />
          </div>
        ) : null}
        {title ? (
          <h2 className={`text-center font-heading text-5xl text-dark`}>
            {title}
          </h2>
        ) : null}
        {sectionCopy ? (
          <div dangerouslySetInnerHTML={{ __html: sectionCopy }} />
        ) : null}

        {hasItems ? (
          <ul>
            {itemRepeater.map((item, i) => {
              return (
                <AccordionFragment
                className={`mb-8`}
                title={item?.title}
                content={item?.itemContent ?? ``}
                i={i}
                open={i === 0}
                key={`${i}-question`}
              />
              )
            })}
          </ul>
        ) : null}
      </div>
    </section>
  );
};

export default Accordion;
