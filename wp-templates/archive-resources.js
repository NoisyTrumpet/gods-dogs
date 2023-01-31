import { gql } from "@apollo/client";
import * as MENUS from "constants/menus";
import { Layout, Blocks } from "features"; // Blocks eventually
import { NavigationMenu } from "components";
import {
  BLOG_INFO_FRAGMENT,
  SITE_SETTINGS_FRAGMENT,
  SEO_FRAGMENT,
  SEO_CONFIG_FRAGMENT,
  FLEXIBLE_CONTENT_FRAGMENT,
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
    page,
    headerMenuItems,
    footerMenuItems,
    siteSettings,
    seo: defaultSEO,
  } = data;

  const { social } = defaultSEO;

  const {
    seo,
    title,
    flexibleContent: { blocks },
  } = page;
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
      <Blocks blocks={blocks} />
    </Layout>
  );
}

Component.query = gql`
  query PageData(
    $headerLocation: MenuLocationEnum!
    $footerLocation: MenuLocationEnum!
    $asPreview: Boolean
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
    page(id: "cG9zdDo3OTU=", idType: ID, asPreview: $asPreview) {
      id
      title
      content
      seo {
        ...SEOFragment
      }
      flexibleContent {
        ...FlexibleContentFragment
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
  ${FLEXIBLE_CONTENT_FRAGMENT}
`;

Component.variables = (ctx) => {
  return {
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
    asPreview: ctx?.asPreview ?? false,
  };
};
