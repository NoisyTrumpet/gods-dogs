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
// Impact Block:
const Impact = dynamic(() => import("components/Impact/Impact"), {
  ssr: true,
});
// Team Block:
const TeamMembers = dynamic(
  () => import("components/TeamMembers/TeamMembers"),
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
  Resource_Flexiblecontent_Blocks,
  Resource_Flexiblecontent_Blocks_Hero,
  Resource_Flexiblecontent_Blocks_TextImage,
  Resource_Flexiblecontent_Blocks_TextBlock,
  Resource_Flexiblecontent_Blocks_List,
  Resource_Flexiblecontent_Blocks_Quotes,
  Resource_Flexiblecontent_Blocks_PetCarousel,
  Resource_Flexiblecontent_Blocks_PostsBlock,
  Resource_Flexiblecontent_Blocks_Form,
  Resource_Flexiblecontent_Blocks_SplitText,
  Resource_Flexiblecontent_Blocks_Impact,
  Resource_Flexiblecontent_Blocks_FeaturedCards,
  Resource_Flexiblecontent_Blocks_Accordion,
  Resource_Flexiblecontent_Blocks_TeamMembers,
  AcfLink,
  AnimalConnectionEdge,
  RootQueryToAnimalConnectionEdge,
} from "graphql";

interface BlocksProps {
  blocks: Page_Flexiblecontent_Blocks[] | Resource_Flexiblecontent_Blocks[];
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
    | Page_Flexiblecontent_Blocks_AvailableDogs
    | Resource_Flexiblecontent_Blocks_Hero
    | Resource_Flexiblecontent_Blocks_TextImage
    | Resource_Flexiblecontent_Blocks_TextBlock
    | Resource_Flexiblecontent_Blocks_List
    | Resource_Flexiblecontent_Blocks_Quotes
    | Resource_Flexiblecontent_Blocks_PetCarousel
    | Resource_Flexiblecontent_Blocks_PostsBlock
    | Resource_Flexiblecontent_Blocks_Form
    | Resource_Flexiblecontent_Blocks_SplitText
    | Resource_Flexiblecontent_Blocks_Impact
    | Resource_Flexiblecontent_Blocks_FeaturedCards
    | Resource_Flexiblecontent_Blocks_Accordion
    | Resource_Flexiblecontent_Blocks_TeamMembers;
  animals?: RootQueryToAnimalConnectionEdge[];
  loadMore?: () => void;
  loading?: boolean;
  hasMore?: boolean;
  total?: number;
}
const prefixArr = [
  "Page_Flexiblecontent_Blocks_",
  "Event_Flexiblecontent_Blocks_",
  "Post_Flexiblecontent_Blocks_",
  "Resource_Flexiblecontent_Blocks_",
];


const Block = ({
  block,
  animals,
  loadMore,
  loading,
  hasMore,
  total,
}: BlockProps) => {
  const name = block && block.__typename;
  let component = name;

  const matchingPrefix = prefixArr.find((p) => component?.startsWith(p));
  if (matchingPrefix && component) {
    // @ts-ignore
    component = component?.substring(matchingPrefix.length);
  }


  switch (component) {
    // Hero
    case "Hero" as string: {
      return <Hero {...block as any} />;
    }
    // Form
    case "Form" as string: {
      return <Form {...block as any} />;
    }
    // Text Image
    case "TextImage" as string: {
      return (
        <TextImage {...block as any} />
      );
    }
    // Text Block
    case "TextBlock" as string: {
      return (
        <TextBlock {...block as any} />
      );
    }
    // FeaturedCards
    case "FeaturedCards" as string: {
      return (
        <FeaturedCards
          {...block as any}
        />
      );
    }
    // Accordion
    case "Accordion" as string: {
      return (
        <Accordion {...block as any} />
      );
    }
    // SplitText
    case "SplitText" as string: {
      return (
        <SplitText {...block as any} />
      );
    }
    // PetCarousel
    case "PetCarousel" as string: {
      return (
        <PetCarousel {...block as any} />
      );
    }
    // PetCarousel
    case "Impact" as string: {
      return <Impact {...block as any} />;
    }
    // TeamMembers
    case "TeamMembers" as string: {
      return (
        <TeamMembers {...block as any} />
      );
    }
    case "AvailableDogs" as string: {
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
            block={block as any}
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
