import { gql } from "@apollo/client";
import { MEDIA_ITEM_FRAGMENT } from "./MediaItemFragment";

export const FLEXIBLE_CONTENT_FRAGMENT = gql`
  fragment FlexibleContentFragment on Page_Flexiblecontent {
    blocks {
      ... on Page_Flexiblecontent_Blocks_Hero {
        fieldGroupName
        hasCtas
        variant
        useDonationForm
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
        rightGraphic {
          ...MediaItemFragment
        }
        leftGraphic {
          ...MediaItemFragment
        }
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
            ctaLink {
              target
              title
              url
            }
          }
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
            ctaLink {
              target
              title
              url
            }
          }
          headingPostion {
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
            featuredImage {
              node {
                ...MediaItemFragment
              }
            }
            animalId
            animalDetails {
              animalWeightUnits
              animalWeightGroup
              animalWeight
              animalUniqueId
              animalSpecies
              animalSex
              animalSecondaryColor
              animalSecondaryBreed
              animalPublicUrl
              animalPrimaryColor
              animalPhotoGallery {
                photo
              }
              animalNid
              animalName
              animalIntakeDate
              animalCoverPhoto
              animalBreed
              animalBirthday
              animalAgeGroup
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
      ... on Page_Flexiblecontent_Blocks_DonateBlock {
        fieldGroupName
        hasPawIcon
        title
        pawIconPosition
        variant
        cardRepeater {
          donateContent
          donateLink {
            target
            title
            url
          }
          title
        }
      }
      ... on Page_Flexiblecontent_Blocks_Impact {
        fieldGroupName
        hasHeadingIcon
        title
        variant
        impactItems {
          impactIcon
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
          cardBackgroundColor
          cardContent
          cardHasLink
          cardTitle
          hasCardIcon
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
      }
    }
  }
  ${MEDIA_ITEM_FRAGMENT}
`;
