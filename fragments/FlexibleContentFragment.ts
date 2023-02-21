import { gql } from "@apollo/client";
import { MEDIA_ITEM_FRAGMENT } from "./MediaItemFragment";

export const FLEXIBLE_CONTENT_FRAGMENT = gql`
  fragment FlexibleContentFragment on Page_Flexiblecontent {
    blocks {
      ... on Page_Flexiblecontent_Blocks_Hero {
        fieldGroupName
        hasCtas
        variant
        title
        subtitle
        ctas {
          link {
            target
            title
            url
          }
          type
        }
        oneTime {
          title
          oneTimeOptions {
            id
            label
          }
        }
        monthly {
          monthlyOptions {
            id
            label
          }
          title
        }
        rightGraphic
        leftGraphic
      }
      ... on Page_Flexiblecontent_Blocks_TextImage {
        fieldGroupName
        textImageRepeater {
          content
          title
          pawsIconPostion
          imageSide
          hasSidePawsIcon
          hasCtas
          backgroundColor
          ctaRepeater {
            type
            ctaLink {
              target
              title
              url
            }
          }
          paddingTop
          paddingBottom
          sectionImage {
            ...MediaItemFragment
          }
        }
      }
      ... on Page_Flexiblecontent_Blocks_TextBlock {
        fieldGroupName
        paragraphs {
          backgroundColor
          content
          contentAlignment
          hasCtas
          hasHeadingIcon
          title
          ctaRepeater {
            type
            ctaLink {
              target
              title
              url
            }
          }
          headingIcon {
            ...MediaItemFragment
          }
        }
      }
      ... on Page_Flexiblecontent_Blocks_List {
        backgroundColor
        fieldGroupName
        variant
        itemRepeater {
          title
          price
          content
          backgroundColor
          link {
            target
            title
            url
          }
        }
      }
      ... on Page_Flexiblecontent_Blocks_Quotes {
        fieldGroupName
        pawIconPosition
        quote
        subtext
        title
      }
      ... on Page_Flexiblecontent_Blocks_PetCarousel {
        fieldGroupName
        title

        pets {
          ... on Animal {
            id
            uri
            title
            content
            featuredImage {
              node {
                ...MediaItemFragment
              }
            }
            databaseId
            animalDetails {
              animalBirthday
              animalName
              animalNid
              animalWeight
              animalUniqueId
              animalSex
              animalPhotoGallery {
                photo
              }
            }
          }
        }
        variant
      }
      ... on Page_Flexiblecontent_Blocks_PostsBlock {
        fieldGroupName
        hasPawIcon
        variant
        title
        pawIconPosition
        postsGrid {
          ... on Post {
            id
            title
            uri
            excerpt
            featuredImage {
              node {
                ...MediaItemFragment
              }
            }
          }
        }
        postsStatic {
          ... on Post {
            id
            title
            uri
            excerpt
            featuredImage {
              node {
                ...MediaItemFragment
              }
            }
          }
        }
      }
      ... on Page_Flexiblecontent_Blocks_Form {
        content
        fieldGroupName
        form
        title
      }
      ... on Page_Flexiblecontent_Blocks_SplitText {
        variant
        hasPawIcon
        pawIconPosition
        title
        cardRepeater {
          title
          content
          linkType
          link {
            title
            url
            target
          }
        }
      }
      ... on Page_Flexiblecontent_Blocks_Impact {
        fieldGroupName
        hasHeadingIcon
        title
        variant
        impactItems {
          impactIcon {
            ...MediaItemFragment
          }
          impactNumber
          subtext
        }
        headingIcon {
          ...MediaItemFragment
        }
      }
      ... on Page_Flexiblecontent_Blocks_FeaturedCards {
        backgroundColor
        dividerLines
        title
        hasHeadingIcon
        hasCtas
        cardRepeater {
          contentAligned
          cardBackgroundColor
          cardContent
          cardHasLink
          cardTitle
          hasCardIcon
          buttonType
          cardLink {
            target
            title
            url
          }
          cardIcon {
            ...MediaItemFragment
          }
        }
        ctaRepeater {
          type
          ctaLink {
            target
            title
            url
          }
        }
        headingIcon {
          ...MediaItemFragment
        }
      }
      ... on Page_Flexiblecontent_Blocks_Accordion {
        backgroundColor
        fieldGroupName
        title
        sectionCopy
        hasHeadingIcon
        headingIcon {
          ...MediaItemFragment
        }
        itemRepeater {
          title
          itemContent
          hasCtas
          ctaRepeater {
            ctaLink {
              target
              title
              url
            }
          }
        }
      }
    }
  }
  ${MEDIA_ITEM_FRAGMENT}
`;
