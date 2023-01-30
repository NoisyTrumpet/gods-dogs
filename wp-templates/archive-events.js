import { gql } from "@apollo/client";
import * as MENUS from "constants/menus";
import { Layout, Blocks } from "features"; // Blocks eventually
import { EventCard, NavigationMenu, Tabs } from "components";
import {
  BLOG_INFO_FRAGMENT,
  SITE_SETTINGS_FRAGMENT,
  SEO_FRAGMENT,
  SEO_CONFIG_FRAGMENT,
  EVENTS_FRAGMENT,
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
    events: { edges: events },
  } = data;
  // Featured Event
  const featuredEvent = events.filter(
    ({ node }) => node.eventOptions.featured
  )[0];
  // Other Events
  const otherEvents = events.filter(({ node }) => !node.eventOptions.featured);
  const upcomingEvents = otherEvents.filter(({ node }) => {
    const { date } = node.eventOptions; // date in 12/27/2020 format
    const dateObj = new Date(date); // date in 2020-12-27T08:00:00.000Z format
    return dateObj > new Date();
  });
  const pastEvents = otherEvents.filter(({ node }) => {
    const { date } = node.eventOptions; // date in 12/27/2020 format
    const dateObj = new Date(date); // date in 2020-12-27T08:00:00.000Z format
    return dateObj < new Date();
  });

  const { social } = defaultSEO;

  const { seo, title } = page;
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

  const tabs = [
    {
      name: "Upcoming Events",
      content:
        upcomingEvents.length > 0 ? (
          upcomingEvents.map((event) => (
            <EventCard {...event.node} variant="default" />
          ))
        ) : (
          <p>No upcoming events.</p>
        ),
      slug: "upcoming-events",
    },
    {
      name: "Past Events",
      content:
        pastEvents.length > 0 ? (
          pastEvents.map((event) => (
            <EventCard {...event.node} variant="default" />
          ))
        ) : (
          <p>No past events.</p>
        ),
      slug: "past-events",
    },
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
      turnOnAnnouncements={turnOnAnnouncements}
      announcements={announcements}
    >
      {featuredEvent ? (
        <EventCard {...featuredEvent.node} variant="featured" />
      ) : null}
      <Tabs tabs={tabs} variant="secondary" />
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
    page(id: "cG9zdDo5", idType: ID, asPreview: $asPreview) {
      id
      title
      content
      seo {
        ...SEOFragment
      }
    }
    events(first: 50) {
      ...EventsFragment
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
  ${EVENTS_FRAGMENT}
`;

Component.variables = (ctx) => {
  return {
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
    asPreview: ctx?.asPreview ?? false,
  };
};
