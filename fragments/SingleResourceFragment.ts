import { gql } from "@apollo/client";
import { MEDIA_ITEM_FRAGMENT } from "./MediaItemFragment";
import { SEO_FRAGMENT } from "./SEOFragment";
import { RESOURCE_FLEXIBLE_CONTENT_FRAGMENT } from "./ResourceFlexibleContentFragment";

export const SINGLE_RESOURCE_FRAGMENT = gql`
  fragment SingleResourceFragment on Resource {
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
    content
    sidebarOptions {
      sidebarOptions {
        dogsWidget
        useSidebar
        donateWidget
      }
    }
    flexibleContent {
      ...ResourceFlexibleContentFragment
    }
  }
  ${RESOURCE_FLEXIBLE_CONTENT_FRAGMENT}
  ${MEDIA_ITEM_FRAGMENT}
  ${SEO_FRAGMENT}
`;
