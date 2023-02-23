import { gql } from "@apollo/client";
import { MEDIA_ITEM_FRAGMENT } from "./MediaItemFragment";

export const ANIMALS_FRAGMENT = gql`
  fragment AnimalsFragment on RootQueryToAnimalConnection {
    pageInfo {
      endCursor
      hasNextPage
      total
    }
    edges {
      node {
        id
        title
        uri
        content
        featuredImage {
          node {
            ...MediaItemFragment
          }
        }
        animalDetails {
          animalName
          animalNid
          animalBirthday
          animalSex
          animalUniqueId
          animalWeight
          animalPhotoGallery {
            photo
          }
        }
        petAttributes {
          nodes {
            slug
            termTaxonomyId
            name
          }
        }
        primaryBreeds {
          nodes {
            slug
            termTaxonomyId
            name
          }
        }
        secondaryBreeds {
          nodes {
            slug
            termTaxonomyId
            name
          }
        }
        weightGroups {
          nodes {
            slug
            termTaxonomyId
            name
          }
        }
        ageGroups {
          nodes {
            slug
            termTaxonomyId
            name
          }
        }
      }
    }
  }
  ${MEDIA_ITEM_FRAGMENT}
`;
