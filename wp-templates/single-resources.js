import { gql } from "@apollo/client";
import * as MENUS from "constants/menus";
import { Layout, Blocks } from "features"; // Blocks eventually

import {
  BLOG_INFO_FRAGMENT,
  SITE_SETTINGS_FRAGMENT,
  SEO_CONFIG_FRAGMENT,
  SINGLE_RESOURCE_FRAGMENT,
  ANIMALS_FRAGMENT,
} from "fragments";
import { NavigationMenu, Hero } from "components";

export default function Component(props) {
  const { data, loading, error } = props;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const {
    resource,
    headerMenuItems,
    footerMenuItems,
    siteSettings,
    seo: defaultSEO,
    animals: { edges: animals},
  } = data;

  const { social } = defaultSEO;

  const { seo, title, sidebarOptions, flexibleContent: { blocks } } = resource;

  const { useSidebar, dogsWidget, donateWidget } =
    sidebarOptions.sidebarOptions;

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
      useSidebar={useSidebar}
      dogsWidget={dogsWidget}
      donateWidget={donateWidget}
    >
      <Blocks
        blocks={blocks}
        animals={animals}
      />
      {/* <Hero title={title} variant={"basic"} /> */}
    </Layout>
  );
}

Component.query = gql`
  query PostPage(
    $databaseId: ID!
    $headerLocation: MenuLocationEnum!
    $footerLocation: MenuLocationEnum!
    $asPreview: Boolean
    $first: Int = 3
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
    resource(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      ...SingleResourceFragment
    }
    animals(first: $first) {
      ...AnimalsFragment
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
  ${SEO_CONFIG_FRAGMENT}
  ${SINGLE_RESOURCE_FRAGMENT}
  ${ANIMALS_FRAGMENT}
`;

Component.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
    asPreview: ctx?.asPreview,
  };
};
