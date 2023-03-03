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
// FeaturedCards Block:
// @ts-ignore
const FeaturedCards = dynamic(
  () => import("components/FeaturedCards/FeaturedCards"),
  {
    ssr: true,
  }
);
// Accordion Block:
const Accordion = dynamic(() => import("components/Accordion/Accordion"), {
  ssr: true,
});
// Split Text:
const SplitText = dynamic(() => import("components/SplitText/SplitText"), {
  ssr: true,
});
// Pet Carousel Block:
const PetCarousel = dynamic(
  () => import("components/PetCarousel/PetCarousel"),
  {
    ssr: true,
  }
);
// Available Dogs Block:
const AvailableDogs = dynamic(
  () => import("components/AvailalbeDogs/AvailableDogs"),
  {
    ssr: true,
  }
);

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
  Page_Flexiblecontent_Blocks_Impact,
  Page_Flexiblecontent_Blocks_FeaturedCards,
  Page_Flexiblecontent_Blocks_Accordion,
  Page_Flexiblecontent_Blocks_TeamMembers,
  Page_Flexiblecontent_Blocks_EventBlock,
  Page_Flexiblecontent_Blocks_SplitText,
  Page_Flexiblecontent_Blocks_AvailableDogs,
  AnimalConnectionEdge,
  RootQueryToAnimalConnectionEdge,
} from "graphql";

interface BlocksProps {
  blocks: Page_Flexiblecontent_Blocks[];
  animals?: RootQueryToAnimalConnectionEdge[];
  loadMore?: () => void;
  loading?: boolean;
  hasMore?: boolean;
  total?: number;
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
    | Page_Flexiblecontent_Blocks_Impact
    | Page_Flexiblecontent_Blocks_FeaturedCards
    | Page_Flexiblecontent_Blocks_Accordion
    | Page_Flexiblecontent_Blocks_TeamMembers
    | Page_Flexiblecontent_Blocks_EventBlock
    | Page_Flexiblecontent_Blocks_SplitText
    | Page_Flexiblecontent_Blocks_AvailableDogs;
  animals?: RootQueryToAnimalConnectionEdge[];
  loadMore?: () => void;
  loading?: boolean;
  hasMore?: boolean;
  total?: number;
}
const prefix =
  "Page_Flexiblecontent_Blocks_" ||
  "Event_Flexiblecontent_Blocks_" ||
  "Post_Flexiblecontent_Blocks_" ||
  "Resource_Flexiblecontent_Blocks_";

const Block = ({
  block,
  animals,
  loadMore,
  loading,
  hasMore,
  total,
}: BlockProps) => {
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
    // FeaturedCards
    case "FeaturedCards": {
      return (
        <FeaturedCards
          {...(block as Page_Flexiblecontent_Blocks_FeaturedCards)}
        />
      );
    }
    // Accordion
    case "Accordion": {
      return (
        <Accordion {...(block as Page_Flexiblecontent_Blocks_Accordion)} />
      );
    }
    // SplitText
    case "SplitText": {
      return (
        <SplitText {...(block as Page_Flexiblecontent_Blocks_SplitText)} />
      );
    }
    // PetCarousel
    case "PetCarousel": {
      return (
        <PetCarousel {...(block as Page_Flexiblecontent_Blocks_PetCarousel)} />
      );
    }
    case "AvailableDogs": {
      return (
        <AvailableDogs
          animals={animals as RootQueryToAnimalConnectionEdge[]}
          loadMore={loadMore}
          loading={loading}
          hasMore={hasMore}
          total={total as number}
        />
      );
    }
    default: {
      return (
        <div className="block text-center font-heading text-3xl text-primary">{`${name} (component in development)`}</div>
      );
    }
  }
};

const Blocks = ({
  blocks,
  animals = [],
  loadMore,
  loading,
  hasMore,
  total,
}: BlocksProps): JSX.Element => {
  return (
    <>
      {blocks &&
        blocks.map((block, index) => (
          <Block
            block={block}
            key={`block-${index}`}
            animals={animals as any}
            loadMore={loadMore}
            loading={loading}
            hasMore={hasMore}
            total={total}
          />
        ))}
    </>
  );
};

export default Blocks;
