import { gql } from "@apollo/client";
import { MEDIA_ITEM_FRAGMENT } from "./MediaItemFragment";

export const SITE_SETTINGS_FRAGMENT = gql`
  fragment SiteSettingsFragment on SiteSettings {
    siteSettings {
      customAddressLabel
      turnOnAnnouncements
      announcements {
        backgroundColor
        content
        ctaType
        cta {
          title
          url
          target
        }
      }
      email {
        target
        title
        url
      }
      cta {
        target
        title
        url
      }
      address {
        city
        country
        latitude
        longitude
        placeId
        stateShort
        streetAddress
        streetName
        streetNumber
        postCode
        state
      }
      phoneNumber {
        target
        title
        url
      }
      logo {
        ...MediaItemFragment
      }
      logoAlt {
        ...MediaItemFragment
      }
      logoWhite {
        ...MediaItemFragment
      }
    }
  }
  ${MEDIA_ITEM_FRAGMENT}
`;
