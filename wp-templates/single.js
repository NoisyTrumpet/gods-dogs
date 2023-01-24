import { gql } from "@apollo/client";
import * as MENUS from "constants/menus";
import { Layout } from "features"; // Blocks eventually
import { NavigationMenu } from "components";
import {
  BLOG_INFO_FRAGMENT,
  SITE_SETTINGS_FRAGMENT,
  SEO_FRAGMENT,
  SEO_CONFIG_FRAGMENT,
  MEDIA_ITEM_FRAGMENT,
} from "fragments";

export default function Component(props) {
  const { data, loading, error } = props;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const {
    post,
    headerMenuItems,
    footerMenuItems,
    siteSettings,
    seo: defaultSEO,
  } = data;

  const { social } = defaultSEO;

  const { seo, title } = post;
  const {
    address,
    customAddressLabel,
    phoneNumber,
    logo,
    logoWhite,
    logoAlt,
    cta,
    email,
    turnOnAnnouncements,
    announcements,
  } = siteSettings.siteSettings;

  return (
    <Layout
      headerMenuItems={headerMenuItems}
      footerMenuItems={footerMenuItems}
      siteSettings={siteSettings}
      seo={seo}
      logo={logo}
      logoWhite={logoWhite}
      logoAlt={logoAlt}
      cta={cta}
      twitterUser={defaultSEO.social.twitter.username}
      address={address}
      customAddressLabel={customAddressLabel}
      phoneNumber={phoneNumber}
      email={email}
      social={social}
      turnOnAnnouncements={turnOnAnnouncements}
      announcements={announcements}
    >
      <div className="container relative mx-auto">
        <div className="flex flex-wrap">
          <h1 className="text-4xl font-bold">{title}</h1>
        </div>
      </div>
    </Layout>
  );
}

Component.query = gql`
  query PostPage(
    $databaseId: ID!
    $headerLocation: MenuLocationEnum!
    $footerLocation: MenuLocationEnum!
    $asPreview: Boolean = false
  ) {
    generalSettings {
      ...BlogInfoFragment
    }
    siteSettings {
      ...SiteSettingsFragment
    }
    seo {
      ...SEOConfigFragment
    }
    post(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      id
      title
      content
      date
      author {
        node {
          name
        }
      }
      featuredImage {
        node {
          ...MediaItemFragment
        }
      }
      seo {
        ...SEOFragment
      }
    }
    headerMenuItems: menuItems(
      where: { location: $headerLocation }
      first: 50
    ) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    footerMenuItems: menuItems(
      where: { location: $footerLocation }
      first: 50
    ) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
  ${BLOG_INFO_FRAGMENT}
  ${SITE_SETTINGS_FRAGMENT}
  ${NavigationMenu.fragments.entry}
  ${SEO_FRAGMENT}
  ${SEO_CONFIG_FRAGMENT}
  ${MEDIA_ITEM_FRAGMENT}
`;

Component.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
    asPreview: ctx?.asPreview,
  };
};
