import { gql, useLazyQuery } from "@apollo/client";
import * as MENUS from "constants/menus";
import { Layout, Blocks } from "features"; // Blocks eventually
import { NavigationMenu } from "components";
import { useState } from "react";
import {
  BLOG_INFO_FRAGMENT,
  SITE_SETTINGS_FRAGMENT,
  SEO_FRAGMENT,
  SEO_CONFIG_FRAGMENT,
  FLEXIBLE_CONTENT_FRAGMENT,
  ANIMALS_FRAGMENT,
} from "fragments";

export default function Component(props) {
  // Parent Data Tree
  const { data, loading, error } = props;
  // Deconstruct Data
  const {
    page,
    headerMenuItems,
    footerMenuItems,
    siteSettings,
    seo: defaultSEO,
    animals: { edges: animals, pageInfo: animalsPageInfo },
  } = data;
  const { total } = animalsPageInfo;
  // Social
  const { social } = defaultSEO;
  // Page Data
  const {
    seo,
    title,
    flexibleContent: { blocks },
  } = page;
  // Site Settings
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
  // Fluid Animal Data State
  const [animalData, setAnimalData] = useState(data.animals);
  // Load more animals
  const [
    loadMoreAnimals,
    { loading: loadingMoreAnimals, data: moreAnimals, error: loadMoreError },
  ] = useLazyQuery(
    gql`
      query Animals($first: Int = 9, $after: String) {
        animals(first: $first, after: $after) {
          ...AnimalsFragment
        }
      }
      ${ANIMALS_FRAGMENT}
    `,
    {
      onCompleted: (data) => {
        setAnimalData({
          ...data.animals,
          edges: [...animalData.edges, ...data.animals.edges],
        });
      },
    }
  );
  // Load More Handler
  const handleLoadMore = () => {
    if (loadingMoreAnimals) return;
    if (!animalData.pageInfo.hasNextPage) return;
    loadMoreAnimals({
      variables: {
        first: 9,
        after: animalData.pageInfo.endCursor,
      },
    });
  };
  // Has More
  const hasMore = animalData.pageInfo.hasNextPage;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
      <Blocks
        blocks={blocks}
        animals={animalData.edges}
        loadMore={handleLoadMore}
        hasMore={hasMore}
        loading={loadingMoreAnimals}
        total={total}
      />
    </Layout>
  );
}

Component.query = gql`
  query PageData(
    $databaseId: ID!
    $headerLocation: MenuLocationEnum!
    $footerLocation: MenuLocationEnum!
    $asPreview: Boolean = false
    $first: Int = 9
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
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
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
  ${SEO_FRAGMENT}
  ${SEO_CONFIG_FRAGMENT}
  ${FLEXIBLE_CONTENT_FRAGMENT}
  ${ANIMALS_FRAGMENT}
`;

Component.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
    asPreview: ctx?.asPreview ?? false,
  };
};
