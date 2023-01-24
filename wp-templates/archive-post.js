import { useQuery, gql } from "@apollo/client";
import * as MENUS from "constants/menus";
import { Layout, Blocks } from "features"; // Blocks eventually
import { NavigationMenu, PostCard, Tabs } from "components";
import {
  BLOG_INFO_FRAGMENT,
  SITE_SETTINGS_FRAGMENT,
  SEO_FRAGMENT,
  SEO_CONFIG_FRAGMENT,
  MEDIA_ITEM_FRAGMENT,
  FLEXIBLE_CONTENT_FRAGMENT,
} from "fragments";

export default function Component() {
  const { data, loading, error, fetchMore } = useQuery(Component.query, {
    variables: Component.variables(),
  });

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
    posts: { nodes: posts },
    categories,
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
  } = siteSettings.siteSettings;

  const tabs = [
    {
      name: "All News",
      slug: "all",
      content: posts.map((post) => {
        return <PostCard key={post.id} post={post} />;
      }),
    },
    ...categories.nodes.map((category) => {
      return {
        name: category.name,
        slug: category.slug,
        content: posts.map((post) => {
          if (post.categories.nodes[0].slug === category.slug) {
            return <PostCard key={post.id} post={post} />;
          }
        }),
      };
    }),
  ];

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
    >
      <Blocks blocks={blocks} />
      <div className="container relative mx-auto">
        <Tabs tabs={tabs} />
      </div>
    </Layout>
  );
}

Component.query = gql`
  query NewsPage(
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
    page(id: 129, idType: DATABASE_ID, asPreview: $asPreview) {
      id
      title
      seo {
        ...SEOFragment
      }
      flexibleContent {
        ...FlexibleContentFragment
      }
    }
    categories {
      nodes {
        id
        name
        slug
      }
    }
    posts {
      nodes {
        id
        title
        excerpt
        uri
        date
        categories {
          nodes {
            name
            slug
          }
        }
        featuredImage {
          node {
            ...MediaItemFragment
          }
        }
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
  ${FLEXIBLE_CONTENT_FRAGMENT}
`;

Component.variables = () => {
  return {
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
  };
};
