import { gql } from "@apollo/client";
import { MEDIA_ITEM_FRAGMENT } from "./MediaItemFragment";

export const EVENTS_FRAGMENT = gql`
  fragment EventsFragment on RootQueryToEventConnection {
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
        eventOptions {
          date
          dateRange {
            date
          }
          multipleDays
          featured
        }
      }
    }
  }
  ${MEDIA_ITEM_FRAGMENT}
`;
