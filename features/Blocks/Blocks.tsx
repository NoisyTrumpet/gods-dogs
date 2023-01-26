import dynamic from "next/dynamic";
// Hero: (Non dynamic import) Above the fold content
import { Hero } from "components";
// Dynamic Imports: Below the fold content
const Form = dynamic(() => import("components/Form/Form"), {
  ssr: true,
});
// Text Image:
// @ts-ignore
const TextImage = dynamic(() => import("components/TextImage/TextImage"), {
  ssr: true,
});
// Text Block:
// @ts-ignore
const TextBlock = dynamic(() => import("components/TextBlock/TextBlock"), {
  ssr: true,
});

import {
  Page_Flexiblecontent_Blocks,
  Page_Flexiblecontent_Blocks_Hero,
  Page_Flexiblecontent_Blocks_TextImage,
  Page_Flexiblecontent_Blocks_TextBlock,
  Page_Flexiblecontent_Blocks_List,
  Page_Flexiblecontent_Blocks_Quotes,
  Page_Flexiblecontent_Blocks_PetCarousel,
  Page_Flexiblecontent_Blocks_PostsBlock,
  Page_Flexiblecontent_Blocks_Form,
  Page_Flexiblecontent_Blocks_DonateBlock,
  Page_Flexiblecontent_Blocks_Impact,
  Page_Flexiblecontent_Blocks_FeaturedCards,
  Page_Flexiblecontent_Blocks_Accordion,
  AcfLink,
} from "graphql";

interface BlocksProps {
  blocks: Page_Flexiblecontent_Blocks[];
}

interface BlockProps {
  block:
    | Page_Flexiblecontent_Blocks_Hero
    | Page_Flexiblecontent_Blocks_TextImage
    | Page_Flexiblecontent_Blocks_TextBlock
    | Page_Flexiblecontent_Blocks_List
    | Page_Flexiblecontent_Blocks_Quotes
    | Page_Flexiblecontent_Blocks_PetCarousel
    | Page_Flexiblecontent_Blocks_PostsBlock
    | Page_Flexiblecontent_Blocks_Form
    | Page_Flexiblecontent_Blocks_DonateBlock
    | Page_Flexiblecontent_Blocks_Impact
    | Page_Flexiblecontent_Blocks_FeaturedCards
    | Page_Flexiblecontent_Blocks_Accordion;
}
const prefix =
  "Page_Flexiblecontent_Blocks_" ||
  "Event_Flexiblecontent_Blocks_" ||
  "Post_Flexiblecontent_Blocks_" ||
  "Resource_Flexiblecontent_Blocks_";

const Block = ({ block }: BlockProps) => {
  const { __typename } = block ?? {};

  let name = __typename && __typename.replace(prefix, "");

  switch (name) {
    // Hero
    case "Hero": {
      return <Hero {...(block as Page_Flexiblecontent_Blocks_Hero)} />;
    }
    // Form
    case "Form": {
      return <Form {...(block as Page_Flexiblecontent_Blocks_Form)} />;
    }
    // Text Image
    case "TextImage": {
      return (
        <TextImage {...(block as Page_Flexiblecontent_Blocks_TextImage)} />
      );
    }
    // Text Block
    case "TextBlock": {
      return (
        <TextBlock {...(block as Page_Flexiblecontent_Blocks_TextBlock)} />
      );
    }

    default: {
      return <div className="block font-heading text-primary">{name}</div>;
    }
  }
};

const Blocks = ({ blocks = [] }: BlocksProps): JSX.Element => {
  return (
    <>
      {blocks &&
        blocks.map((block, index) => (
          <Block block={block} key={`block-${index}`} />
        ))}
    </>
  );
};

export default Blocks;
