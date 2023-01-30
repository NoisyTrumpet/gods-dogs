import { gql } from "@apollo/client";
import { MEDIA_ITEM_FRAGMENT } from "./MediaItemFragment";
import { SEO_FRAGMENT } from "./SEOFragment";

export const SINGLE_EVENT_FRAGMENT = gql`
  fragment SingleEventFragment on Event {
    id
    title
    seo {
      ...SEOFragment
    }
    featuredImage {
      node {
        ...MediaItemFragment
      }
    }
    eventOptions {
      multipleDays
      featured
      dateRange {
        date
      }
      date
      customAddressLabel
      address {
        city
        country
        countryShort
        latitude
        longitude
        placeId
        postCode
        state
        stateShort
        streetAddress
        streetName
        streetNumber
        zoom
      }
      schedule {
        startTime
        label
        endTime
      }
    }
    content
  }
  ${MEDIA_ITEM_FRAGMENT}
  ${SEO_FRAGMENT}
`;
